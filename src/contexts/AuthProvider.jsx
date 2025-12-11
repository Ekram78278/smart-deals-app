import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email, password)
   };

   const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
   }

   useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);  
        });

        return () => {
            unsubscribe()
        }

   }, []);
   
    const authInfo ={
        createUser,
        signInUser,
        user,
        loading
   }
   
    return (
        <div>
            <AuthContext value={authInfo}>
                    {children}
            </AuthContext>
            
        </div>
    );
};

export default AuthProvider;