import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import PerfilScreen from "../screens/PerfilScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OperacionesScreen from "../screens/OperacionesScreen";
import ProductosScreen from "../screens/ProductosScreen";

const Stack = createStackNavigator()
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="BottomTabs" component={MyBottomTabs} />
        </Stack.Navigator>
    )
}

const BottomTabs = createBottomTabNavigator()
function MyBottomTabs() {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name="Operaciones" component={OperacionesScreen} ></BottomTabs.Screen>
            <BottomTabs.Screen name="Productos" component={ProductosScreen} />
            <BottomTabs.Screen name="Perfil" component={PerfilScreen} />
        </BottomTabs.Navigator>
    )
}

export default function NavegadorPrincipal() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}