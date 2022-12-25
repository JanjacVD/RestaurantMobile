import {Dispatch, SetStateAction} from "react";
import {Dimensions, ScrollView, Text, View} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {TouchableOpacity} from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import {AlergenProps} from "../../../data/Interfaces";

export default function MultiCheckboxModal({
  value,
  setValue,
  options,
  toggler,
}: SelectBoxProps) {
  const Width = Dimensions.get("screen").width * 0.9;
  const Height = Dimensions.get("screen").height * 0.5;
  const handleCheck = (isChecked: boolean, option: AlergenProps) => {
    if (isChecked) {
      const alergens = value.data.alergens;
      setValue({
        ...value,
        data: {
          ...value.data,
          alergens: [...alergens, option],
        },
      });
    } else {
      const alergens = value.data.alergens;
      const index = alergens.findIndex((al: AlergenProps) => {return al.id === option.id});
      if (index > -1) {
        const newArr = alergens.filter((al: AlergenProps) => {al.id !== option.id})
        setValue({
          ...value,
          data: {
            ...value.data,
            alergens: newArr,
          },
        });
      }
    }
  };
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
            <BouncyCheckbox
              key={index}
              style={{
                width: "100%",
                height: 70,
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: 30,
                backgroundColor: "#fff",
                borderBottomWidth: 1,
                borderTopWidth: !index ? 1 : 0,
              }}
              isChecked={value.data.alergens.some(
                (alergen: AlergenProps) => alergen.id === option.id
              )}
              text={option.title.hr}
              onPress={(isChecked: boolean) => handleCheck(isChecked, option)}
            ></BouncyCheckbox>
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
