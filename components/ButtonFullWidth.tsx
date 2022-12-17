import {Text, TouchableOpacity} from "react-native";
import { LIGHT_BLUE } from "../data/Colors";
import { ButtonProps } from "../data/Interfaces";

export default function ButtonFullWidth({text, action, style} : ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        paddingVertical: 20,
        backgroundColor: LIGHT_BLUE,
        borderRadius: 8,
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
        ...style
      }}
      onPress={action}
    >
      <Text style={{textAlign: "center", color:'#fff', fontSize:20, letterSpacing:1, fontWeight:'bold'}}>{text}</Text>
    </TouchableOpacity>
  );
}
