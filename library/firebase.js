import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const database = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");

// Function to save a new note to Firestore
export const saveNote = async (newNote, newTitle) => {
  try {
    // Generate a random color when saving a new note
    const getRandomColor = () => {
      const colors = [
        "#3a5b0f", "#23380f", "#47701e", "#1a4204", "#044204", "#066406", "#243c0b"
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const notesCollectionRef = collection(database, "userNotes");
    await addDoc(notesCollectionRef, {
      title: newTitle,    // Save the title along with the content
      content: newNote,   // Note content
      timestamp: new Date(),
      color: getRandomColor(), // Store the random color with the note
    });
    console.log("Note saved successfully!");
  } catch (e) {
    console.error("Error saving note: ", e);
  }
};


// Function to load notes from Firestore
export const loadNotes = async () => {
  try {
    const querySnapshot = await getDocs(collection(database, "userNotes"));
    const notes = [];
    querySnapshot.forEach((doc) => {
      notes.push({
        id: doc.id, // Add the document ID so we can delete it later
        ...doc.data(),
      });
    });
    console.log("Loaded notes:", notes);
    return notes;
  } catch (e) {
    console.error("Error loading notes: ", e);
    return [];
  }
};

// Function to delete a note from Firestore by document ID
export const deleteNoteFromFirestore = async (noteId) => {
  try {
    const noteDocRef = doc(database, "userNotes", noteId);
    await deleteDoc(noteDocRef);
    console.log("Note deleted successfully!");
  } catch (e) {
    console.error("Error deleting note: ", e);
  }
};

export default app;
