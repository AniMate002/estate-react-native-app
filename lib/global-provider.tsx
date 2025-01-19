import React, { createContext, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";

interface User{
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedin: boolean;
    user: User;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

const GlobaProvider = ({ children }: { children: React.ReactNode}) => {
    const { data: user, loading, refetch} = useAppwrite({
        fn: getCurrentUser
    })

    const isLoggedin = !!user;

    return (
        <GlobalContext.Provider value={{
            isLoggedin,
            loading,
            refetch,
            user
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext)
    if(!context) throw new Error("useGlobalContext must be used within GlobaProvider")
    return context;
}

export default GlobaProvider