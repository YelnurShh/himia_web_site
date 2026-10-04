import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail, updateProfile, signOut, type User } from 'firebase/auth';
import { firebaseAuth } from './config';
import { ensureProfile } from './firestore';

function requiredAuth(){const auth=firebaseAuth();if(!auth)throw new Error('Firebase бапталмаған. .env.local файлын толтырыңыз.');return auth;}
export async function registerUser(fullName:string,email:string,password:string,grade:number){const result=await createUserWithEmailAndPassword(requiredAuth(),email,password);await updateProfile(result.user,{displayName:fullName});await ensureProfile(result.user,{fullName,grade});return result.user;}
export async function loginUser(email:string,password:string){return (await signInWithEmailAndPassword(requiredAuth(),email,password)).user;}
export async function googleLogin(){const result=await signInWithPopup(requiredAuth(),new GoogleAuthProvider());await ensureProfile(result.user);return result.user;}
export async function resetPassword(email:string){await sendPasswordResetEmail(requiredAuth(),email);}
export async function logout(){await signOut(requiredAuth());}
export function authError(error:unknown){const code=typeof error==='object'&&error!==null&&'code' in error?String(error.code):'';const map:Record<string,string>={'auth/email-already-in-use':'Бұл email бұрын тіркелген.','auth/invalid-email':'Email мекенжайын тексеріңіз.','auth/weak-password':'Пароль кемінде 6 таңбадан тұруы керек.','auth/invalid-credential':'Email немесе пароль қате.','auth/wrong-password':'Email немесе пароль қате.','auth/user-not-found':'Email немесе пароль қате.','auth/popup-closed-by-user':'Google кіру терезесі жабылды.','auth/network-request-failed':'Интернет байланысын тексеріңіз.','auth/too-many-requests':'Әрекет тым көп. Біраз уақыттан кейін қайталаңыз.','auth/unauthorized-domain':'Firebase Console ішінде осы доменді рұқсат етілген домендерге қосыңыз.'};return map[code]||(error instanceof Error&&!code?error.message:'Әрекет орындалмады. Қайта көріңіз.');}
export type { User };
