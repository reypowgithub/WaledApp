import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
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
import ExpoLocation from "../../component/expo_location";
import { Link } from "expo-router";

export default function App() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(ImagePicker.CameraType.back);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [address, setAdresss] = useState(null);
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(`url : `, result.assets[0].uri);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImage(photo.uri);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex items-center justify-center bg-white">
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#FAFBFD",
            padding: 10,
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23, // setengah dari width & height
              overflow: "hidden",
              backgroundColor: "#ccc", // buat placeholder kalau gambar belum kebuka
              marginRight: 10,
            }}
          >
            <TouchableOpacity>
              <Link href="/modal" style={{ width: "100%", height: "100%" }}>
                <Image
                  source={{
                    uri: image
                      ? image
                      : "https://i.scdn.co/image/ab67616d0000b273e7714e34d990a32111e66309",
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "bold" }}>Chelsea Immanuela</Text>
            <View style={{ flexDirection: "row" }}>
              <Image source={location} style={{ width: 20, height: 20 }} />
              <Text>{locationName}</Text>
            </View>
          </View>
          <Image
            source={wb_sunny}
            style={{
              width: 30,
              height: 30,
              alignItems: "flex-end",
              marginRight: 10,
            }}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ExpoLocation setLocationName={setLocationName} />
      </View>
    </View>
  );
}
