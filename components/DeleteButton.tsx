import { GestureResponderEvent, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RED } from "../data/Colors";

export default function DeleteButton({action}: {action : ((event: GestureResponderEvent) => void)}){
    return (
        <TouchableOpacity style={{alignSelf:'flex-end', marginRight:20}} onPress={action}>
        <Ionicons  name="ios-trash-sharp" size={50} color={RED}/>
      </TouchableOpacity>
    )
}