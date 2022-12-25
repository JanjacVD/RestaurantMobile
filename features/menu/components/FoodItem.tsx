import {View, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {FoodItemProps} from "../../../data/Interfaces";
export default function FoodItem({
  item,
  action,
}: {
  item: FoodItemProps;
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
        <Text
          style={{
            fontSize: 16,
            textTransform: "capitalize",
            paddingRight: 10,
            marginRight: 20,
            borderRightWidth: 1,
            height: "100%",
            alignSelf: "center",
            textAlignVertical: "center",
          }}
        >
          {item.order}
        </Text>
        <Text style={{fontSize: 16, textTransform: "capitalize"}}>
          {item.title.hr}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
