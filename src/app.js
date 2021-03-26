
import './App.css';
import React, {useEffect, useState} from 'react';
import {auth, users} from "./firebase.utils";
import AppRoutes from "./components/app-routes/app-routes";


function App() {


    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                let doc = await users.doc(user.uid).get();
                localStorage.setItem("user", user.uid);
                console.log(localStorage.getItem("user"))
                if (doc.exists) {
                } else {
                    let firstName;
                    let lastName;
                    if (user.displayName) {
                        firstName = user.displayName.split(" ")[0] ?? '';
                        lastName = user.displayName.split(" ").length > 1 ? user.displayName.split(" ")[1] : '';
                    }
                    let newUserData = {
                        uid: user.uid, email: user.email, firstName: firstName, lastName: lastName
                    };
                    console.log(newUserData)
                    await users.doc(user.uid).set({...newUserData});

                }
            } else {
                localStorage.removeItem("user");
            }
        })
    }, []);

    return (
        <>
           {/* <NavBar/>*/}
            <AppRoutes/>
            {/*<Footer/>*/}
        </>
    );
}

export default App;
