import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import "./global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="flex-row items-center gap-4">
        <Image
          source={{
            uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.liputan6.com%2Fcitizen6%2Fread%2F5505737%2Fprofil-dan-agama-chelsea-islan-artis-cantik-blasteran-indonesia-amerika-serikat&psig=AOvVaw0yiVdqJa6RCkw1-cGwL_94&ust=1747707954956000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNDk9dC9ro0DFQAAAAAdAAAAABAE",
          }}
          className="w-20 h-20"
        ></Image>
      </View>
    </View>
  );
}
