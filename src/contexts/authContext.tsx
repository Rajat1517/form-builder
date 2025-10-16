import { User } from "firebase/auth";
import { createContext, type ReactNode, type Dispatch, type SetStateAction, useState } from "react";

type AuthContextType = {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const defaultValue: AuthContextType = {
    user: null,
    setUser: () => {
        throw new Error('Cannot use setUser outside of AuthContextProvider');
    }
};

export const AuthContext = createContext<AuthContextType>(defaultValue);


export function AuthContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}