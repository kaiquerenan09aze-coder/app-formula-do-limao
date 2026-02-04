import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Calendar, BookOpen, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LemonIcon from "@/components/ui/LemonIcon";

const navItems = [
  { icon: Home, label: "Início", path: "/dashboard" },
  { icon: Calendar, label: "Protocolo", path: "/protocolo" },
  { icon: BookOpen, label: "Módulos", path: "/modulo/introducao" },
  { icon: User, label: "Perfil", path: "/perfil" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border px-2 py-2 z-50 safe-area-bottom"
    >
      <div className="max-w-lg mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path === "/modulo/introducao" && location.pathname.startsWith("/modulo"));
          
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.path === "/dashboard" && isActive ? (
                <LemonIcon className="w-6 h-6" />
              ) : (
                <item.icon className="w-6 h-6" />
              )}
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-0 w-12 h-1 bg-primary rounded-full"
                />
              )}
            </motion.button>
          );
        })}
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-xs font-medium">Sair</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
