import { useCameraPermission } from "react-native-vision-camera";
export default function (props) {
  const { hasPermission, requestPermission } = useCameraPermission();

  const device = useCameraDevice("back");
  if (device == null) return <NoCameraDeviceError />;

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      codeScanner={codeScanner}
      onCodeScanned={(code) => {
        console.log(`Scanned code ${code}!`);
      }}
    />
  );
}
