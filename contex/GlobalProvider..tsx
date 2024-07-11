import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite";

interface User {
    // Define the properties of the user object
}

interface GlobalContextProps {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};

interface GlobalProviderProps {
    children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res: User | null) => {
                if (res) {
                    setIsLogged(true);
                    setUser(res);
                } else {
                    setIsLogged(false);
                    setUser(null);
                }
            })
            .catch((error: Error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;