import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  // register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      // console.log(error.message);
      // console.log(typeof error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "The password must contain at least 6 characters.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail already registered.";
      } else {
        systemErrorMessage = "An error occurred, please try again later.";
      }

      setError(systemErrorMessage);
    }
  };

  // logout - sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, logout, error, loading };
};
