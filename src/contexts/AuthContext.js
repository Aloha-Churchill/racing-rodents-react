import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {db} from '../firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    
    function createaccount(email, password, device_id){
        return auth.createUserWithEmailAndPassword(email, password).then(cred => {
            auth.onAuthStateChanged(user => {
                if(user) {
                    console.log(user.uid)
                    db.ref('Users').child(user.uid) //00000-Akjalsdjkla
                    db.ref('Users/' + device_id + user.uid).set({
                        distance: "",
                        account_created: "yes"
                    })
                }
            })
        })

    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function resetPassword(email){
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email){
        return currentUser.updateEmail(email)
    }

    function updatePassword(password){
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
            
        })
        return unsubscribe
    }, [])


    const value = {
        currentUser,
        login,
        createaccount,
        logout,
        resetPassword,
        updateEmail,
        updatePassword
    }
    return (
        <AuthContext.Provider value ={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
