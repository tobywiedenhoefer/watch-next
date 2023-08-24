import { createContext } from "react";

import UserState from "../types/userstate.type";

export const defaultUser: UserState = { loggedIn: false, email: "" };
export const UserContext = createContext(defaultUser);
export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;