import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Route,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ButtonFullWidth from "../../components/ButtonFullWidth";
import Container from "../../components/Container";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import SelectBox from "../../components/SelectBox";
import {RED} from "../../data/Colors";
import {SUPPORTED_LANGS} from "../../data/Constants";
import {
  AlergenProps,
  CategoryItemProps,
  FoodItemProps,
  SubscreenProps,
} from "../../data/Interfaces";
import {Keyboard} from "react-native";
import {getRequest, postRequest, putRequest} from "../../services/FetchItems";
import CategoryItem from "./components/CategoryItem";
import FoodItem from "./components/FoodItem";
import FormInputBox from "./components/FormInputBox";
import MultiCheckboxModal from "./components/MultiCheckboxModal";
import {setMenu, useMenu} from "./context/MenuContext";
import CustomModal from "../../components/CustomModal";
import AddNewButton from "../../components/AddNewButton";
import { showMessage } from "react-native-flash-message";

export default function FoodList({navigation, route}: SubscreenProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectBoxDisplayed, setSelectBoxDisplayed] = useState(false);
  const [alergenBoxDisplayed, setAlergenBoxDisplayed] = useState(false);
  const menu = useMenu();
  const updateMenu = setMenu();
  const category = route.params?.category || null;

  const categories = menu?.categories;
  const alergens = menu?.alergens;
  const isLoaded = menu?.isLoaded;
  const foodItem = category
    ? menu?.food.filter((item) => {
        return item.category_id === category.id;
      })
    : menu?.food;
  const [modal, setModal] = useState<{
    isShown: boolean;
    data: FoodItemProps | null;
    type: "edit" | "save";
  }>({
    isShown: false,
    data: null,
    type: "edit",
  });
  const searchedArray = foodItem?.filter((item) => {
    return (
      item.title.hr.includes(searchValue) || item.title.en.includes(searchValue)
    );
  });
  const newItem :FoodItemProps = ({
    title: {en: "", hr: ""},
    description: {en: "", hr: ""},
    category_id: category || 0,
    order: category?.length || 1,
    price: 0,
    alergens:[],
    id: 0,
  });
  const toggleOnModal = (food: FoodItemProps) => {
    setModal({
      isShown: true,
      data: food,
      type: "edit",
    });
  };
  const editData = () => {
    let data = modal.data;
    if (data)
      data = {
        ...data,
        alergen: data.alergens.map((a) => {
          return a.id;
        }),
      };
    if (data) {
      const body = {
        sentLang: SUPPORTED_LANGS,
        title: {
          en: data.title.en,
          hr: data.title.hr,
        },
        order: data.order,
        id: data.id,
        description: {
          en: data.description.en,
          hr: data.description.hr,
        },
        price: data.price,
        food_category: data.category_id,
        alergen: data.alergen,
      };
      putRequest({prefix: "/food-item-update", params: body})
        .then((res) => {
          if (res.status === 201 && foodItem) {
            if (data) {
              const index = foodItem.findIndex((food) => food.id === data?.id);
              let newArr = foodItem;
              newArr[index] = data;
              if (updateMenu) updateMenu((prev) => ({...prev, food: newArr}));
              setModal({
                isShown: false,
                data: null,
                type: "edit",
              });
            }
          }
        })
        .finally(() => {
          showMessage({
            message: 'Stavka promjenjena',
            type: 'success',
          });
        })
        .catch((e) => console.log(e.response));
    }
  };

  const saveData = () => {
    let data = modal.data;
    if (data)
      data = {
        ...data,
        alergen: data.alergens.map((a) => {
          return a.id;
        }),
      };
    if (data) {
      const body = {
        sentLang: SUPPORTED_LANGS,
        title: {
          en: data.title.en,
          hr: data.title.hr,
        },
        order: data.order,
        description: {
          en: data.description.en,
          hr: data.description.hr,
        },
        price: data.price,
        food_category: data.category_id,
        alergen: data.alergen,
      };
      postRequest({prefix: "/food-item-update", params: body})
        .then((res) => {
          if (res.status === 201 && foodItem) {
            if (data) {
              if (updateMenu)
                updateMenu((prev) => ({
                  ...prev,
                  food: [...prev.food, res.data.item],
                }));
                setModal({
                  isShown: false,
                  data: null,
                  type: "edit",
                });
            }
          }
        })
        .finally(() => {
          showMessage({
            message: 'Stavka stvorena',
            type: 'success',
          });
        })
        .catch((e) => console.log(e.response));
    }
  };
  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <Container>
      <AddNewButton
        action={() => setModal({isShown: true, data: newItem, type:'save'})}
      />
      <Text style={{fontSize: 22}}>{route.params?.category.title.hr}</Text>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      <ScrollView
        style={{width: "100%"}}
        contentContainerStyle={{alignItems: "center", paddingVertical: 20}}
      >
        {searchedArray ? (
          searchedArray.map((item, index) => {
            return (
              <FoodItem
                key={index}
                item={item}
                action={() => toggleOnModal(item)}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </ScrollView>
      <CustomModal
        modal={modal}
        setModal={setModal}
        editData={editData}
        saveData={saveData}
        type={"item"}
        categories={categories}
        alergens={alergens}
      />
    </Container>
  );
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
