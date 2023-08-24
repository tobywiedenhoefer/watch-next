import { useCallback, useEffect, useState } from 'react'

import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";

import { auth, onAuthStateChange } from "./firebase";

import Login from './Pages/Login';
import Logout from './Pages/Logout'
import Register from './Pages/Register';
import Header from './components/Header';

import './App.css'
import LoggedInView from './Pages/LoggedInView';
import LoggedOutView from './Pages/LoggedOutView';
import UserState from './shared/types/userstate.type';
import { UserProvider } from './shared/contexts/UserContext';


function App() {
  const [user, setUser] = useState<UserState>({ loggedIn: false })
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => unsubscribe()
  }, [])
  const requestLogout = useCallback(() => logout(), [])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Header />}>
        <Route index element={user.loggedIn ? <LoggedInView /> : <LoggedOutView />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout callback={requestLogout} />} />
        <Route path='/register' element={<Register />} />
      </Route>
    )
  )
  const logout = () => auth.signOut();
  return (
    <UserProvider value={user}>
      <RouterProvider router={router} />
    </UserProvider>
  )
}

export default App
