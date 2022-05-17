import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddScreen from "./Screens/AddScreen";
import ShowScreen from "./Screens/ShowScreen";
import { Box, NativeBaseProvider, Text } from "native-base";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { View } from "react-native";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AddScreen">
          <Stack.Screen
            name="AddScreen"
            component={AddScreen}
            options={{
              headerStyle: {
                backgroundColor: "#00CAA8",
              },
              headerTintColor: "#00CAA8",
            }}
          />
          <Stack.Screen
            name="ShowScreen"
            component={ShowScreen}
            options={{
              title: "Phonebook",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#00CAA8",
              },
              headerTintColor: "#FFFFFF",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
