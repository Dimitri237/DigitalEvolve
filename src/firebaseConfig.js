import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBoa-B2J17mkPu5DEpMadZPQdz9qC8QNMQ",
  authDomain: "jsautoecole-f9886.firebaseapp.com",
  projectId: "jsautoecole-f9886",
  storageBucket: "jsautoecole-f9886.firebasestorage.app",
  messagingSenderId: "920375084234",
  appId: "1:920375084234:web:43e86746c974a2b09d6033"
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage();

async function uploadToFirebase(file, fileName) {
  const storageRef = ref(storage, `OpepMedia/images/${fileName}`);
  const uploadTask = uploadBytes(storageRef, file);

  try {
    await uploadTask;
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image :", error);
    throw error;
  }
}

// Initialisation de l'application Firebase

const firestore = getFirestore(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, firestore, db, uploadToFirebase };
