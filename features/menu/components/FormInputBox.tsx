import { StyleSheet, Text, TextInput, View } from "react-native";

export default function FormInputBox({value, label, onChangeText}: FormInputBoxProps) {
    return (
        <View style={Styles.inputPart}>
              <Text style={{fontSize:20}}>{label}: </Text>
              <TextInput
                style={Styles.input}
                value={value}
                onChangeText={onChangeText}
                
              />
            </View>
    )
}
interface FormInputBoxProps {
    value:string;
    label:string;
    onChangeText: (text: any) => void;
}
const Styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      width: "90%",
      padding: 10,
      borderRadius: 12,
      marginVertical: 10,
      fontSize:18
    },
    inputPart: {
      flexDirection: "column",
    },
    container: {
      minHeight: "75%",
      width: "100%",
      paddingTop: 40,
      marginLeft: "5%",
      flex:1
    },
  });