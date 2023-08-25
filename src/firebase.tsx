import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

import UserState from "./shared/types/userstate.type";

const firebaseConfig = {
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const onAuthStateChange = (callback: React.Dispatch<React.SetStateAction<UserState>>) => {
  return auth.onAuthStateChanged(async user => {
    let username = ""
    const loggedIn: boolean = user != null
    if (loggedIn) {
      const docRef = doc(db, "usernames", user!.uid);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data()
      username = docData ? docData.name : ""
    }
    const state: UserState = { 
      loggedIn: loggedIn,
      email: loggedIn ? user!.email : "",
      uid: loggedIn ? user!.uid : "",
      username: username
    }
    callback(state)
  })
}
export const db = getFirestore(app);