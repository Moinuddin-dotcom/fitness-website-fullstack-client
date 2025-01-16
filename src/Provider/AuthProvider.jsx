import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";



export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    // const axiosPublic = useAxiosPublic()

    // create new user
    const createUser = (email, passord) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, passord)
    }

    // user Sign in
    const signIn = (email, passord) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, passord)
    }

    // user Sign in with Google
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // user logout
    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("Current user=> ", currentUser)
            setLoading(false)
            setUser(currentUser)
        })
        return () => {
            unSubscribe()
        }

    }, [])




    const authInfo = {
        user, loading, createUser, signIn, logout, updateUserProfile, googleLogin
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
