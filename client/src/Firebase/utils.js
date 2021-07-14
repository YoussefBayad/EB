import { firebaseConfig } from './config';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// initializeApp

firebase.initializeApp(firebaseConfig);

// auth
export const auth = firebase.auth();

// firestore
export const firestore = firebase.firestore();

// googleAuth

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();

GoogleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

// user  profiler

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const timestamp = new Date();
    const userRoles = ['user'];

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt: timestamp,
        userRoles,
        ...additionalData,
      });
    } catch (err) {}
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// timestamp

export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
