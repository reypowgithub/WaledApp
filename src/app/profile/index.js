import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import "../../../global.css";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraView } from "expo-camera";

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
      {image && (
        <Image
          source={{
            uri: image,
          }}
          style={{ width: 46, height: 46 }}
          className=""
        />
      )}
      <CameraView
        style={{ width: 200, height: 200 }}
        ref={cameraRef}
        facing={type}
      />
      <View className="flex-row ">
        <Button
          title="Flip"
          onPress={() =>
            setType(
              type === ImagePicker.CameraType.back
                ? ImagePicker.CameraType.front
                : ImagePicker.CameraType.back
            )
          }
        />
        <Button title="Pick image" onPress={pickImage} />
        <Button title="Take Picture" onPress={takePicture} />
      </View>
    </View>
  );
}
