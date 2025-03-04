import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveNote, loadNotes, deleteNoteFromFirestore } from "../library/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";  // For redirection to login page
import withAuth from "@/components/withAuth"; // Also for redirection to login page
// Note: there are two means for redirecting unauthenticated user here. This is redundant, but because everything is functional I am fearful of touching anything.

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check if the user is authenticated and redirect if not
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // User is logged in
        loadNotesFromFirestore();
      } else {
        router.push("/login"); // Redirect to login page if not authenticated
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Load notes from Firestore
  const loadNotesFromFirestore = async () => {
    const savedNotes = await loadNotes();
    setNotes(savedNotes);
  };

  const addNote = async () => {
    if (newTitle.trim() !== "" && newNote.trim() !== "") {
      await saveNote(newNote, newTitle); // Save note
      loadNotesFromFirestore(); // Reload notes from Firestore after adding
      setNewTitle("");
      setNewNote("");
    }
  };

  const deleteNote = async (id) => {
    await deleteNoteFromFirestore(id); // Delete note from Firestore
    loadNotesFromFirestore(); // Reload notes from Firestore after deletion
  };

  return (
    <PageContainer>
      <InputContainer>
        <Header>My Sticky Notes</Header>
        <NoteInput
          type="text"
          placeholder="Title... (max 15 char)"
          maxLength={15}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <NoteInput
          type="text"
          placeholder="Write a note... (max 70 char)"
          maxLength={70}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <AddButton onClick={addNote}>Add Note</AddButton>
      </InputContainer>
      <NotesContainer>
        {notes.map((note) => (
          <StickyNote key={note.id} color={note.color}>  {/* Use color from Firestore */}
            <NoteTitle>{note.title}</NoteTitle>
            <NoteText>{note.content}</NoteText>  {/* Display content here */}
            <DeleteButton onClick={() => deleteNote(note.id)}>×</DeleteButton>
          </StickyNote>
        ))}
      </NotesContainer>
    </PageContainer>
  );
};

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
  width: 100%; 
  margin-top: 20px;
  overflow-y: auto;
  flex-grow: 1;
  padding-bottom: 20px;
`;

const StickyNote = styled.div`
  background-color: ${({ color }) => color};
  padding: 15px;
  width: calc(33.33% - 15px);  /* Adjust width to fit 3 notes per row with space */
  height: 150px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: calc(50% - 15px); /* For smaller screens, show 2 notes per row */
  }

  @media (max-width: 480px) {
    width: 100%; /* For very small screens, show 1 note per row */
  }
`;

const NoteTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #f9eccc; /* Match title text color */
`;

const NoteText = styled.p`
  font-size: 1.1rem;
  color: #f9eccc; /* Match note text color */
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

export default withAuth(NotesPage);
