'use client';
import { createContext, useEffect, useState, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { firebaseAuth, firebaseConfigured } from '@/lib/firebase/config';
import { ensureProfile, profileFor } from '@/lib/firebase/firestore';
import type { UserProfile } from '@/types';
export interface AuthState {user:User|null;profile:UserProfile|null;loading:boolean;configured:boolean;refresh:()=>Promise<void>}
export const AuthContext=createContext<AuthState>({user:null,profile:null,loading:true,configured:firebaseConfigured,refresh:async()=>{}});
export function AuthProvider({children}:{children:ReactNode}){const [user,setUser]=useState<User|null>(null),[profile,setProfile]=useState<UserProfile|null>(null),[loading,setLoading]=useState(firebaseConfigured);async function refresh(){const current=firebaseAuth()?.currentUser;if(current){setUser(current);setProfile(await profileFor(current.uid));}}useEffect(()=>{const auth=firebaseAuth();if(!auth)return;return onAuthStateChanged(auth,async current=>{setUser(current);if(current){try{setProfile(await ensureProfile(current));}catch{setProfile(null);}}else setProfile(null);setLoading(false);});},[]);return <AuthContext.Provider value={{user,profile,loading,configured:firebaseConfigured,refresh}}>{children}</AuthContext.Provider>}
