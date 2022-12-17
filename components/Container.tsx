import {StyleSheet, View} from "react-native";
import {WHITE} from "../data/Colors";

export default function Container({children, style}: ConteinerProps) {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: '#fff',
        width: "100%",
        height: "100%",
        ...style
      }}
    >
      {children}
    </View>
  );
}
interface ConteinerProps {
  children?: JSX.Element|JSX.Element[];
  style?: any
}
