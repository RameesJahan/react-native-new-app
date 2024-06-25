import { View, Text } from 'react-native'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import Appwrite from '../Appwrite'

type UserContextProps = PropsWithChildren
export type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
})

export const UserContextProvider = ({ children } : UserContextProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      Appwrite.account.get().then(res => {
        setUser({
          name: res.name,
          email: res.email
        })
      }).catch(err => {
        setUser(null)
      })
    }

    getUser()
  }, [])
  

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

