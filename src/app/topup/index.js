import { Stack } from "expo-router";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import arrow_down from "../../../assets/arrow_down.png";

export default function topup() {
    
  return (
    <View>
      <View>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20 }}>
            Top Up
          </Text>
        </View>
      </View>

      <View
        style={{ marginVertical: 20, backgroundColor: "white", padding: 20 }}
      >
        <Text style={{ fontWeight: "thin", color: "gray", fontSize: 16 }}>
          Amount
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <Text style={{ fontSize: 16 }}>IDR</Text>
          <TextInput
            style={{ fontSize: 36, fontWeight: "bold", marginLeft: 10 }}
            placeholder="100.000"
          />
        </View>
        <View
          style={{ height: 1, backgroundColor: "black", marginVertical: 10 }}
        />
      </View>

      <View
        style={{ marginVertical: 20, backgroundColor: "white", padding: 20 }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "thin", fontSize: 16 }}>BYOND Pay</Text>
          <Image source={arrow_down} />
        </View>
      </View>

      <View
        style={{ marginVertical: 20, backgroundColor: "white", padding: 20 }}
      >
        <View>
          <Text
            style={{
              fontWeight: "thin",
              color: "gray",
              fontSize: 16,
              marginBottom: 10,
            }}
          >
            Notes
          </Text>
          <TextInput placeholder="Notes" />
          <View
            style={{ height: 1, backgroundColor: "black", marginVertical: 10 }}
          />
        </View>
      </View>

      <View
        style={{
          margin: 20,
          backgroundColor: "#0061FF",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          Top Up
        </Text>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
  },
});
