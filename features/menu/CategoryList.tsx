import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {Route, Text} from "react-native";
import Container from "../../components/Container";
import {CategoryItemProps, SubscreenProps} from "../../data/Interfaces";
import {getRequest} from "../../services/FetchItems";

export default function CategoryList({navigation, route}: SubscreenProps) {
  const [category, setCategory] = useState<CategoryItemProps[] | null>(null);
  useEffect(() => {
    getRequest("/category", {section_id: route.params?.sectionID})
      .then((res) => {
        let sorted = res.data.data.sort(
          (a: CategoryItemProps, b: CategoryItemProps) => a.order - b.order
        );
        setCategory(sorted);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <Container>
      <Text>{"test"}</Text>
      <Text>{route.params?.sectionID}</Text>
    </Container>
  );
}
