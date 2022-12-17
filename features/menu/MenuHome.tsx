import {useState} from "react";
import {TextInput} from "react-native-gesture-handler";
import ButtonFullWidth from "../../components/ButtonFullWidth";
import Container from "../../components/Container";
import { RouterProps } from "../../data/Interfaces";

export function MenuHome({navigation}: RouterProps) {
  return (
    <Container>
      <ButtonFullWidth text="Sekcije" action={() => navigation.navigate('SectionList')}/>
      <ButtonFullWidth text="Kategorije" action={() => navigation.navigate('CategoryList')}/>
      <ButtonFullWidth text="Stavke" action={() => navigation.goBack()}/>
    </Container>
  );
}
