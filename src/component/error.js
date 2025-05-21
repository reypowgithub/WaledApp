import { Button, Text, View } from "react-native";

export default function SomeScreen() {
  throw new Error("Ini lagi coba error bonderies");
  return (
    <View>
      <Text>Screen Content</Text>
    </View>
  );
}

export function ErrorBoundary({ error, reset }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Error: {error.message}
      </Text>
      <Button title="Try again" onPress={reset} />
    </View>
  );
}
