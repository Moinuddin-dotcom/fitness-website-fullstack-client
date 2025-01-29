import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";



export const AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()

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
            setUser(currentUser)
            setLoading(true)
            if (currentUser) {
                const existingToken = localStorage.getItem('access-token');
                setLoading(false)
                if (!existingToken) {
                    // get token and store client
                    const userInfo = { email: currentUser.email }
                    axiosPublic.post('/jwt', userInfo)
                        .then(res => {
                            if (res.data.token) {
                                localStorage.setItem('access-token', res.data.token)
                                // setUser(currentUser)
                                // setLoading(false)
                            }
                        })
                }
            } else {
                // TODO: remove token
                // if somehow token is null then remove token
                localStorage.removeItem('access-token')
                setLoading(false)
                // setUser(currentUser)
            }
            // setLoading(false)
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
