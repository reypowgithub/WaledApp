import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "../../../global.css";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraView } from "expo-camera";
import wb_sunny from "../../../assets/wb_sunny_24dp.png";
import location from "../../../assets/location_on_24dp.png";
import baby_sunny from "../../../assets/baby_sun.png";
import visibility from "../../../assets/visibility_24dp.png";
import send from "../../../assets/send_24dp.png";
import add from "../../../assets/add_24dp.png";
import ExpoLocation from "../../component/expo_location";
import Notif from "../../component/notif";
import { Link, router } from "expo-router";

export default function App() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(ImagePicker.CameraType.back);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const cameraRef = useRef(null);
  const [locationName, setLocationName] = useState(null);

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  if (!permission) return <Text>Requesting permissions...</Text>;
  if (!permission.granted)
    return (
      <View>
        <Text>Permission not granted</Text>
        <Button onPress={requestPermission} title="Request permissions" />
      </View>
    );

  const profileHandler = async () => {
    router.push("/profile");
  };

  const topupHandler = async () => {
    router.push("/topup");
  };

  const transferHandler = async () => {
    router.push("/transfer");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <TouchableOpacity
              style={styles.profileTouchable}
              onPress={profileHandler}
            >
              <Image
                source={{
                  uri: image
                    ? image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQHgBG7GK3NOmArWsUC1cD5OQHslikXwlvNw&s",
                }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Reynhard Powiwi</Text>
            <View style={styles.locationRow}>
              <Image source={location} style={styles.iconSmall} />
              <Text>{locationName}</Text>
            </View>
          </View>

          <Image source={wb_sunny} style={styles.sunnyIcon} />
        </View>
      </View>

      <ScrollView>
        <View style={styles.greetingContainer}>
          <View style={styles.greetingTextWrapper}>
            <Text style={styles.greetingTitle}>Good Afternoon, Rein</Text>
            <Text style={styles.greetingSubtitle}>
              Check all your incoming and outgoing transactions here
            </Text>
          </View>
          <Image source={baby_sunny} style={styles.babySunnyImage} />
        </View>

        <View style={styles.accountContainer}>
          <Text style={styles.accountLabel}>Account No</Text>
          <Text style={styles.accountNumber}>123456789</Text>
        </View>

        <View style={styles.balanceContainer}>
          <View>
            <Text style={styles.balanceLabel}>Balance</Text>
            <View style={styles.balanceRow}>
              <Text style={styles.balanceCurrency}>Rp</Text>
              <Text style={styles.balanceAmount}>10.000.000</Text>
              <Image source={visibility} style={styles.iconSmall} />
            </View>
          </View>

          <View>
            <TouchableOpacity onPress={topupHandler}>
              <View style={styles.actionButton}>
                <Image source={add} style={styles.iconSmall} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={transferHandler}>
              <View style={[styles.actionButton, { marginTop: 10 }]}>
                <Image source={send} style={styles.iconSmall} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.transactionContainer}>
          <Text style={styles.transactionTitle}>Transaction History</Text>
          <View
            style={{ height: 1, backgroundColor: "black", marginVertical: 10 }}
          />

          <View style={styles.transactionItem}>
            <View style={styles.profileImageWrapper}></View>
            <View style={styles.transactionDetail}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>- 75.000</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={styles.profileImageWrapper}></View>
            <View style={styles.transactionDetail}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>- 75.000</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={styles.profileImageWrapper}></View>
            <View style={styles.transactionDetail}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>- 75.000</Text>
          </View>

          <View style={styles.transactionItem}>
            <View style={styles.profileImageWrapper}></View>
            <View style={styles.transactionDetail}>
              <Text style={styles.transactionName}>Adityo Gizwanda</Text>
              <Text style={styles.transactionType}>Transfer</Text>
              <Text style={styles.transactionDate}>08 December 2024</Text>
            </View>
            <Text style={styles.transactionAmount}>- 75.000</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <ExpoLocation setLocationName={setLocationName} />
          <Notif />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "#FAFBFD",
    padding: 10,
  },
  profileImageWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: "hidden",
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  // Tambahan style baru untuk transaction history
  transactionContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-between",
  },
  transactionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  transactionItem: {
    flexDirection: "row",
    margin: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionDetail: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontWeight: "bold",
  },
  transactionType: {
    fontWeight: "300",
  },
  transactionDate: {
    fontWeight: "300",
    color: "grey",
  },
  transactionAmount: {
    fontWeight: "bold",
  },
  // Style yang sudah ada sebelumnya...
  profileTouchable: {
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileName: {
    fontWeight: "bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sunnyIcon: {
    width: 30,
    height: 30,
    alignSelf: "flex-end",
    marginRight: 10,
  },
  iconSmall: {
    width: 20,
    height: 20,
  },
  greetingContainer: {
    flexDirection: "row",
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  greetingTextWrapper: {
    flexDirection: "column",
    paddingRight: 10,
  },
  greetingTitle: {
    fontWeight: "bold",
    fontSize: 20,
    width: 230,
  },
  greetingSubtitle: {
    fontWeight: "300",
    width: 230,
    paddingTop: 20,
    fontSize: 16,
  },
  babySunnyImage: {
    height: 77,
  },
  accountContainer: {
    margin: 30,
    flexDirection: "row",
    backgroundColor: "#0061FF",
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-between",
  },
  accountLabel: {
    color: "white",
    fontSize: 16,
  },
  accountNumber: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  balanceContainer: {
    marginHorizontal: 30,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceLabel: {
    color: "black",
    fontSize: 16,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  balanceCurrency: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    marginRight: 5,
  },
  balanceAmount: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
  },
  actionButton: {
    backgroundColor: "#0061FF",
    borderRadius: 15,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
