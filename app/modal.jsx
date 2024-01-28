import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "react-native-ui-lib";
import { QrCodeSvg } from "react-native-qr-svg";
import ScanQR from "../components/ScanQR";
import { router } from "expo-router";

import { Text, View } from "~/components/Themed";
import { Colors } from "react-native-ui-lib";

export default function ModalScreen() {
  const [screen, setScreen] = useState(null);

  function finish() {
    setScreen("done");
    setTimeout(() => {
      router.navigate("/");
    }, 2000);
  }

  return (
    <View style={styles.container}>
      {!screen && (
        <>
          <Text style={styles.title}>You're a</Text>
          <Button
            label="Driver"
            style={{ marginBottom: 10, ...styles.button }}
            onPress={() => setScreen("driver")}
          />
          <Button
            label="Passenger"
            style={styles.button}
            onPress={() => setScreen("passenger")}
          />
        </>
      )}

      {screen === "passenger" && (
        <>
          <Text style={styles.title}>QR</Text>
          <ScanQR />
        </>
      )}
      {screen === "driver" && (
        <>
          <Text style={styles.title}>Driver</Text>
          <Text>Ask your Passengers to scan the QR code</Text>
          <QrCodeSvg
            value="Hello world!"
            frameSize={300}
            style={{ margin: 40 }}
          />
          <Button label="Done" style={{ width: "80%" }} onPress={finish} />
        </>
      )}
      {screen === "done" && (
        <>
          <FontAwesome
            name="check-circle"
            size={100}
            color={Colors.green30}
            style={{ marginBottom: 20 }}
          />
          <Text style={styles.title}>Check-in Complete!</Text>
        </>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    width: "80%",
  },
});
