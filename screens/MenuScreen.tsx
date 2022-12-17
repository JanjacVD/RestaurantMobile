import {createStackNavigator} from '@react-navigation/stack'
import { TouchableOpacity } from 'react-native'
import BackIcon from '../assets/BackIcon'
import CategoryList from '../features/menu/CategoryList'
import { MenuHome } from '../features/menu/MenuHome'
import SectionList from '../features/menu/SectionList'
export default function MenuScreen(){
    const Stack = createStackNavigator()
    return(
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
          headerShown:true,
          headerTitle:()  => null
        })}
        initialRouteName="MenuHomeScreen"
        >
            <Stack.Screen name='MenuHomeScreen' component={MenuHome} />
            <Stack.Screen name='SectionList' component={SectionList} />
            <Stack.Screen name='CategoryList' component={CategoryList} />
        </Stack.Navigator>
    )
}