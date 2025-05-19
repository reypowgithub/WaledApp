import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import "../../../global.css";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraView } from "expo-camera";
import wb_sunny from "../../../assets/wb_sunny.png";

export default function App() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(ImagePicker.CameraType.back);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const cameraRef = useRef(null);

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
    <View className="flex-1 items-center justify-center bg-white">
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FAFBFD",
          padding: 10,
        }}
      >
        {image && (
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
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: "100%" }}
            />
            
          </View>
        )}

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>Chelsea Immanuela</Text>
          <Text>Personal Account</Text>
          <Image
            source={wb_sunny} 
            style={{ width: 20, height: 20 }}
          />
        </View>
      </View>
    </View>
  );
}
