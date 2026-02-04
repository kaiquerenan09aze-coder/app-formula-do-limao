import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Calendar,
  BookOpen,
  Gift,
  Users,
  MessageCircle,
  ChevronRight,
  Flame,
  Droplets,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import LemonIcon from "@/components/ui/LemonIcon";
import BottomNav from "@/components/layout/BottomNav";

const modules = [
  {
    id: "intro",
    title: "Introdução ao Método",
    icon: BookOpen,
    color: "bg-primary",
    lessons: 4,
    duration: "15 min",
    path: "/modulo/introducao",
  },
  {
    id: "receita",
    title: "Receita Oficial",
    icon: Droplets,
    color: "bg-accent",
    lessons: 1,
    duration: "10 min",
    path: "/modulo/receita",
  },
  {
    id: "protocolo",
    title: "Protocolo 21 Dias",
    icon: Calendar,
    color: "bg-lime",
    lessons: 21,
    duration: "21 dias",
    path: "/protocolo",
  },
  {
    id: "bonus",
    title: "Bônus Exclusivos",
    icon: Gift,
    color: "bg-yellow",
    lessons: 8,
    duration: "30 min",
    path: "/modulo/bonus",
  },
  {
    id: "resultados",
    title: "Resultados",
    icon: Users,
    color: "bg-primary",
    lessons: 12,
    duration: "Ver",
    path: "/resultados",
  },
  {
    id: "suporte",
    title: "Suporte",
    icon: MessageCircle,
    color: "bg-muted",
    lessons: 0,
    duration: "Ajuda",
    path: "/suporte",
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const progress = user ? Math.round((user.completedDays.length / 21) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-lime px-4 pt-12 pb-8 rounded-b-[2rem]"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <LemonIcon className="w-10 h-10" />
            <div>
              <p className="text-primary-foreground/80 text-sm">Olá,</p>
              <h1 className="text-primary-foreground font-bold text-xl">
                {user?.name || "Visitante"} 🍋
              </h1>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <span className="text-xl">👤</span>
          </motion.div>
        </div>

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-foreground/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <h2 className="text-primary-foreground font-display text-lg mb-1">
            Bem-vindo ao Protocolo
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-4">
            Fórmula do Limão • Secagem Natural
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-primary-foreground/80">Seu progresso</span>
                <span className="text-primary-foreground font-bold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-primary-foreground/20" />
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-primary-foreground">
                {user?.currentDay || 1}
              </span>
              <p className="text-xs text-primary-foreground/80">Dia</p>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <main className="px-4 py-6">
        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate("/protocolo")}
            className="w-full h-14 gradient-hero text-forest font-bold text-base rounded-xl shadow-glow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <Play className="w-5 h-5 mr-2" />
            Continuar de onde parou
            <ChevronRight className="w-5 h-5 ml-auto" />
          </Button>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="bg-card rounded-xl p-4 text-center shadow-soft border border-border/50">
            <Flame className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">
              {user?.completedDays.length || 0}
            </p>
            <p className="text-xs text-muted-foreground">Dias completos</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft border border-border/50">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">21</p>
            <p className="text-xs text-muted-foreground">Meta dias</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft border border-border/50">
            <Droplets className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">
              {21 - (user?.completedDays.length || 0)}
            </p>
            <p className="text-xs text-muted-foreground">Dias restantes</p>
          </div>
        </motion.div>

        {/* Modules Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <h3 className="font-display text-xl font-semibold text-foreground">
            Conteúdo do Protocolo
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {modules.map((module) => (
              <motion.button
                key={module.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(module.path)}
                className="bg-card rounded-xl p-4 text-left shadow-soft border border-border/50 hover:shadow-card transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 ${module.color} rounded-lg flex items-center justify-center mb-3`}
                >
                  <module.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                  {module.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {module.lessons > 0 && `${module.lessons} aulas • `}
                  {module.duration}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
