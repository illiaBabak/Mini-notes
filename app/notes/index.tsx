import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Note } from "@/types";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

// TODO: EDIT, ASYNC STORAGE, REFACTORING, JEST, README

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [noteIdToEdit, setNoteIdToEdit] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<"important" | "normal">("normal");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My notes</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShouldShowModal(true)}
      >
        <Text style={styles.buttonText}>Add note</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollViewNotes}>
        {notes.map((note) => (
          <TouchableOpacity
            onPress={() => {
              setNoteIdToEdit(note.id);
              setShouldShowModal(true);
              setTitle(note.title);
              setType(note.type);
            }}
            key={`note-${note.id}`}
          >
            <View style={styles.note}>
              <TouchableOpacity
                onPress={() => setNotes(notes.filter((n) => n.id !== note.id))}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>x</Text>
              </TouchableOpacity>

              <Text>{note.title}</Text>
              <Text>{note.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        visible={shouldShowModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShouldShowModal(false);
          setNoteIdToEdit(null);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShouldShowModal(false);
                setNoteIdToEdit(null);
              }}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <View style={styles.label}>
              <Text>{!!noteIdToEdit ? "Edit" : ""} Title: </Text>
              <TextInput
                style={styles.modalInput}
                value={title}
                onChangeText={setTitle}
              />
            </View>

            <View style={styles.label}>
              <Text>Type: </Text>

              <Picker
                selectedValue={type}
                onValueChange={(value) => setType(value)}
                style={styles.picker}
              >
                <Picker.Item label="Normal" value="normal" />
                <Picker.Item label="Important" value="important" />
              </Picker>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                !title.trim().length && {
                  opacity: 0.5,
                  pointerEvents: "none",
                  backgroundColor: "#555",
                },
              ]}
              onPress={() => {
                if (noteIdToEdit)
                  setNotes(
                    notes.map((note) =>
                      note.id === noteIdToEdit ? { ...note, title, type } : note
                    )
                  );
                else setNotes([...notes, { title, type, id: uuidv4() }]);

                setTitle("");
                setType("normal");
                setNoteIdToEdit(null);
                setShouldShowModal(false);
              }}
              disabled={!title.trim().length}
            >
              <Text style={styles.buttonText}>
                {noteIdToEdit ? "Edit" : "Add"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 12,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#252525",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    height: "40%",
    width: "80%",
    position: "relative",
    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "80%",
    zIndex: 2,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: "80%",
    height: 110,
    transform: [{ translateY: "-50%" }],
    marginTop: 20,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 14,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#000",
  },
  scrollViewNotes: {
    width: "80%",
  },
  note: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 20,
  },
});

export default Notes;
