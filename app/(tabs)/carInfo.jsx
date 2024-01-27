import { StyleSheet } from "react-native";

import { Text } from "~/components/Themed";
import { Button, View } from "react-native-ui-lib";

export default function TabOneScreen() {
  const carInfo = {
    make: "Toyota",
    model: "Corolla",
    year: 2010,
    licensePlate: "MGB-2908",
    expires: "4/5/2023",
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {carInfo.make} {carInfo.model}
      </Text>
      <Text>License Plate: {carInfo.licensePlate}</Text>
      <Text>Valid Through: {carInfo.expires}</Text>

      <View flex row style={{ position: "absolute", bottom: 50 }}>
        <Button label="Add Car" />
      </View>
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
