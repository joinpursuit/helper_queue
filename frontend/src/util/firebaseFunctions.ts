import firebase from "../firebase";

export const logout = () => firebase.auth().signOut();

export const login = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signUp = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const getFirebaseIdToken = () =>
  firebase.auth().currentUser?.getIdToken(true);

export const forgotPassword = (email: string) =>
  firebase.auth().sendPasswordResetEmail(email);
