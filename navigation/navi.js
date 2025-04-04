import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../views/general/Start";
import LogIn from "../views/general/Log_In";
import PantallaInicio from "../components/Home";    
import Lista from "../views/general/Lista";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={PantallaInicio} />
            <Stack.Screen name="Lista" component={Lista} />
        </Stack.Navigator>
    );  
}

export default Navigation;