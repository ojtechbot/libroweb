

"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { type UserProfile, getCurrentUser, setCurrentUser } from "@/lib/users";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (user: UserProfile) => void;
  logout: () => void;
  reload: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    loading: true,
    login: () => {},
    logout: () => {},
    reload: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const reload = useCallback(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, [pathname]);

  const login = (loggedInUser: UserProfile) => {
    setCurrentUser(loggedInUser);
    setUser(loggedInUser);
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
    // Redirect to home page after logout
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, reload }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
