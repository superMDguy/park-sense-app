import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { Button } from "react-native-ui-lib";

import { Text, View } from "~/components/Themed";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're a</Text>
      <Button label="Driver" style={{ marginBottom: 10, ...styles.button }} />
      <Button label="Passenger" style={styles.button} />
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
