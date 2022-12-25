import { GestureResponderEvent, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { GREEN } from "../data/Colors";

export default function AddNewButton({action}: {action : ((event: GestureResponderEvent) => void)}){
    return (
        <TouchableOpacity style={{alignSelf:'flex-end', marginRight:20}} onPress={action}>
        <Ionicons  name="ios-add-circle-outline" size={50} color={GREEN}/>
      </TouchableOpacity>
    )
}