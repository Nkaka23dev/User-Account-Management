
import {
    onAuthStateChanged,
} from "firebase/auth";

import {
    useState,
    useEffect,
    useContext,
    createContext,
    useMemo,
} from "react";
import { auth } from "../config/firebase";

interface User {
    username: string;
    email: string;
    photoURL: string;
    id: string;
}

interface ContextProps {
    loading?: boolean;
    user?: object;
    logout?: () => void;
    reloadAuth?: () => void;
    setLoading?: () => void;
}

export const authContext = createContext<ContextProps>({});

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();

    return (
        <authContext.Provider
            value={{
                user: auth.user,
                loading: auth.loading,
                logout: auth.logout,
                reloadAuth: auth.reloadAuth,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const setCurrentUser = (auth) => {
        if (auth) {
            const user = {
                username: auth.displayName,
                email: auth.email,
                phone: auth.phoneNumber,
                photoURL: auth.photoURL,
                id: auth.uid,
            };
            console.log(user)
            setUser(user);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(undefined);
    };

    const reloadAuth = async () => {
        await auth.currentUser.getIdToken(true);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return () => unsubscribe();
    }, []);

    return useMemo(() => ({
        user,
        loading,
        setLoading,
        logout,
        reloadAuth,
    }), [user, loading]);
}