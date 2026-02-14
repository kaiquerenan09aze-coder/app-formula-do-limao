import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthContextType {
  user: SupabaseUser | null;
  profile: { name: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  completedFormulas: string[];
  completedDays: number[];
  toggleFormulaComplete: (formulaId: string) => void;
  isFormulaCompleted: (formulaId: string) => boolean;
  getModuleProgress: (formulaIds: string[]) => { completed: number; total: number; percent: number };
  getOverallProgress: () => number;
  toggleDayComplete: (day: number) => void;
  isDayCompleted: (day: number) => boolean;
}

const ALL_FORMULA_IDS = [
  "intro-1", "intro-2", "intro-3", "intro-4",
  "receita-1", "receita-2", "receita-3",
  "bonus-1", "bonus-2", "bonus-3", "bonus-4",
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<{ name: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [completedFormulas, setCompletedFormulas] = useState<string[]>([]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  // Load progress from DB
  const loadProgress = useCallback(async (userId: string) => {
    const [formulasRes, daysRes, profileRes] = await Promise.all([
      supabase.from("user_progress").select("formula_id").eq("user_id", userId),
      supabase.from("user_day_progress").select("day_number").eq("user_id", userId),
      supabase.from("profiles").select("name").eq("user_id", userId).maybeSingle(),
    ]);
    if (formulasRes.data) setCompletedFormulas(formulasRes.data.map(r => r.formula_id));
    if (daysRes.data) setCompletedDays(daysRes.data.map(r => r.day_number));
    if (profileRes.data) setProfile({ name: profileRes.data.name || "" });
  }, []);

  useEffect(() => {
    // Set up auth listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        // Use setTimeout to avoid deadlock with Supabase auth
        setTimeout(() => loadProgress(session.user.id), 0);
      } else {
        setCompletedFormulas([]);
        setCompletedDays([]);
        setProfile(null);
      }
      setIsLoading(false);
    });

    // Then check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProgress(session.user.id);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [loadProgress]);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const signup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { name },
      },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const toggleFormulaComplete = useCallback(async (formulaId: string) => {
    if (!user) return;
    const isCompleted = completedFormulas.includes(formulaId);
    if (isCompleted) {
      setCompletedFormulas(prev => prev.filter(id => id !== formulaId));
      await supabase.from("user_progress").delete().eq("user_id", user.id).eq("formula_id", formulaId);
    } else {
      setCompletedFormulas(prev => [...prev, formulaId]);
      await supabase.from("user_progress").insert({ user_id: user.id, formula_id: formulaId });
    }
  }, [user, completedFormulas]);

  const isFormulaCompleted = useCallback((formulaId: string) => {
    return completedFormulas.includes(formulaId);
  }, [completedFormulas]);

  const getModuleProgress = useCallback((formulaIds: string[]) => {
    const completed = formulaIds.filter(id => completedFormulas.includes(id)).length;
    const total = formulaIds.length;
    return { completed, total, percent: total > 0 ? Math.round((completed / total) * 100) : 0 };
  }, [completedFormulas]);

  const getOverallProgress = useCallback(() => {
    const completed = ALL_FORMULA_IDS.filter(id => completedFormulas.includes(id)).length;
    return Math.round((completed / ALL_FORMULA_IDS.length) * 100);
  }, [completedFormulas]);

  const toggleDayComplete = useCallback(async (day: number) => {
    if (!user) return;
    const isCompleted = completedDays.includes(day);
    if (isCompleted) {
      setCompletedDays(prev => prev.filter(d => d !== day));
      await supabase.from("user_day_progress").delete().eq("user_id", user.id).eq("day_number", day);
    } else {
      setCompletedDays(prev => [...prev, day]);
      await supabase.from("user_day_progress").insert({ user_id: user.id, day_number: day });
    }
  }, [user, completedDays]);

  const isDayCompleted = useCallback((day: number) => {
    return completedDays.includes(day);
  }, [completedDays]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        completedFormulas,
        completedDays,
        toggleFormulaComplete,
        isFormulaCompleted,
        getModuleProgress,
        getOverallProgress,
        toggleDayComplete,
        isDayCompleted,
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
