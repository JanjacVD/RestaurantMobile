import {createStackNavigator} from "@react-navigation/stack";
import {TouchableOpacity} from "react-native";
import BackIcon from "../assets/BackIcon";
import AlergenList from "../features/menu/AlergenList";
import CategoryList from "../features/menu/CategoryList";
import MenuContextProvider from "../features/menu/context/MenuContext";
import FoodList from "../features/menu/FoodList";
import {MenuHome} from "../features/menu/MenuHome";
import SectionList from "../features/menu/SectionList";
export default function MenuScreen() {
  const Stack = createStackNavigator();
  return (
    <MenuContextProvider>
      <Stack.Navigator
        detachInactiveScreens
        screenOptions={({navigation, route}) => ({
          headerLeft: () =>
            navigation.canGoBack() ? (
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.goBack()}
              >
                <BackIcon />
              </TouchableOpacity>
            ) : null,
          headerShown: true,
          headerTitle: () => null,
        })}
        initialRouteName="MenuHomeScreen"
      >
        <Stack.Screen name="MenuHomeScreen" component={MenuHome} />
        <Stack.Screen name="SectionList" component={SectionList} />
        <Stack.Screen name="CategoryList" component={CategoryList} />
        <Stack.Screen name="FoodItemList" component={FoodList} />
        <Stack.Screen name="AlergenList" component={AlergenList} />
      </Stack.Navigator>
    </MenuContextProvider>
  );
}
