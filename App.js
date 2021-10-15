import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { IconButton, Colors } from "react-native-paper";
import AddScreen from "./screens/AddScreen";
import EditScreen from "./screens/EditScreen";
import NotesScreen from "./screens/NotesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Name">
        <Stack.Screen
          name="Home"
          component={NotesScreen}
          options={{
            headerRight: () => (
              <IconButton
                size={30}
                animated={true}
                icon="sort"
                color={Colors.blue500}
              />
            ),
            title: "My Notes",
          }}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{
            title: "Add Note",
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            title: "Edit Note",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
