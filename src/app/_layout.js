import { setStatusBarBackgroundColor, StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }} edges={["bottom", "top"]}>
          <Stack
            screenOptions={{
              headerShown: false,
              StatusBarBackgroundColor: "#ffffff",
              StatusBarStyle: "dark",
              ContentStyle: { backgroundColor: "#f2f2f2" },
              presentation: "modal",
            }}
          >
            <StatusBar style="dark" />
          </Stack>
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}
