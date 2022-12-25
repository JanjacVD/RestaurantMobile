import {useState} from "react";
import {ScrollView, Text} from "react-native";
import { showMessage } from "react-native-flash-message";
import AddNewButton from "../../components/AddNewButton";
import Container from "../../components/Container";
import CustomModal from "../../components/CustomModal";
import Loading from "../../components/Loading";
import SearchInput from "../../components/SearchInput";
import {SUPPORTED_LANGS} from "../../data/Constants";
import {CategoryItemProps, SubscreenProps} from "../../data/Interfaces";
import {postRequest, putRequest} from "../../services/FetchItems";
import CategoryItem from "./components/CategoryItem";
import {setMenu, useMenu} from "./context/MenuContext";
export default function CategoryList({route}: SubscreenProps) {
  const [searchValue, setSearchValue] = useState("");
  const [modal, setModal] = useState<{
    isShown: boolean;
    data: CategoryItemProps | null;
    type: "save" | 'edit'
  }>({
    isShown: false,
    data: null,
    type: 'edit'
  });
  const menu = useMenu();
  const section = route.params?.section || null;
  const sections = menu?.sections;
  const category = section
    ? menu?.categories.filter((cat) => {
        return cat.section_id === section.id;
      })
    : menu?.categories;
  const updateMenu = setMenu();
  const searchedArray = category?.filter((cat) => {
    return (
      cat.title.hr.includes(searchValue) || cat.title.en.includes(searchValue)
    );
  });

  const newCategory :CategoryItemProps = ({
    title: {en: "", hr: ""},
    section_id: section || 0,
    order: category?.length || 1,
    id: 0,
  });
  const toggleOnModal = (category: CategoryItemProps) => {
    setModal({
      isShown: true,
      data: category,
      type: 'edit'
    });
  };
  const editData = () => {
    const data = modal.data;
    if (data) {
      const body = {
        id: data.id,
        title: data.title,
        order: data.order,
        food_section: data.section_id,
        sentLang: SUPPORTED_LANGS,
      };
      putRequest({prefix: "/category-update", params: body})
        .then((res) => {
          if (res.status === 201 && category) {
            const index = category.findIndex((cat) => cat.id === data.id);
            let newArr = category;
            newArr[index] = data;
            if (updateMenu)
              updateMenu((prev) => ({...prev, categories: newArr}));
              setModal({
                isShown: false,
                data: null,
                type: 'edit'
              });
          }
        })
        .finally(() => {
          showMessage({
            message: 'Stavka promjenjena',
            type: 'success',
          });
        })
        .catch((e) => console.log(e.response.status));
    }
  };

  const saveData = () => {
    const data = modal.data;
    if (data) {
      const body = {
        sentLang: SUPPORTED_LANGS,
        title: data.title,
        order: data.order,
        food_section: data.section_id,
      };
      postRequest({prefix: "/category-new", params: body})
        .then((res) => {
          if (res.status === 201 && category) {
            if (updateMenu)
              updateMenu((prev) => ({...prev, categories: [...prev.categories, res.data.item]}));
              setModal({
                isShown: false,
                data: null,
                type: 'edit'
              });
          }
        })
        .finally(() => {
          showMessage({
            message: 'Stavka stvorena',
            type: 'success',
          });
        })
        .catch((e) => console.log(e.response.status));
    }
  };



  return (
    <Container>
      <AddNewButton
        action={() => setModal({isShown: true, data: newCategory, type:'save'})}
      />
      <Text style={{fontSize: 22}}>{section?.title.hr}</Text>
      <SearchInput value={searchValue} setValue={setSearchValue} />
      <ScrollView
        style={{width: "100%"}}
        contentContainerStyle={{alignItems: "center", paddingVertical: 20}}
      >
        {searchedArray ? (
          searchedArray.map((cat, index) => {
            return (
              <CategoryItem
                category={cat}
                key={index}
                action={() => toggleOnModal(cat)}
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
        type="category"
        sections={sections}
      />
    </Container>
  );
}
