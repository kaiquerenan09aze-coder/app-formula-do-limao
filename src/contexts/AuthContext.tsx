import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  currentDay: number;
  startDate: string;
  completedDays: number[];
  favorites: string[];
  completedFormulas: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (day: number) => void;
  toggleFavorite: (contentId: string) => void;
  toggleFormulaComplete: (formulaId: string) => void;
  isFormulaCompleted: (formulaId: string) => boolean;
  getModuleProgress: (formulaIds: string[]) => { completed: number; total: number; percent: number };
  getOverallProgress: () => number;
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
  completedFormulas: [],
};

const ALL_FORMULA_IDS = [
  "intro-1", "intro-2", "intro-3", "intro-4",
  "receita-1", "receita-2", "receita-3",
  "bonus-1", "bonus-2", "bonus-3", "bonus-4",
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
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

  const toggleFormulaComplete = useCallback((formulaId: string) => {
    if (user) {
      const completedFormulas = user.completedFormulas.includes(formulaId)
        ? user.completedFormulas.filter((id) => id !== formulaId)
        : [...user.completedFormulas, formulaId];
      setUser({ ...user, completedFormulas });
    }
  }, [user]);

  const isFormulaCompleted = useCallback((formulaId: string) => {
    return user?.completedFormulas.includes(formulaId) ?? false;
  }, [user]);

  const getModuleProgress = useCallback((formulaIds: string[]) => {
    const completed = formulaIds.filter((id) => user?.completedFormulas.includes(id)).length;
    const total = formulaIds.length;
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }, [user]);

  const getOverallProgress = useCallback(() => {
    if (!user) return 0;
    const completed = ALL_FORMULA_IDS.filter((id) => user.completedFormulas.includes(id)).length;
    return Math.round((completed / ALL_FORMULA_IDS.length) * 100);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProgress,
        toggleFavorite,
        toggleFormulaComplete,
        isFormulaCompleted,
        getModuleProgress,
        getOverallProgress,
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
