import { StatusBar } from "expo-status-bar";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import "./global.css";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [image, setImage] = useState(null);

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

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-row items-center gap-4">
        {image && (
          <Image
            source={{
              uri: image,
            }}
            className="w-20 h-20"
          />
        )}
        <View>
          <Text> Chelsea FC</Text>
          <Text> Personal Account</Text>
        </View>
        <Button title="Pick image" onPress={pickImage} />
      </View>
    </View>
  );
}
