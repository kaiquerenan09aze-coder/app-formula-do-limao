import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Heart,
  BookOpen,
  ChefHat,
  Gift,
  Headphones,
  FileText,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";

interface LessonContent {
  ingredients: string[];
  steps: string[];
  timing: string;
  duration: string;
}

interface Lesson {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
  content?: LessonContent;
}

interface ModuleData {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  lessons: Lesson[];
}

const modulesData: Record<string, ModuleData> = {
  introducao: {
    title: "Introdução ao Método",
    description: "Entenda como a Fórmula do Limão vai transformar seu corpo",
    icon: BookOpen,
    color: "bg-primary",
    lessons: [
      {
        id: "intro-1",
        title: "O que é a Fórmula do Limão",
        type: "video",
        duration: "5 min",
        completed: false,
      },
      {
        id: "intro-2",
        title: "Como ele age no corpo",
        type: "video",
        duration: "4 min",
        completed: false,
      },
      {
        id: "intro-3",
        title: "Benefícios principais",
        type: "audio",
        duration: "3 min",
        completed: false,
      },
      {
        id: "intro-4",
        title: "Para quem é indicado",
        type: "text",
        duration: "2 min",
        completed: false,
      },
    ],
  },
  receita: {
    title: "Receita Oficial",
    description: "O passo a passo completo da Fórmula do Limão",
    icon: ChefHat,
    color: "bg-accent",
    lessons: [
      {
        id: "receita-1",
        title: "Ingredientes e Quantidades",
        type: "video",
        duration: "3 min",
        completed: false,
        content: {
          ingredients: [
            "1 limão siciliano orgânico",
            "200ml de água morna",
            "1 colher de chá de gengibre ralado (opcional)",
            "1 pitada de canela (opcional)",
          ],
          steps: [
            "Esprema o limão fresco (não use suco de caixinha)",
            "Adicione à água morna (não quente!)",
            "Misture o gengibre se desejar",
            "Finalize com a canela",
            "Beba imediatamente em jejum",
          ],
          timing: "30 minutos antes do café da manhã",
          duration: "21 dias consecutivos",
        },
      },
    ],
  },
  bonus: {
    title: "Bônus Exclusivos",
    description: "Conteúdos extras para potencializar seus resultados",
    icon: Gift,
    color: "bg-yellow",
    lessons: [
      {
        id: "bonus-1",
        title: "Receitas Detox com Limão",
        type: "text",
        duration: "10 min",
        completed: false,
      },
      {
        id: "bonus-2",
        title: "Chás Complementares",
        type: "text",
        duration: "5 min",
        completed: false,
      },
      {
        id: "bonus-3",
        title: "Cardápio Semanal",
        type: "text",
        duration: "8 min",
        completed: false,
      },
      {
        id: "bonus-4",
        title: "Lista de Compras",
        type: "text",
        duration: "3 min",
        completed: false,
      },
    ],
  },
};

const Module = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();

  const module = moduleId ? modulesData[moduleId] : null;

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Módulo não encontrado</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return Play;
      case "audio":
        return Headphones;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "video":
        return "Vídeo";
      case "audio":
        return "Áudio";
      default:
        return "Texto";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${module.color} px-4 pt-12 pb-8 rounded-b-[2rem]`}
      >
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-primary-foreground" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-primary-foreground">
              {module.title}
            </h1>
            <p className="text-primary-foreground/80 text-sm mt-1">
              {module.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{module.lessons.length} aulas</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {module.lessons.reduce(
                (acc, l) => acc + parseInt(l.duration),
                0
              )}{" "}
              min
            </span>
          </div>
        </div>
      </motion.header>

      <main className="px-4 py-6">
        {/* Lessons List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {module.lessons.map((lesson, idx) => {
            const TypeIcon = getIcon(lesson.type);
            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Button
                  variant="ghost"
                  className="w-full h-auto p-4 bg-card rounded-xl shadow-soft border border-border/50 justify-start hover:bg-card hover:shadow-card transition-all duration-300"
                >
                  <div className="flex items-center gap-4 w-full">
                    <div
                      className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center shrink-0`}
                    >
                      <TypeIcon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-foreground">
                        {lesson.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                          {getTypeLabel(lesson.type)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-full transition-colors">
                        <Heart className="w-5 h-5 text-muted-foreground" />
                      </button>
                      {lesson.completed && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </div>
                </Button>

                {/* Recipe Content Preview */}
                {moduleId === "receita" && lesson.content && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 bg-yellow-light/30 rounded-xl p-5 space-y-4"
                  >
                    <div>
                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        🍋 Ingredientes
                      </h5>
                      <ul className="space-y-1">
                        {lesson.content.ingredients.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        📝 Modo de Preparo
                      </h5>
                      <ol className="space-y-2">
                        {lesson.content.steps.map((step, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-xs font-bold">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-card rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">
                          Melhor horário
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {lesson.content.timing}
                        </p>
                      </div>
                      <div className="bg-card rounded-lg p-3">
                        <p className="text-xs text-muted-foreground">Duração</p>
                        <p className="text-sm font-semibold text-foreground">
                          {lesson.content.duration}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full gradient-lime text-primary-foreground font-semibold">
                      💾 Salvar Receita
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Module;
