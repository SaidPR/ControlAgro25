import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Vistas Generales
import Start from "../views/general/Start";
import LogIn from "../views/general/Log_In";
import PantallaInicio from "../views/general/Home";    
import Lista from "../views/general/Lista";
import RecoverPasswordScreen from "../views/general/RecoverPassword";
// Views de Usuarios
import UsersList from "../views/users/UsersList";
import UsersDetails from "../views/users/UsersDetails";
import UserEdit from "../views/users/EditUser";
import AddUser from "../views/users/AddUser";
// Views de Trabajadores
import WorkersList from "../views/workers/WorkersList";
import WorkerDetails from "../views/workers/WorkerDetails";
import AddWorker from "../views/workers/AddWorker";
// Views de Producción
import ProductionControl from "../views/prod/productionControl";
import AddProduction from "../views/prod/addProduction";
import ProductionDetails from "../views/prod/productionDetails";
// Views de Reportes
import ReportList from "../views/reports/ReportList";
import ReportDetails from "../views/reports/ReportDetails";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Views Generales */}
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Home" component={PantallaInicio} />
            <Stack.Screen name="Lista" component={Lista} />
            <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
            {/* Views de Usuarios */}
            <Stack.Screen name="UsersList" component={UsersList} />
            <Stack.Screen name="UsersDetails" component={UsersDetails} />
            <Stack.Screen name="UserEdit" component={UserEdit} />
            <Stack.Screen name="AddUser" component={AddUser} />
            {/* Views de Trabajadores */}
            <Stack.Screen name="WorkersList" component={WorkersList} />
            <Stack.Screen name="WorkerDetails" component={WorkerDetails} options={({ route }) => ({
                    title: `Detalles de ${route.params?.worker?.name || "Trabajador"}`, })} />
            <Stack.Screen name="AddWorker" component={AddWorker} options={{ title: "Registrar Trabajador" }} />
            {/* Views de Producción */}
            <Stack.Screen name="ProductionControl" component={ProductionControl} />
            <Stack.Screen name="AddProduction" component={AddProduction} options={({ route }) => ({
                    title: route.params?.record ? "Editar Registro de Producción" : "Añadir Registro de Producción",
                })} />
            <Stack.Screen name="ProductionDetails" component={ProductionDetails} options={({ route }) => ({
                    title: `Detalles de ${route.params?.record?.name || "Producción"}`, })} />
            {/* Views de Reportes */}
            <Stack.Screen name="ReportList" component={ReportList} />
            <Stack.Screen name="DetailsReports" component={ReportDetails} options={({ route }) => ({
                    title: `Detalles de ${route.params?.report?.title || "Reporte"}`, })} />
        </Stack.Navigator>
    );  
}

export default Navigation;