import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {DARK_BLUE} from "../data/Colors";
import {ButtonProps} from "../data/Interfaces";

export default function ButtonHalf({text, action, style}: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        width: "40%",
        paddingVertical: 20,
        backgroundColor: DARK_BLUE,
        borderRadius: 12,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
        ...style,
      }}
      onPress={action}
    >
      <Text style={{color: "#fff", textAlign: "center", fontSize: 18}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
