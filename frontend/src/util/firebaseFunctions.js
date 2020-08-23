import firebase from '../firebase';

export const logout = () => firebase.auth().signOut();

export const login = (email, password) =>
         firebase.auth().signInWithEmailAndPassword(email, password);

export const signUp = (email, password) => firebase
         .auth()
         .createUserWithEmailAndPassword(email, password);

export const getFirebaseIdToken = () =>
         firebase.auth().currentUser.getIdToken(true);