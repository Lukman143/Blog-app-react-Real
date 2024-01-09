import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import userContext from './userContext'
import { getCurrentUserDetails,isLoggedIn } from '../auth/authtoken'

function UserProvider({ children }) {

    const [user, setUser] = useState({
        data: {},
        login: false
    })

    useEffect(() => {
        setUser({
            data: getCurrentUserDetails(),
            login: isLoggedIn()
        })
    }, [])



    return (

        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>

    )
}

export default UserProvider