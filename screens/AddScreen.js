import React, { useState, useEffect } from "react";
import { Button, Colors, TextInput } from "react-native-paper";
import { Image, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, SafeAreaView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "20px, auto, 20px",
    width: "100%",
    paddingBottom: "10px",
  },
  inputs: {
    marginTop: "10px",
    width: "95%",
  },
});

export default function AddScreen({ route, navigation }) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const { setList, list } = route.params;
  const addNote = async (navigation) => {
    const current = new Date().toString();
    if (Title.length > 0) {
      const note = {
        title: Title,
        description: Description,
        date: current,
      };
      AsyncStorage.setItem("NOTES", JSON.stringify([...list, note]));
      console.log([...list, note]);
      setList([...list, note]);
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.inputs}
        label="Title"
        value={Title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        style={styles.inputs}
        label="Description"
        value={Description}
        multiline
        numberOfLines={10}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

      <Button
        style={
          (styles.inputs,
          { backgroundColor: Colors.blue500, marginTop: "10px", width: "95%" })
        }
        color={Colors.white}
        icon="content-save"
        onPress={() => {
          addNote(navigation);
        }}
      >
        Add new note
      </Button>
    </SafeAreaView>
  );
}
