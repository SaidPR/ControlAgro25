import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "../views/general/Start";
import LogIn from "../views/general/Log_In";
import PantallaInicio from "../views/general/Home";    
import Lista from "../views/general/Lista";
// Views de Usuarios
import UsersList from "../views/users/UsersList";
import UsersDetails from "../views/users/UsersDetails";
import UserEdit from "../views/users/EditUser";
import AddUser from "../views/users/AddUser";
// Views de Trabajadores
import WorkersList from "../views/workers/WorkersList";
import WorkerDetails from "../views/workers/WorkerDetails";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={PantallaInicio} />
            <Stack.Screen name="Lista" component={Lista} />
            {/* Views de Usuarios */}
            <Stack.Screen name="UsersList" component={UsersList} />
            <Stack.Screen name="UsersDetails" component={UsersDetails} />
            <Stack.Screen name="UserEdit" component={UserEdit} />
            <Stack.Screen name="AddUser" component={AddUser} />
            {/* Views de Trabajadores */}
            <Stack.Screen name="WorkersList" component={WorkersList} />
            <Stack.Screen name="WorkerDetails" component={WorkerDetails} options={({ route }) => ({
                    title: `Detalles de ${route.params?.worker?.name || "Trabajador"}`, })} />
            
        </Stack.Navigator>
    );  
}

export default Navigation;