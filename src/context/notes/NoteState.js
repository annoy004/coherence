import { createContext, useState } from "react";

const NoteContext = createContext();

const NoteState = (props) => {
  const host = "http://localhost:8000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Add a note
  const addNote = async (title, description, tag, priority, date) => {
    try {
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag, priority, date }),
      });
      const note = await response.json();
      setNotes([...notes, note]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      // API call to delete note by id
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag, priority, date) => {
    try {
      // API call to edit note by id
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag, priority, date }),
      });
      const updatedNote = await response.json();
      setNotes(
        notes.map((note) => (note._id === id ? updatedNote : note))
      );
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;