import React from 'react';
import { createContext, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) console.log("Error");
    return context;
};

export function AuthProvider({ children }) {
    const insert = async (email,password)=>{
      const response = await  createUserWithEmailAndPassword(email, password);
    }
    return <AuthContext.Provider value={{
        insert
    }}>{children}</AuthContext.Provider>;
}