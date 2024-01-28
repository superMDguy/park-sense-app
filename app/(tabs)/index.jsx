import React, { useState, useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";
import MapView, { Marker, Polygon, WMSTile } from "react-native-maps";
import { Text } from "~/components/Themed";
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

  const polygonCoordinates = [
    { latitude: location.latitude, longitude: location.longitude },
    { latitude: location.latitude, longitude: location.longitude + 0.002 },
    {
      latitude: location.latitude + 0.002,
      longitude: location.longitude + 0.002,
    },
    { latitude: location.latitude + 0.002, longitude: location.longitude },
    { latitude: location.latitude, longitude: location.longitude },
  ];

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
      <MapView style={styles.map} region={location} showsUserLocation={true}>
        {/* <WMSTile
          urlTemplate={
            "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/BYU_Campus_Parking/FeatureServer/0/query?f=pbf&geometry=%7B%22spatialReference%22%3A%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D%2C%22xmin%22%3A{minX}%2C%22ymin%22%3A{minY}%2C%22xmax%22%3A{maxX}%2C%22ymax%22%3A{maxY}%7D&maxRecordCountFactor=3&resultOffset=0&resultRecordCount=8000&where=1%3D1&orderByFields=OBJECTID%20ASC&outFields=Lot_Type%2COBJECTID%2Cpermit_typ&outSR=102100&quantizationParameters=%7B%22extent%22%3A%7B%22spatialReference%22%3A%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D%2C%22xmin%22%3A{minX}%2C%22ymin%22%3A{minY}%2C%22xmax%22%3A{maxX}%2C%22ymax%22%3A{maxY}%7D%2C%22mode%22%3A%22view%22%2C%22originPosition%22%3A%22upperLeft%22%2C%22tolerance%22%3A2.388657133911135%7D&resultType=tile&returnCentroid=true&spatialRel=esriSpatialRelIntersects&geometryType=esriGeometryEnvelope&inSR=102100"
          }
        /> */}
        <Polygon
          coordinates={polygonCoordinates}
          strokeWidth={1}
          strokeColor="#000"
          fillColor="rgba(0, 200, 0, 0.5)"
        />
        <Marker
          coordinate={{
            latitude: location.latitude + 0.001,
            longitude: location.longitude + 0.001,
          }}
        >
          <Text>20% Open</Text>
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
