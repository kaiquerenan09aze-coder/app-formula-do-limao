import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  currentDay: number;
  startDate: string;
  completedDays: number[];
  favorites: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (day: number) => void;
  toggleFavorite: (contentId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "1",
  name: "Maria",
  email: "maria@email.com",
  currentDay: 5,
  startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  completedDays: [1, 2, 3, 4],
  favorites: [],
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated login
    if (email && password) {
      setUser({ ...mockUser, email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProgress = (day: number) => {
    if (user && !user.completedDays.includes(day)) {
      setUser({
        ...user,
        completedDays: [...user.completedDays, day],
        currentDay: Math.max(user.currentDay, day + 1),
      });
    }
  };

  const toggleFavorite = (contentId: string) => {
    if (user) {
      const favorites = user.favorites.includes(contentId)
        ? user.favorites.filter((id) => id !== contentId)
        : [...user.favorites, contentId];
      setUser({ ...user, favorites });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProgress,
        toggleFavorite,
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
