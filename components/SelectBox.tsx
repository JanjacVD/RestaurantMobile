import {Dispatch, SetStateAction} from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonFullWidth from "./ButtonFullWidth";
import Ionicons from "react-native-vector-icons/Ionicons";
import {CategoryItemProps} from "../data/Interfaces";
export default function SelectBox({
  value,
  setValue,
  options,
  toggler,
}: SelectBoxProps) {
  const Width = Dimensions.get("screen").width * 0.9;
  const Height = Dimensions.get("screen").height * 0.5;
  return (
    <View
      style={{
        width: Width,
        height: Height,
        position: "absolute",
        top: "25%",
        left: 0,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        zIndex:10
      }}
    >
      <TouchableOpacity
        onPress={() => toggler(false)}
        style={{width: 50, height: 50, alignSelf: "flex-end"}}
      >
        <Ionicons name="ios-close-sharp" size={50} />
      </TouchableOpacity>
      <ScrollView>
        {options.map((option: any, index) => {
          return (
            <TouchableOpacity
              key={option.id}
              style={{
                width: "100%",
                height: 70,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: "#fff",
                borderBottomWidth:1,
                borderTopWidth:!index ? 1 : 0
              }}
              onPress={() => {
                setValue({
                  ...value,
                  data: {
                    ...value.data,
                    section_id: option.id,
                    category_id: option.id
                  },
                });
                toggler(false);
              }}
            >
              <Text>{option.title.hr}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
interface SelectBoxProps {
  value: any;
  options: any[];
  setValue: Dispatch<SetStateAction<any>>;
  toggler: Dispatch<SetStateAction<boolean>>;
}
