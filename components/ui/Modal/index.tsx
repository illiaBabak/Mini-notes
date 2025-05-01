import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { Note } from "@/types";

type ModalProps = {
  shouldShowModal: boolean;
  setShouldShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  noteToEdit: Note | null;
  setNoteToEdit: React.Dispatch<React.SetStateAction<Note | null>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  testID?: string;
};

export const NoteModal = ({
  shouldShowModal,
  setShouldShowModal,
  noteToEdit,
  setNoteToEdit,
  notes,
  setNotes,
  testID,
}: ModalProps) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"important" | "normal">("normal");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setType(noteToEdit.type);
    }
  }, [noteToEdit]);

  return (
    <Modal
      testID={testID}
      visible={shouldShowModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setShouldShowModal(false);
        setNoteToEdit(null);
      }}
    >
      <View testID="modal-container" style={styles.modalContainer}>
        <View testID="modal-content" style={styles.modalContent}>
          <TouchableOpacity
            testID="modal-close-button"
            style={styles.closeButton}
            onPress={() => {
              setShouldShowModal(false);
              setNoteToEdit(null);
            }}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>

          <View testID="title-input-container" style={styles.label}>
            <Text>{noteToEdit ? "Edit" : ""} Title: </Text>
            <TextInput
              testID="note-title-input"
              style={styles.modalInput}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View testID="type-picker-container" style={styles.label}>
            <Text>Type: </Text>

            <Picker
              testID="note-type-picker"
              selectedValue={type}
              onValueChange={(value) => setType(value)}
              style={styles.picker}
            >
              <Picker.Item label="Normal" value="normal" />
              <Picker.Item label="Important" value="important" />
            </Picker>
          </View>

          <TouchableOpacity
            testID="modal-submit-button"
            style={[
              styles.button,
              !title.trim().length && {
                opacity: 0.5,
                pointerEvents: "none",
                backgroundColor: "#555",
              },
            ]}
            onPress={() => {
              if (noteToEdit) {
                setNotes(
                  notes.map((note) =>
                    note.id === noteToEdit.id ? { ...note, title, type } : note
                  )
                );
              } else setNotes([...notes, { title, type, id: uuidv4() }]);

              setTitle("");
              setType("normal");
              setNoteToEdit(null);
              setShouldShowModal(false);
            }}
            disabled={!title.trim().length}
          >
            <Text style={styles.buttonText}>{noteToEdit ? "Edit" : "Add"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
