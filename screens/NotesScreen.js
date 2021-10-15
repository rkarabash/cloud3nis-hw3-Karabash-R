import React, { useState } from "react";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Button,
  Colors,
} from "react-native-paper";
import { StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "30px, auto, 20px",
    width: "100%",
    paddingBottom: "10px",
  },
  card: {
    width: "95%",
    marginTop: "10px",
  },
});

const getNotes = async () => {
  const notes = await AsyncStorage.getItem("NOTES");
  if (notes !== null && notes.length > 0) {
    return JSON.parse(notes);
  } else {
    AsyncStorage.setItem("NOTES", JSON.stringify([]));
    return [];
  }
};
export default function NotesScreen({ navigation }) {
  let [notes, setNotes] = useState([]);
  let [flag, setFlag] = useState(true);
  if (flag) {
    setFlag(false);
    getNotes().then((x) => setNotes(x));
  }

  console.log(notes);
  return (
    <SafeAreaView style={styles.container}>
      {notes.map((item) => {
        return (
          <Card style={styles.card} mode="outlined">
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                color={Colors.blue700}
                onPress={() =>
                  navigation.navigate("Edit", {
                    setList: setNotes,
                    list: notes,
                    value: item,
                  })
                }
              >
                Edit
              </Button>
              <Button
                color={Colors.blue700}
                onPress={() => {
                  AsyncStorage.setItem(
                    "NOTES",
                    JSON.stringify(notes.filter((x) => x != item))
                  );
                  setNotes(notes.filter((x) => x != item));
                }}
              >
                Delete
              </Button>
            </Card.Actions>
          </Card>
        );
      })}

      <IconButton
        icon="plus"
        size={40}
        color={Colors.white}
        onPress={() => {
          navigation.navigate("Add", { setList: setNotes, list: notes });
        }}
        style={{
          borderRadius: "50%",
          backgroundColor: Colors.blue500,
          position: "fixed",
          bottom: 10,
          right: 10,
        }}
      />
    </SafeAreaView>
  );
}
