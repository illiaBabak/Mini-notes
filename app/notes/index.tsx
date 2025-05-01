import { Note } from "@/types";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoteModal } from "@/components/ui/Modal";

// TODO: JEST, README

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const saveNotesToStorage = async (notes: Note[]) => {
    try {
      const jsonValue = JSON.stringify(notes);

      await AsyncStorage.setItem("@notes", jsonValue);
    } catch (e) {
      console.error("Error saving notes", e);
    }
  };

  const loadNotesFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@notes");

      if (!jsonValue) return;

      setNotes(JSON.parse(jsonValue));
    } catch (e) {
      console.error("Error loading notes", e);
    }
  };

  useEffect(() => {
    loadNotesFromStorage();
  }, []);

  useEffect(() => {
    saveNotesToStorage(notes);
  }, [notes]);

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
              setNoteToEdit(note);
              setShouldShowModal(true);
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

      <NoteModal
        shouldShowModal={shouldShowModal}
        setShouldShowModal={setShouldShowModal}
        noteToEdit={noteToEdit}
        setNoteToEdit={setNoteToEdit}
        notes={notes}
        setNotes={setNotes}
      />
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
