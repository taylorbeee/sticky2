import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotesList from "./NotesList";
import "../src/styles.css";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    },
  ]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const savedNotesString = JSON.stringify(notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }, [notes]);

  useEffect(() => {
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      setNotes(savedNotes);
    }
  }, []);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    setNotes([newNote, ...notes]);
  };

  const onType = (editMeId, updatedKey, updatedValue) => {
    const updatedNotes = notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          return { ...note, title: updatedValue };
        } else {
          return { ...note, description: updatedValue };
        }
      }
    });
    setNotes(updatedNotes);
  };

  const onSearch = (text) => {
    const lowerSearchText = text.toLowerCase();
    const matchingNotes = notes.map((note) => {
      if (!lowerSearchText) {
        return { ...note, doesMatchSearch: true };
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(lowerSearchText);
        const descriptionMatch = description.includes(lowerSearchText);
        const hasMatch = titleMatch || descriptionMatch;
        return { ...note, doesMatchSearch: hasMatch };
      }
    });
    setNotes(matchingNotes);
    setSearchText(lowerSearchText);
  };

  const removeNote = (noteId) => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
  };

  return (
    <div>
      <Header onSearch={onSearch} addNote={addNote} searchText={searchText} />
      <NotesList removeNote={removeNote} onType={onType} notes={notes} />
    </div>
  );
};

export default App;
