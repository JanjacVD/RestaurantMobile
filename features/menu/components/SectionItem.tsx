import {
  View,
  Text,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {LIGHT_BLUE, WHITE} from "../../../data/Colors";
import {SectionItemProps} from "../../../data/Interfaces";
import {useNavigation} from "@react-navigation/native";
export default function SectionItem({
  section,
  action,
}: {
  section: SectionItemProps;
  action(): void;
}) {
  const {navigate} = useNavigation<any>();;
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
        onPress={() => navigate('CategoryList', {sectionID: section.id})}
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
          {section.order}
        </Text>
        <Text style={{fontSize: 16, textTransform: "capitalize"}}>
          {section.title.hr}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
