import {GestureResponderEvent} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export interface ButtonProps {
  text: string;
  action: ((event: GestureResponderEvent) => void) & (() => void);
  style?: any;
}
export interface RouterProps {
  navigation: NavigationProp<any, any>;
}
export interface SectionItemProps {
  order: number;
  title: TitleInterface
  id: number;
}

interface TitleInterface{
  en:string;
  hr:string;
}
export interface CategoryItemProps extends SectionItemProps {
  section_id: number;
}

export type SubscreenProps = NativeStackScreenProps<any>;
