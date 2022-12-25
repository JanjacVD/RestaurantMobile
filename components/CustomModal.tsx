import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import {RED} from "../data/Colors";
import {
  AlergenProps,
  CategoryItemProps,
  SectionItemProps,
} from "../data/Interfaces";
import FormInputBox from "../features/menu/components/FormInputBox";
import MultiCheckboxModal from "../features/menu/components/MultiCheckboxModal";
import {setMenu, useMenu} from "../features/menu/context/MenuContext";
import {deleteRequest} from "../services/FetchItems";
import ButtonFullWidth from "./ButtonFullWidth";
import DeleteButton from "./DeleteButton";
import SelectBox from "./SelectBox";
import {showMessage, hideMessage} from "react-native-flash-message";

export default function CustomModal({
  modal,
  setModal,
  editData,
  type,
  sections,
  categories,
  alergens,
  saveData,
}: CustomModalProps) {
  const toggleOffModal = () => {
    setModal({
      isShown: false,
      data: null,
    });
  };
  const updateMenu = setMenu();
  const menu = useMenu();
  const [selectBoxDisplayed, setSelectBoxDisplayed] = useState(false);
  const [alergenBoxDisplayed, setAlergenBoxDisplayed] = useState(false);
  const confirmDelete = () => {
    Alert.alert("Želite li izbrisati ovu stavku?", modal.data.title.hr, [
      {
        text: "Otkaži",
        style: "cancel",
      },
      {
        text: "Potvrdi",
        onPress: () => handleDelete(),
        style: "destructive",
      },
    ]);
  };
 
  const handleDelete = () => {
    let prefix = "";
    if (type === "item") {
      prefix = "/food-item-delete";
      const newArr = menu?.food.filter((item) => item.id !== modal.data.id);
      if (updateMenu) updateMenu((prev) => ({...prev, food: newArr || []}));
    } else if (type === "category") {
      prefix = "/category-delete";
      const newArr = menu?.categories.filter(
        (item) => item.id !== modal.data.id
      );
      if (updateMenu)
        updateMenu((prev) => ({...prev, categories: newArr || []}));
    } else if (type === "section") {
      prefix = "/section-delete";
      const newArr = menu?.sections.filter((item) => item.id !== modal.data.id);
      if (updateMenu) updateMenu((prev) => ({...prev, sections: newArr || []}));
    } else if (type === "alergen") {
      prefix = "/alergen-delete";
      const newArr = menu?.alergens.filter((item) => item.id !== modal.data.id);
      if (updateMenu) updateMenu((prev) => ({...prev, alergens: newArr || []}));
    }
    deleteRequest({prefix, params: {id: modal.data.id}})
      .then(() =>
      setModal({data: null, isShown: false, type: "edit"})
      ).finally(() => {
        showMessage({
          message: 'Stavka izbrisana',
          type: 'success',
        });
      })
      .catch((e) => console.log(e));
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Modal
        presentationStyle={"fullScreen"}
        animationType="fade"
        visible={modal.isShown}
      >
        {modal.data ? (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={Styles.container}>
              {modal.type === "edit" ? (
                <DeleteButton action={confirmDelete}/>
              ) : null}
              <FormInputBox
                value={modal.data.title.hr}
                label={"Naslov hrvatski"}
                onChangeText={(text) => {
                  modal.data
                    ? setModal({
                        ...modal,
                        data: {
                          ...modal.data,
                          title: {...modal.data.title, hr: text},
                        },
                      })
                    : undefined;
                }}
              />
              <FormInputBox
                value={modal.data.title.en}
                label={"Naslov engleski"}
                onChangeText={(text) => {
                  modal.data
                    ? setModal({
                        ...modal,
                        data: {
                          ...modal.data,
                          title: {...modal.data.title, en: text},
                        },
                      })
                    : undefined;
                }}
              />
              {type === "category" ? (
                <View>
                  <Text style={{fontSize: 20}}>Odjeljak:</Text>
                  <TouchableOpacity
                    onPress={() => setSelectBoxDisplayed(true)}
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      padding: 10,
                      borderRadius: 12,
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{fontSize: 20}}>
                      {modal.data?.section_id
                        ? sections?.filter((section) => {
                            return section.id === modal.data?.section_id;
                          })[0].title.hr || "NULL"
                        : "NULL"}
                    </Text>
                  </TouchableOpacity>
                  {selectBoxDisplayed ? (
                    <SelectBox
                      value={modal}
                      options={sections || []}
                      setValue={setModal}
                      toggler={setSelectBoxDisplayed}
                    />
                  ) : null}
                </View>
              ) : null}
              {type === "item" ? (
                <View>
                  <FormInputBox
                    value={modal.data.description.hr}
                    label={"Opis hrvatski"}
                    onChangeText={(text) => {
                      modal.data
                        ? setModal({
                            ...modal,
                            data: {
                              ...modal.data,
                              description: {
                                ...modal.data.description,
                                hr: text,
                              },
                            },
                          })
                        : undefined;
                    }}
                  />
                  <FormInputBox
                    value={modal.data.description.en}
                    label={"Opis engleski"}
                    onChangeText={(text) => {
                      modal.data
                        ? setModal({
                            ...modal,
                            data: {
                              ...modal.data,
                              description: {
                                ...modal.data.description,
                                en: text,
                              },
                            },
                          })
                        : undefined;
                    }}
                  />
                  <FormInputBox
                    value={modal.data.price}
                    label={"Cijena"}
                    numeric={true}
                    onChangeText={(text) => {
                      modal.data
                        ? setModal({
                            ...modal,
                            data: {
                              ...modal.data,
                              price: text,
                            },
                          })
                        : undefined;
                    }}
                  />
                  <Text style={{fontSize: 20}}>Kategorija:</Text>
                  <TouchableOpacity
                    onPress={() => setSelectBoxDisplayed(true)}
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      padding: 10,
                      borderRadius: 12,
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{fontSize: 20}}>
                      {modal.data?.category_id
                        ? categories?.filter((cat) => {
                            return cat.id === modal.data?.category_id;
                          })[0]?.title.hr
                        : "NULL"}
                    </Text>
                  </TouchableOpacity>
                  {selectBoxDisplayed ? (
                    <SelectBox
                      value={modal}
                      options={categories || []}
                      setValue={setModal}
                      toggler={setSelectBoxDisplayed}
                    />
                  ) : null}
                  <TouchableOpacity
                    onPress={() => setAlergenBoxDisplayed(true)}
                    style={{
                      borderWidth: 1,
                      width: "90%",
                      padding: 10,
                      borderRadius: 12,
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{fontSize: 20}}>Alergeni</Text>
                  </TouchableOpacity>
                  {alergenBoxDisplayed ? (
                    <MultiCheckboxModal
                      value={modal}
                      options={alergens || []}
                      setValue={setModal}
                      toggler={setAlergenBoxDisplayed}
                    />
                  ) : null}
                </View>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            alignItems: "center",
            minHeight: "15%",
          }}
        >
          <ButtonFullWidth
            text="Otkaži"
            style={{width: "40%", backgroundColor: RED}}
            action={toggleOffModal}
          />
          <ButtonFullWidth
            text="Spremi"
            style={{width: "40%"}}
            action={modal.type === "edit" ? editData : saveData}
          />
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
}

interface CustomModalProps {
  modal: {isShown: boolean; data: any; type: "edit" | "save"};
  setModal: Dispatch<SetStateAction<any>>;
  editData(): void;
  saveData(): void;
  type: "item" | "section" | "category" | "gallery" | "alergen";
  sections?: SectionItemProps[];
  categories?: CategoryItemProps[];
  alergens?: AlergenProps[];
}
const Styles = StyleSheet.create({
  container: {
    minHeight: "75%",
    width: "100%",
    paddingTop: 40,
    marginLeft: "5%",
    flex: 1,
  },
});
