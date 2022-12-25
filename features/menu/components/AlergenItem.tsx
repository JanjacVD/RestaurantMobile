import {
    View,
    Text,
  } from "react-native";
  import {TouchableOpacity} from "react-native-gesture-handler";
  import {AlergenProps} from "../../../data/Interfaces";
  export default function AlergenItem({
    alergen,
    action,
  }: {
    alergen: AlergenProps;
    action(): void;
  }) {
    return (
      <View
        style={{
          width: "90%",
          height: 80,
          backgroundColor: "#fff",
          marginTop: 10,
          borderWidth: 1,
          borderColor: "#000",
          borderRadius: 12,
        }}
      >
        <TouchableOpacity
          onLongPress={() => action()}
          style={{
            width: "100%",
            height: "100%",
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 12,
            paddingVertical: 10,
            paddingHorizontal: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{fontSize: 16, textTransform: "capitalize"}}>
            {alergen.title.hr}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  