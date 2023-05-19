import {
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";
import { AuthServices, authService } from "../services/auth.service";
import qs from 'qs'
import { toast } from "react-hot-toast";



interface ContextProps {
    loading?: boolean;
    user?: object;
    logout?: () => void;
    reloadAuth?: () => void;
    setLoading?: () => void;
    setCurrentUser?: any;
    setUser?: any;
}

export const authContext = createContext<ContextProps>({});

export const AuthProvider = ({ children }: any) => {
    const auth = useProvideAuth();

    return (
        <authContext.Provider
            value={{
                user: auth.user,
                loading: auth.loading,
                logout: auth.logout,
                reloadAuth: auth.reloadAuth,
                setUser: auth.setUser,
                setCurrentUser: auth.setCurrentUser,
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
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        setLoading(false);
        setUser(undefined);
        localStorage.clear();
    };

    const reloadAuth = async () => {
        await new AuthServices()
            .getCurrentUser({ fresh: true })
            .then(({ data }) => {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                setCurrentUser(data);
            })
            .catch(() => {
                setLoading(false);
                setUser(undefined);
            });
    };

    const setCurrentUser = async (data) => {
        setUser({
            ...data,
            email: data.email,
            id: data.id,
            photo: data.photo,
            username: data.username,
        });
    };

    const getCurrentUser = async () => {
        await new AuthServices()
            .getCurrentUser({})
            .then(({ data }) => {
                setTimeout(() => {
                    setCurrentUser(data);
                    setLoading(false)
                }, 1500);
            })
            .catch(() => {
                setLoading(false);
                setUser(undefined);
            });
    };

    const parsedUrl = qs.parse(window.location.search.replaceAll("?", ''))

    const handleToken = () => {
        return authService.verifyLoginLink({ token: parsedUrl.token }).then(({ data }) => {
            setCurrentUser(data)
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            setLoading(false)
        }).catch((e) => {
            console.log(e.response.data.message)
            toast(e.response.data.message)
            setLoading(false)
        })
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getCurrentUser();
        } else {
            if (parsedUrl.token) {
                handleToken()
            } else {
                setLoading(false);
            }
        }
    }, []);

    return {
        user: user,
        loading,
        setLoading,
        setCurrentUser,
        logout,
        setUser,
        reloadAuth,
    };
}