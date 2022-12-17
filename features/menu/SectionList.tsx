import axios from "axios";
import {useEffect, useState} from "react";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SearchIcon from "../../assets/SearchIcon";
import ButtonFullWidth from "../../components/ButtonFullWidth";
import ButtonHalf from "../../components/ButtonHalf";
import Container from "../../components/Container";
import {SortableList} from "../../components/DragSortList/SortableList";
import SearchInput from "../../components/SearchInput";
import {RED} from "../../data/Colors";
import {SUPPORTED_LANGS} from "../../data/Constants";
import {SectionItemProps} from "../../data/Interfaces";
import {getRequest, postRequest, putRequest} from "../../services/FetchItems";
import FormInputBox from "./components/FormInputBox";
import SectionItem from "./components/SectionItem";
//title.hr
export default function SectionList() {
  const [section, setSection] = useState<SectionItemProps[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const [modal, setModal] = useState<{
    isShown: boolean;
    data: SectionItemProps | null;
  }>({
    isShown: false,
    data: null,
  });
  const toggleOnModal = (section: SectionItemProps) => {
    setModal({
      isShown: true,
      data: section,
    });
  };
  const toggleOffModal = () => {
    setModal({
      isShown: false,
      data: null,
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
            console.log(index);
            setSection((prevData) =>
              prevData
                ? [...prevData, (prevData[index] = data)].sort(
                    (a, b) => a.order - b.order
                  )
                : null
            );
          }
        })
        .finally(() => {
          setModal({
            isShown: false,
            data: null,
          });
        })
        .catch((e) => console.log(e.response));
    }
  };
  useEffect(() => {
    getRequest("/section")
      .then((res: any) => {
        let sorted = res.data.data.sort(
          (a: SectionItemProps, b: SectionItemProps) => a.order - b.order
        );
        setSection(sorted);
      })
      .catch((e: any) => console.log(e));
  }, []);
  const searchedArray = section?.filter((section) => {
    return (
      section.title.hr.toLowerCase().includes(searchValue) ||
      section.title.en.toLowerCase().includes(searchValue)
    );
  });
  return (
    <Container>
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
          <View></View>
        )}
      </ScrollView>
      <Modal
        presentationStyle={"fullScreen"}
        animationType="fade"
        visible={modal.isShown}
      >
        {modal.data ? (
          <View style={Styles.container}>
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
          </View>
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
            action={editData}
          />
        </View>
      </Modal>
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
// <SortableList saveAction={save} cancelAction={cancel} list={list}/>
