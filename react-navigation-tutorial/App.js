import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NestedStackNavigator} from "./src/NestedStackNavigator";
import {ScreenB} from "./src/ScreenB";

const Stack = createNativeStackNavigator()
const BottomTab =  createBottomTabNavigator()

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name={'ScreenA'} component={ScreenA} />
//         <Stack.Screen name={'ScreenB'} component={ScreenB} />
//         <Stack.Screen name={"NestedNavigator"} component={NestedStackNavigator}/>
//       </Stack.Navigator>
//
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"NestedBottomTab"} component={NestedStackNavigator}/>
        <Stack.Screen name={"ScreenB"} component={ScreenB}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}