import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

import UserState from "./shared/types/userstate.type";

const firebaseConfig = {
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const onAuthStateChange = (callback: React.Dispatch<React.SetStateAction<UserState>>) => {
  return auth.onAuthStateChanged(user => {
    const loggedIn: boolean = user != null
    const state: UserState = { 
      loggedIn: loggedIn,
      email: loggedIn ? user!.email : "",
      uid: loggedIn ? user!.uid : ""
    }
    callback(state)
  })
}
export const db = getFirestore(app);