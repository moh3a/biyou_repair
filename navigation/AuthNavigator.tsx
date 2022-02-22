import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import AccountScreen from "../screens/Root/AccountScreen";

const Auth = createNativeStackNavigator<any>();

const AuthNavigator = ({ navigation }: any) => {
  return (
    <Auth.Navigator
      initialRouteName="Account"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="Account" component={AccountScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="Register" component={RegisterScreen} />
    </Auth.Navigator>
  );
};

export default AuthNavigator;
