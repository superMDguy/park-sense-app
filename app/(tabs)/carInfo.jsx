import { StyleSheet } from "react-native";

import { Text } from "~/components/Themed";
import { Button, View } from "react-native-ui-lib";

export default function TabOneScreen() {
  const carInfo = {
    make: "Toyota",
    model: "Corolla",
    year: 2010,
    licensePlate: "MGB-2909",
    expires: "4/5/2023",
  };
  return (
    <View flex style={styles.container}>
      <View>
        <View style={{ backgroundColor: "#d3d3d3" }}>
          <Text style={{ padding: 10 }}>Active Vehicles</Text>
        </View>
        <View style={{ backgroundColor: "#90EE90" }}>
          <View style={{ padding: 10 }}>
            <Text style={styles.title}>
              {carInfo.make} {carInfo.model}
            </Text>
            <Text>License Plate: {carInfo.licensePlate}</Text>
            <Text>Valid Through: {carInfo.expires}</Text>
          </View>
        </View>
      </View>
      <View
        flex
        row
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Button label="Add Car" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  car: {
    backgroundColor: "red",
    marginLeft: "100px",
  },
});
