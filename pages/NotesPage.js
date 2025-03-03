import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newTitle.trim() !== "" && newNote.trim() !== "") {
      setNotes([...notes, { id: uuidv4(), title: newTitle, text: newNote, color: getRandomColor() }]);
      setNewTitle("");
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getRandomColor = () => {
    const colors = ["#9acd32", "#6b8e23", "#556b2f", "#8fbc8f", "#2e8b57"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <PageContainer>
      <InputContainer>
        <Header>My Sticky Notes</Header>
        <NoteInput
          type="text"
          placeholder="Title... (max 15 char)"
          maxLength = {15}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <NoteInput
          type="text"
          placeholder="Write a note... (max 70 char)"
          maxLength = {70}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <AddButton onClick={addNote}>Add Note</AddButton>
      </InputContainer>
      <NotesContainer>
        {notes.map((note) => (
          <StickyNote key={note.id} color={note.color}>
            <NoteTitle>{note.title}</NoteTitle>
            <NoteText>{note.text}</NoteText>
            <DeleteButton onClick={() => deleteNote(note.id)}>×</DeleteButton>
          </StickyNote>
        ))}
      </NotesContainer>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  background: #32643f;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  overflow: hidden;
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  padding-top: 80px;
  padding-bottom: 15px;
`;

const Header = styled.h1`
  font-size: 2rem;
  color: #f9eccc;
  margin-bottom: 10px;
`;

const NoteInput = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  width: 100%;
  max-width: 600px;
  margin-bottom: 10px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  font-size: 1.2rem;
  background-color: #1e2f23;
  color: #f9eccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color:rgb(18, 28, 21);
  }
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 800px;
  margin-top: 20px;
  overflow-y: auto;
  flex-grow: 1;
  padding-bottom: 20px;
`;

const StickyNote = styled.div`
  background-color: ${({ color }) => color};
  padding: 15px;
  width: 200px;
  height: 150px; /* Fixed height for all sticky notes */
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NoteTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const NoteText = styled.p`
  font-size: 1.1rem;
  word-wrap: break-word;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export default NotesPage;
