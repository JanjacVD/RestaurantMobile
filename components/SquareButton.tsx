import {Text, TouchableOpacity} from "react-native";
import { LIGHT_BLUE } from "../data/Colors";
import { ButtonProps } from "../data/Interfaces";

export default function SquareButton({text, action}: ButtonProps) {
  return (
    <TouchableOpacity
      style={{
        aspectRatio: 1,
        width: "40%",
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: "5%",
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
      }}
      onPress={action}
    >
      <Text style={{textAlign: "center", fontSize:18,fontWeight:'bold',textTransform:'uppercase'}}>{text}</Text>
    </TouchableOpacity>
  );
}

