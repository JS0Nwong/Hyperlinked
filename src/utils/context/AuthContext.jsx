import { useContext, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() { return useContext(AuthContext) }

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsub = onAuthStateChanged((auth), user => {
            setCurrentUser(user)
            setIsLoading(false)
        })
        return unsub
    }, [])

    const registerUser = async (email, pass, username) => {
        return createUserWithEmailAndPassword(auth, email, pass).then((user) => {
            return updateProfile(user, {
                displayName: username
            }).catch((error) => console.log(error))
        })
    }

    const signIn = async(email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async() => {
        return signOut(auth)
    }

    const forgotPassword = () => {
        return sendPasswordResetEmail(auth, email)
    }

    const values = {
        currentUser,
        registerUser,
        forgotPassword,
        signIn,
        logout
    }


    return (
        <AuthContext.Provider value={ values }>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext;