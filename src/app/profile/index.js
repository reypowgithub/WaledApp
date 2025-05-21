import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import "../../../global.css";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { CameraView } from "expo-camera";
import ExpoLocation from "../../component/expo_location";

export default function App() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState(ImagePicker.CameraType.back);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [locationName, setLocationName] = useState(null);
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
    <View className="flex">
      <View style={styles.headerContainer}>
        <Text>Profile</Text>
      </View>

      <View>
        <View className="flex-row items-center justify-center">
          <CameraView
            style={{ width: 150, height: 150 }}
            ref={cameraRef}
            facing={type}
          />
          {image && (
            <Image
              source={{
                uri: image,
              }}
              style={{ width: 150, height: 150, marginLeft: 10 }}
            />
          )}
        </View>
        <View className="flex-row items-center justify-center">
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
        <View>
          <Text>
            Location: {locationName ? locationName : "Belum ada lokasi"}
          </Text>

          <ExpoLocation setLocationName={setLocationName} />
          
        </View>
      </View>

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
});
