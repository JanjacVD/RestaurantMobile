import {StyleSheet, Text, TextInput, View} from "react-native";

export default function FormInputBox({
  value,
  label,
  onChangeText,
  readonly,
  numeric,
}: FormInputBoxProps) {
  return (
    <View style={Styles.inputPart}>
      <Text style={{fontSize: 20}}>{label}: </Text>
      <TextInput
        keyboardType={numeric ? "numeric" : "ascii-capable"}
        style={Styles.input}
        value={value.toString()}
        onChangeText={onChangeText}
        editable={readonly || true}
      />
    </View>
  );
}
interface FormInputBoxProps {
  value: string | number;
  label: string;
  onChangeText?: (text: any) => void;
  readonly?: boolean;
  numeric?: boolean;
}
const Styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: "90%",
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
    fontSize: 18,
  },
  inputPart: {
    flexDirection: "column",
  },
  container: {
    minHeight: "75%",
    width: "100%",
    paddingTop: 40,
    marginLeft: "5%",
    flex: 1,
  },
});
