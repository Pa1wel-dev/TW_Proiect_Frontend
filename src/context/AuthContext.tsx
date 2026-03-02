import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export type UserRole = "student" | "teacher";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
    subject?: string; // doar pentru profesori
    createdAt: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    subject?: string; // doar dacă role === "teacher"
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ─── Mock "DB" stored in localStorage ────────────────────────────────────────
const STORAGE_KEY = "learnhub_users";
const SESSION_KEY = "learnhub_session";

const getUsers = (): (User & { password: string })[] => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
};

const saveUsers = (users: (User & { password: string })[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const session = localStorage.getItem(SESSION_KEY);
        if (session) {
            try {
                setUser(JSON.parse(session));
            } catch {
                localStorage.removeItem(SESSION_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 600));

        const users = getUsers();
        const found = users.find(
            u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) {
            return { success: false, error: "Email sau parolă incorectă." };
        }

        const { password: _, ...userData } = found;
        setUser(userData);
        localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
        return { success: true };
    };

    const register = async (data: RegisterData) => {
        await new Promise(r => setTimeout(r, 700));

        const users = getUsers();
        const exists = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());

        if (exists) {
            return { success: false, error: "Există deja un cont cu acest email." };
        }

        const newUser: User & { password: string } = {
            id: `user_${Date.now()}`,
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            subject: data.subject,
            createdAt: new Date().toISOString(),
        };

        saveUsers([...users, newUser]);

        const { password: _, ...userData } = newUser;
        setUser(userData);
        localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            login,
            register,
            logout,
            isAuthenticated: !!user,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
