import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import {Dimensions} from "react-native";
import FlashMessage from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
const Tabs = createBottomTabNavigator();
const Width = Dimensions.get("screen").width;
const Height = Dimensions.get("screen").height;
export default function App() {
  return (
    <NavigationContainer>
      <FlashMessage position={'top'}/>
      <StatusBar hidden={true} />
      <Tabs.Navigator
        detachInactiveScreens
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused
                ? "ios-home-sharp"
                : "ios-home-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }
            else if(route.name === "Gallery"){
              iconName = focused ? "ios-images-sharp" : "ios-images-outline"
            }
            else if(route.name === "Reservations"){
              iconName = focused ? "ios-book-sharp" : "ios-book-outline"
            }
            else if(route.name === "Menu"){
              iconName = focused ? "ios-fast-food-sharp" : "ios-fast-food-outline"
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName || ""} size={size} color={color} />;
          },
         
          headerShown: true,
          headerTitle: "App name",
          headerTitleAlign: "center",
        })}
        initialRouteName="Home"
      >
        <Tabs.Screen
          options={{tabBarLabel: "Naslovna"}}
          name="Home"
          component={HomeScreen}
        />
        <Tabs.Screen
          options={{tabBarLabel: "Jelovnik"}}
          name="Menu"
          component={MenuScreen}
        />
        <Tabs.Screen
          options={{tabBarLabel: "Rezervacije"}}
          name="Reservations"
          component={HomeScreen}
        />
        <Tabs.Screen
          options={{tabBarLabel: "Galerija"}}
          name="Gallery"
          component={HomeScreen}
        />
        <Tabs.Screen
          options={{tabBarLabel: "Postavke"}}
          name="Settings"
          component={HomeScreen}
        />
        {/* <Tabs.Screen
          options={{tabBarLabel: "Osoblje"}}
          name="Staff"
          component={HomeScreen}
        /> */}
      </Tabs.Navigator>
    </NavigationContainer>
  );
}
