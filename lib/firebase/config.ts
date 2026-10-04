import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
export const firebaseConfigured = Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
let app:FirebaseApp | null=null;
export function firebaseApp(){if(!firebaseConfigured)return null;app ??= getApps().length ? getApp() : initializeApp(config);return app;}
export function firebaseAuth():Auth | null {const a=firebaseApp();return a?getAuth(a):null;}
export function firestore():Firestore | null {const a=firebaseApp();return a?getFirestore(a):null;}
