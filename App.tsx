import {StatusBar} from "expo-status-bar";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import {RED, WHITE} from "./data/Colors";
import {Button, Dimensions, Text} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import SearchIcon from "./assets/SearchIcon";
import BackIcon from "./assets/BackIcon";
const Tabs = createBottomTabNavigator();
const Width = Dimensions.get("screen").width;
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Tabs.Navigator
        detachInactiveScreens
        screenOptions={({navigation, route}) => ({
          tabBarStyle: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          },
          tabBarButton: () => {
            const state = navigation.getState();
            const index = state.index;
            const arr = state.routeNames;
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate(route.name)}
                style={{
                  height: Width / 6,
                  width: Width / 6,
                  marginHorizontal: Width / 60,
                  borderRadius:
                    arr[index] === route.name ? Width / 6 / 2 : Width / 6 / 4,
                  marginTop: arr[index] === route.name ? -10 : 0,
                  backgroundColor: arr[index] === route.name ? RED : WHITE,
                  borderWidth: 1,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{fontSize: 10}}>{route.name}</Text>
              </TouchableOpacity>
            );
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
          options={({navigation, route}) => ({
            tabBarLabel: "Rezervacije",
            tabBarButton: () => {
              const state = navigation.getState();
              const index = state.index;
              const arr = state.routeNames;
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(route.name)}
                  style={{
                    height: Width / 5,
                    width: Width / 5,
                    marginHorizontal: Width / 100,
                    borderRadius:
                      arr[index] === route.name ? Width / 6 / 2 : Width / 6 / 4,
                    marginTop: arr[index] === route.name ? -10 : 0,
                    backgroundColor: arr[index] === route.name ? RED : WHITE,
                    borderWidth: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{fontSize: 10}}>{route.name}</Text>
                </TouchableOpacity>
              );
            },
          })}
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
