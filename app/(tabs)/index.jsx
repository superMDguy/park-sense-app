import React, { useState, useEffect } from "react";
import { Platform, ActivityIndicator, View, StyleSheet } from "react-native";
import Svg, { Path, Circle, Ellipse } from "react-native-svg";
import MapView, { Marker } from "react-native-maps";
import Device from "expo-device";
import { Button, LoaderScreen, Colors } from "react-native-ui-lib";
import { router } from "expo-router";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState({
    latitude: 40.249071472395705,
    longitude: -111.64844568089708,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const icon = () => {
    return (
      <Svg height={20} width={20}>
        <Ellipse
          cx="10"
          cy="10"
          rx="10"
          ry="10"
          fill="blue"
          stroke="#fff"
          strokeWidth="2"
        />
      </Svg>
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android Emulator. Try it on your device!",
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      setLoading(true);
      // let location = await Location.getCurrentPositionAsync({
      //   accuracy: Location.Accuracy.BestForNavigation,
      // });
      // setLocation({
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      //   latitudeDelta: 0.005,
      //   longitudeDelta: 0.005,
      // });
      setLoading(false);
    })();
  }, []);

  let text = "Getting Location..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location}>
        <Marker coordinate={location}>
          <View>{icon()}</View>
        </Marker>
      </MapView>
      {loading && (
        <LoaderScreen
          message="Getting Location"
          overlay={true}
          style={{ opacity: "50%" }}
          loaderColor="rgba(52, 52, 52, 0.8)"
        />
      )}
      {!loading && (
        <View style={styles.button}>
          <Button
            label="PARK"
            size={Button.sizes.large}
            onPress={() => router.navigate("modal")}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  button: {
    position: "absolute",
    bottom: 50,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
