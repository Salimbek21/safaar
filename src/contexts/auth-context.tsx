"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("safarim-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: "1",
        name: "Salimbek",

        email: email,
        avatar: "/placeholder.svg?height=100&width=100",
      };
      setUser(mockUser);
      localStorage.setItem("safarim-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Mock Google login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: "1",
        name: "Salimbek",
        email: "salimbek@example.com",
        avatar: "/placeholder.svg?height=100&width=100",
      };
      setUser(mockUser);
      localStorage.setItem("safarim-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Google login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithPhone = async (phone: string) => {
    setIsLoading(true);
    try {
      // Mock phone login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: "1",
        name: "Salimbek",
        email: `${phone}@example.com`,
        avatar: "/placeholder.svg?height=100&width=100",
      };
      setUser(mockUser);
      localStorage.setItem("safarim-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Phone login failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock signup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = {
        id: "1",
        name: name,
        email: email,
        avatar: "/placeholder.svg?height=100&width=100",
      };
      setUser(mockUser);
      localStorage.setItem("safarim-user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("safarim-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        loginWithPhone,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
