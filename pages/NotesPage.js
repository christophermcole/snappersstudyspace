import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

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
    setNotes(notes.filter(note => note.id !== id));
  };

  const getRandomColor = () => {
    const colors = ['#9acd32', '#6b8e23', '#556b2f', '#8fbc8f', '#2e8b57'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <PageContainer>
      <Header>My Sticky Notes</Header>
      <InputContainer>
        <NoteInput
          type="text"
          placeholder="Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <NoteInput
          type="text"
          placeholder="Write a note..."
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

const PageContainer = styled.div`
  background: linear-gradient(to bottom right, #0b3d02, #1a5e20);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const NoteInput = styled.input`
  padding: 10px;
  font-size: 1.2rem;
  border-radius: 5px;
  border: none;
  width: 200px;
`;

const AddButton = styled.button`
  padding: 10px 15px;
  font-size: 1.2rem;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #3cb371;
  }
`;

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  max-width: 800px;
`;

const StickyNote = styled.div`
  background-color: ${({ color }) => color};
  padding: 15px;
  width: 200px;
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const NoteTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
`;

const NoteText = styled.p`
  font-size: 1.1rem;
  word-wrap: break-word;
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
