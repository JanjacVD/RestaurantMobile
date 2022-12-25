import axios from "axios";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SectionItemProps,
  CategoryItemProps,
  FoodItemProps,
  AlergenProps,
} from "../../../data/Interfaces";
import {getRequest} from "../../../services/FetchItems";

const MenuContext = createContext<MenuContextMain | undefined>(undefined);

export default function MenuContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [menuState, setMenuState] = useState<MenuContextProps>({
    isLoaded: false,
    sections: [],
    categories: [],
    food: [],
    alergens: [],
  });
  useEffect(() => {
    axios
      .all([
        getRequest("/section"),
        getRequest("/category"),
        getRequest("/food-item"),
        getRequest("/alergen"),
      ])
      .then(
        axios.spread((sec, cat, food, ale) => {
          setMenuState({
            isLoaded: false,
            sections: sec.data.data,
            categories: cat.data.data,
            food: food.data.data,
            alergens: ale.data.data,
          });
        })
      )
      .finally(() => setMenuState((prev) => ({...prev, isLoaded: true}))).catch(e => console.log(e));
  }, []);
  return (
    <MenuContext.Provider value={{menuState, setMenuState}}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenu = () => useContext(MenuContext)?.menuState;
export const setMenu = () => useContext(MenuContext)?.setMenuState;
interface MenuContextProps {
  isLoaded: boolean;
  sections: SectionItemProps[];
  categories: CategoryItemProps[];
  food: FoodItemProps[];
  alergens: AlergenProps[];
}
interface MenuContextMain {
  menuState: MenuContextProps;
  setMenuState: Dispatch<SetStateAction<MenuContextProps>>;
}
