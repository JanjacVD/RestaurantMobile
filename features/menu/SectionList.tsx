import axios from "axios";
import {useEffect, useState} from "react";
import {
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {showMessage} from "react-native-flash-message";
import AddNewButton from "../../components/AddNewButton";
import ButtonFullWidth from "../../components/ButtonFullWidth";
import Container from "../../components/Container";
import CustomModal from "../../components/CustomModal";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import {RED} from "../../data/Colors";
import {SUPPORTED_LANGS} from "../../data/Constants";
import {SectionItemProps} from "../../data/Interfaces";
import {getRequest, postRequest, putRequest} from "../../services/FetchItems";
import FormInputBox from "./components/FormInputBox";
import SectionItem from "./components/SectionItem";
import {setMenu, useMenu} from "./context/MenuContext";
//title.hr
export default function SectionList() {
  const [searchValue, setSearchValue] = useState<string>("");
  const menu = useMenu();
  const updateMenu = setMenu();
  const section = menu?.sections;
  const newSection: SectionItemProps = {
    title: {en: "", hr: ""},
    order: section?.length || 1,
    id: 0,
  };
  const [modal, setModal] = useState<{
    isShown: boolean;
    data: SectionItemProps | null;
    type: "edit" | "save";
  }>({
    isShown: false,
    data: null,
    type: "edit",
  });
  const toggleOnModal = (section: SectionItemProps) => {
    setModal({
      isShown: true,
      data: section,
      type: "edit",
    });
  };
  const editData = () => {
    const data = modal.data;
    if (data) {
      const body = {
        id: data.id,
        title: data.title,
        order: data.order,
        sentLang: SUPPORTED_LANGS,
      };
      putRequest({prefix: "/section-update", params: body})
        .then((res) => {
          if (res.status === 201 && section) {
            const index = section.findIndex((sec) => sec.id === data.id);
            let newArr = section;
            newArr[index] = data;
            if (updateMenu)
              updateMenu((prevState) => ({
                ...prevState,
                sections: newArr,
              }));
            setModal({
              isShown: false,
              data: null,
              type: "edit",
            });
          }
        })
        .finally(() => {
          showMessage({
            message: "Stavka promjenjena",
            type: "success",
          });
        })
        .catch((e) => console.log(e.response));
    }
  };

  const saveData = () => {
    const data = modal.data;
    if (data) {
      const body = {
        id: data.id,
        title: data.title,
        order: data.order,
        sentLang: SUPPORTED_LANGS,
      };
      postRequest({prefix: "/section-new", params: body})
        .then((res) => {
          if (res.status === 201 && section) {
            if (updateMenu)
              updateMenu((prevState) => ({
                ...prevState,
                sections: [...prevState.sections, res.data.item],
              }));
            setModal({
              isShown: false,
              data: null,
              type: "edit",
            });
          }
        })
        .finally(() => {
          showMessage({
            message: "Stavka stvorena",
            type: "success",
          });
        })
        .catch((e) => console.log(e.response));
    }
  };

  const searchedArray = section?.filter((section) => {
    return (
      section.title.hr.toLowerCase().includes(searchValue) ||
      section.title.en.toLowerCase().includes(searchValue)
    );
  });
  return (
    <Container>
      <AddNewButton
        action={() => setModal({isShown: true, data: newSection, type: "save"})}
      />
      <SearchInput value={searchValue} setValue={setSearchValue} />

      <ScrollView
        style={{width: "100%"}}
        contentContainerStyle={{alignItems: "center", paddingVertical: 20}}
      >
        {searchedArray ? (
          searchedArray.map((sec, index) => {
            return (
              <SectionItem
                section={sec}
                key={index}
                action={() => toggleOnModal(sec)}
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
        type={"section"}
      />
    </Container>
  );
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
// <SortableList saveAction={save} cancelAction={cancel} list={list}/>
