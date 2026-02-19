import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  BookOpen,
  Gift,
  Users,
  MessageCircle,
  ChevronRight,
  Flame,
  Droplets,
  Target,
  ChefHat,
  Leaf,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import LemonIcon from "@/components/ui/LemonIcon";
import BottomNav from "@/components/layout/BottomNav";
import { useMemo } from "react";

const motivationalQuotes = [
  "Cada gota de limão é um passo rumo à sua melhor versão. 🍋",
  "Seu corpo é seu templo — cuide dele com amor e consistência. 💚",
  "Pequenas ações diárias geram grandes transformações. ✨",
  "Você já deu o primeiro passo. Agora, siga em frente! 🚀",
  "A natureza tem tudo que você precisa para se sentir incrível. 🌿",
  "Disciplina é o caminho entre seus sonhos e sua realidade. 💪",
  "Hoje é um novo dia para cuidar de você. Aproveite! 🌅",
  "Quem planta saúde, colhe vitalidade. 🌱",
  "Confie no processo — os resultados virão. 🎯",
  "Seu corpo agradece cada escolha saudável que você faz. 💛",
  "A mudança começa de dentro pra fora. Comece agora. 🔥",
  "Não desista — você está mais perto do que imagina. ⭐",
  "A constância é a chave de toda transformação real. 🗝️",
  "Hidrate-se, nutra-se, ame-se. Você merece. 💧",
  "Cada dia do protocolo é uma vitória. Celebre! 🎉",
  "Sua saúde é o investimento mais valioso que existe. 💎",
  "O segredo não é a perfeição, é a persistência. 🌻",
  "Você é mais forte do que pensa. Continue! 💚",
  "A jornada de mil passos começa com o primeiro copo de limão. 🍋",
  "Hoje você escolheu se cuidar. Isso já é incrível. 🌟",
  "Transformação é um processo — e você está nele. 🦋",
];

const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};

const modules = [
  {
    id: "intro",
    title: "Introdução ao Método",
    subtitle: "Entenda o protocolo",
    icon: BookOpen,
    color: "bg-primary",
    formulas: 4,
    path: "/modulo/introducao",
    formulaIds: ["intro-1", "intro-2", "intro-3", "intro-4"],
  },
  {
    id: "receita",
    title: "Receitas Oficiais",
    subtitle: "Fórmulas do protocolo",
    icon: ChefHat,
    color: "bg-accent",
    formulas: 3,
    path: "/modulo/receita",
    formulaIds: ["receita-1", "receita-2", "receita-3"],
  },
  {
    id: "protocolo",
    title: "Protocolo 21 Dias",
    subtitle: "Calendário interativo",
    icon: Calendar,
    color: "bg-lime",
    formulas: 21,
    path: "/protocolo",
    formulaIds: [],
  },
  {
    id: "bonus",
    title: "Bônus Exclusivos",
    subtitle: "Fórmulas extras",
    icon: Gift,
    color: "bg-yellow",
    formulas: 4,
    path: "/modulo/bonus",
    formulaIds: ["bonus-1", "bonus-2", "bonus-3", "bonus-4"],
  },
  {
    id: "resultados",
    title: "Resultados",
    subtitle: "Depoimentos reais",
    icon: Users,
    color: "bg-primary",
    formulas: 0,
    path: "/resultados",
    formulaIds: [],
  },
  {
    id: "suporte",
    title: "Suporte",
    subtitle: "Tire suas dúvidas",
    icon: MessageCircle,
    color: "bg-muted",
    formulas: 0,
    path: "/suporte",
    formulaIds: [],
  },
];

const Dashboard = () => {
  const { completedFormulas, getOverallProgress, getModuleProgress } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const overallProgress = getOverallProgress();
  const dailyQuote = useMemo(() => getDailyQuote(), []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background pb-24">
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
                {"Visitante"} 🍋
              </h1>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-primary-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-primary-foreground" />
            )}
          </button>
        </div>

        {/* Motivational Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="bg-primary-foreground/10 rounded-xl p-3 mb-4"
        >
          <p className="text-primary-foreground/90 text-sm italic text-center leading-relaxed">
            {dailyQuote}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-primary-foreground/20 backdrop-blur-sm rounded-2xl p-4"
        >
          <h2 className="text-primary-foreground font-display text-lg mb-1">
            Protocolo Fórmula do Limão
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-4">
            Secagem Natural • Manual Metabólico
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-primary-foreground/80">Progresso geral</span>
                <span className="text-primary-foreground font-bold">{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2 bg-primary-foreground/20" />
            </div>
          </div>
        </motion.div>
      </motion.header>

      <main className="px-4 py-6">
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
            <Leaf className="w-5 h-5 mr-2" />
            Continuar Protocolo
            <ChevronRight className="w-5 h-5 ml-auto" />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div className="bg-card rounded-xl p-4 text-center shadow-soft border border-border/50">
            <Flame className="w-6 h-6 text-destructive mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{completedFormulas.length}</p>
            <p className="text-xs text-muted-foreground">Fórmulas feitas</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft border border-border/50">
            <Target className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">11</p>
            <p className="text-xs text-muted-foreground">Total fórmulas</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center shadow-soft border border-border/50">
            <Droplets className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{11 - completedFormulas.length}</p>
            <p className="text-xs text-muted-foreground">Restantes</p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <h3 className="font-display text-xl font-semibold text-foreground">
            Biblioteca de Fórmulas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {modules.map((module) => {
              const modProgress = module.formulaIds.length > 0
                ? getModuleProgress(module.formulaIds)
                : null;
              return (
                <motion.button
                  key={module.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(module.path)}
                  className="bg-card rounded-xl p-4 text-left shadow-soft border border-border/50 hover:shadow-card transition-all duration-300"
                >
                  <div className={`w-10 h-10 ${module.color} rounded-lg flex items-center justify-center mb-3`}>
                    <module.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-0.5 line-clamp-2">{module.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{module.subtitle}</p>
                  {modProgress && (
                    <div>
                      <Progress value={modProgress.percent} className="h-1.5 bg-muted" />
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {modProgress.completed}/{modProgress.total} fórmulas
                      </p>
                    </div>
                  )}
                  {!modProgress && module.formulas > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {module.formulas} {module.id === "protocolo" ? "dias" : "itens"}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
