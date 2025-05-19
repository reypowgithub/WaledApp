import React, { useEffect, useState, useRef } from "react";
import { View, Button, Platform, Text, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

// Atur bagaimana notifikasi ditangani saat aplikasi aktif
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationsExample() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Minta izin notifikasi dan ambil push token
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });

    // Listener: menerima notifikasi saat app sedang terbuka
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received:", notification);
      });

    // Listener: respon saat notifikasi di-tap
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Tapped:", response);
        Alert.alert(
          "Notification tapped!",
          "You interacted with the notification."
        );
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // Fungsi kirim notifikasi lokal
  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hallo!",
        body: "This is a local notification",
        sound: true,
      },
      trigger: null, // langsung muncul
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your Expo Push Token:</Text>
      <Text selectable style={{ margin: 10 }}>
        {expoPushToken || "Fetching token..."}
      </Text>
      <Button
        title="Schedule Local Notification"
        onPress={scheduleNotification}
      />
    </View>
  );
}

// Fungsi minta izin dan ambil push token
async function registerForPushNotificationsAsync() {
  let token;

  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notifications!");
    return;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);

  // Android: buat channel agar suara/vibrasi aktif
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
