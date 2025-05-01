import { initializeApp } from "firebase/app";
import {
 getAuth,
 signInWithRedirect,
 signInWithPopup,
 GoogleAuthProvider,
 createUserWithEmailAndPassword,
 signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyCrOIyHmzYfS7bXJJpS6RcRRQg0NBMkQpo",
 authDomain: "crwn-clothing-db-2bc1c.firebaseapp.com",
 projectId: "crwn-clothing-db-2bc1c",
 storageBucket: "crwn-clothing-db-2bc1c.firebasestorage.app",
 messagingSenderId: "568689328211",
 appId: "1:568689328211:web:5149df969c0c9bf2dd06a6",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //It's a class

provider.setCustomParameters({
 prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
 userAuth,
 additionalInformation
) => {
 const userDocRef = doc(db, "users", userAuth.uid);

 console.log(userDocRef);

 const userSnapshot = await getDoc(userDocRef);
 console.log(userSnapshot.exists());

 if (!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
   await setDoc(userDocRef, {
    displayName,
    email,
    createdAt,
    ...additionalInformation,
   });
  } catch (error) {
   console.log("error creating the user", error.message);
  }
 }

 return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
 if (!email || !password) return;

 return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
 if (!email || !password) return;

 return await signInWithEmailAndPassword(auth, email, password);
};
