import {useState} from "react";
import {ScrollView, StyleSheet} from "react-native";
import {showMessage} from "react-native-flash-message";
import AddNewButton from "../../components/AddNewButton";
import Container from "../../components/Container";
import CustomModal from "../../components/CustomModal";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import {SUPPORTED_LANGS} from "../../data/Constants";
import {AlergenProps, SectionItemProps} from "../../data/Interfaces";
import {postRequest, putRequest} from "../../services/FetchItems";
import AlergenItem from "./components/AlergenItem";
import SectionItem from "./components/SectionItem";
import {setMenu, useMenu} from "./context/MenuContext";
//title.hr
export default function AlergenList() {
  const [searchValue, setSearchValue] = useState<string>("");
  const menu = useMenu();
  const updateMenu = setMenu();
  const alergens = menu?.alergens;
  const newAlergen: AlergenProps = {
    title: {en: "", hr: ""},
    order: alergens?.length || 1,
    id: 0,
  };
  const [modal, setModal] = useState<{
    isShown: boolean;
    data: AlergenProps | null;
    type: "edit" | "save";
  }>({
    isShown: false,
    data: null,
    type: "edit",
  });
  const toggleOnModal = (section: AlergenProps) => {
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
      putRequest({prefix: "/alergen-update", params: body})
        .then((res) => {
          if (res.status === 201 && alergens) {
            const index = alergens.findIndex((ale) => ale.id === data.id);
            let newArr = alergens;
            newArr[index] = data;
            if (updateMenu)
              updateMenu((prevState) => ({
                ...prevState,
                alergens: newArr,
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
      postRequest({prefix: "/alergen-new", params: body})
        .then((res) => {
          if (res.status === 201 && alergens) {
            if (updateMenu)
              updateMenu((prevState) => ({
                ...prevState,
                alergens: [...prevState.alergens, res.data.item],
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

  const searchedArray = alergens?.filter((alergen) => {
    return (
      alergen.title.hr.toLowerCase().includes(searchValue) ||
      alergen.title.en.toLowerCase().includes(searchValue)
    );
  });
  return (
    <Container>
      <AddNewButton
        action={() => setModal({isShown: true, data: newAlergen, type: "save"})}
      />
      <SearchInput value={searchValue} setValue={setSearchValue} />

      <ScrollView
        style={{width: "100%"}}
        contentContainerStyle={{alignItems: "center", paddingVertical: 20}}
      >
        {searchedArray ? (
          searchedArray.map((al, index) => {
            return (
              <AlergenItem
                alergen={al}
                key={index}
                action={() => toggleOnModal(al)}
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
        type={"alergen"}
      />
    </Container>
  );
}
// <SortableList saveAction={save} cancelAction={cancel} list={list}/>
