import React , {useState,useEffect} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QRCodeScannerScreen from "./src/QRCodeScannerScreen";
import SuccesScreen from "./src/SuccesScreen";
import LoginScreen from "./src/LoginScreen";
import SignUpScreen from "./src/SignUpScreen";
import AdminLogin from "./src/admin/AdminLogin";
import AdminScreen from "./src/AdminScreen";
import YeniLogin from "./src/YeniLogin";
import WelcomeScreen from "./src/WelcomeScreen";
import { auth } from "./src/firebase-config";


const Stack = createNativeStackNavigator();


function App(){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [IsAdmin,setIsAdmin] = useState();


useEffect(() => {
  const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);

  // Handle user state changes
  const onAuthStateChanged =user => {
    setUser(user);
    if (initializing) setInitializing(false);
    if (user) {
      if (user.uid === 'bVxDvUOE9cN9qmGFLIdeXyV2TBT2') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }


  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{animation:"slide_from_right"}} >
        {user ? 
          <>
          {IsAdmin?
             <Stack.Screen name='AdminScreen' component={AdminScreen} options={{headerShown:false}}/>
             :
             <>
              <Stack.Screen name='QRCodeScannerScreen' component={QRCodeScannerScreen} options={{headerShown:false}}/>
              <Stack.Screen name='SuccesScreen' component={SuccesScreen} options={{headerShown:false}}/>
            </>
          }
            
           
          </>
          :
          <>
      
            
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name='LoginScreen' component={LoginScreen} options={{headerShown:false}}/>
            
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown:false}}/>
            <Stack.Screen name='AdminLogin' component={AdminLogin} options={{headerShown:false}}/>
           
          </>
        }
        
      </Stack.Navigator>
    </NavigationContainer>
  )

}
export default App;