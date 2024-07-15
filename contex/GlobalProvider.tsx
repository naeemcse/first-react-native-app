
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/appwrite";

interface User {
    // Define the properties of the user object
    $id?: string;
    email: string;
    username: string;
    avatar?: string;
}

interface GlobalContextProps {
    isLogged: boolean;
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
    user: User | null;
    setUser: (React.Dispatch<React.SetStateAction<User | null>>);
    loading?: boolean;
}
// Create a context object,here must be a default value
const GlobalContext = createContext<GlobalContextProps>({
    isLogged: false, setIsLogged: () => {},
    user: null, setUser: () => {},
    loading: true
});
export const useGlobalContext = () => useContext(GlobalContext);


   /* : GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};*/

interface GlobalProviderProps {
    children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res:any) => {
                if (res) {
                    setIsLogged(true);
                    setUser({
                        $id: res.$id,
                        email: res.email,
                        username: res.username,
                        avatar: res.avatar
                    });
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