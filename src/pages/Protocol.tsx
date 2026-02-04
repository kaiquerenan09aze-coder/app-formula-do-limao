import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Clock, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/layout/BottomNav";

const protocolDays = Array.from({ length: 21 }, (_, i) => ({
  day: i + 1,
  title: i < 7 ? "Fase de Adaptação" : i < 14 ? "Fase de Intensificação" : "Fase de Consolidação",
  instruction: getInstruction(i + 1),
  tip: getTip(i + 1),
}));

function getInstruction(day: number): string {
  if (day <= 3) return "Tome a Fórmula do Limão em jejum, 30 minutos antes do café da manhã. Inicie com meio limão.";
  if (day <= 7) return "Continue em jejum com a fórmula. Aumente para 1 limão inteiro.";
  if (day <= 14) return "Mantenha o protocolo em jejum. Você pode adicionar gengibre para potencializar.";
  return "Fase final! Continue firme com a fórmula completa. Os resultados estão chegando.";
}

function getTip(day: number): string {
  const tips = [
    "Beba bastante água ao longo do dia",
    "Evite açúcar e alimentos processados",
    "Pratique pelo menos 20 min de caminhada",
    "Durma bem para potencializar os resultados",
    "Adicione mais vegetais verdes às refeições",
    "Evite bebidas alcoólicas nesta fase",
    "Tire fotos para comparar sua evolução",
  ];
  return tips[(day - 1) % tips.length];
}

const Protocol = () => {
  const navigate = useNavigate();
  const { user, updateProgress } = useAuth();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const completedDays = user?.completedDays || [];
  const currentDay = user?.currentDay || 1;

  const handleComplete = (day: number) => {
    updateProgress(day);
    setSelectedDay(null);
  };

  const getDayStatus = (day: number) => {
    if (completedDays.includes(day)) return "completed";
    if (day === currentDay) return "current";
    if (day < currentDay) return "available";
    return "locked";
  };

  const phases = [
    { name: "Adaptação", days: [1, 7], color: "bg-yellow" },
    { name: "Intensificação", days: [8, 14], color: "bg-primary" },
    { name: "Consolidação", days: [15, 21], color: "bg-lime-dark" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border-b border-border px-4 py-4 sticky top-0 z-10"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground">
              Protocolo 21 Dias
            </h1>
            <p className="text-sm text-muted-foreground">
              Dia {currentDay} de 21
            </p>
          </div>
        </div>
      </motion.header>

      <main className="px-4 py-6">
        {/* Phase Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mb-6"
        >
          {phases.map((phase, idx) => (
            <div
              key={phase.name}
              className={`flex-1 rounded-lg p-3 ${
                currentDay >= phase.days[0] && currentDay <= phase.days[1]
                  ? phase.color + " text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <p className="text-xs font-medium">Fase {idx + 1}</p>
              <p className="text-sm font-bold">{phase.name}</p>
            </div>
          ))}
        </motion.div>

        {/* Calendar Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-7 gap-2 mb-6"
        >
          {protocolDays.map((dayData) => {
            const status = getDayStatus(dayData.day);
            return (
              <motion.button
                key={dayData.day}
                whileHover={status !== "locked" ? { scale: 1.1 } : {}}
                whileTap={status !== "locked" ? { scale: 0.95 } : {}}
                onClick={() =>
                  status !== "locked" && setSelectedDay(dayData.day)
                }
                disabled={status === "locked"}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                  status === "completed"
                    ? "gradient-lime text-primary-foreground shadow-glow"
                    : status === "current"
                    ? "bg-accent text-accent-foreground ring-2 ring-primary animate-pulse"
                    : status === "available"
                    ? "bg-card border border-border text-foreground hover:border-primary"
                    : "bg-muted/50 text-muted-foreground cursor-not-allowed"
                }`}
              >
                {status === "completed" ? (
                  <Check className="w-5 h-5" />
                ) : status === "locked" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <span className="font-bold text-lg">{dayData.day}</span>
                )}
                {status === "current" && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 gradient-lime rounded" />
            <span className="text-muted-foreground">Concluído</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-accent rounded ring-2 ring-primary" />
            <span className="text-muted-foreground">Hoje</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted/50 rounded" />
            <span className="text-muted-foreground">Bloqueado</span>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Seu Progresso</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">
                {completedDays.length}
              </p>
              <p className="text-xs text-muted-foreground">Dias completos</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">
                {Math.round((completedDays.length / 21) * 100)}%
              </p>
              <p className="text-xs text-muted-foreground">Progresso</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-forest">
                {21 - completedDays.length}
              </p>
              <p className="text-xs text-muted-foreground">Dias restantes</p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Day Detail Modal */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-end justify-center p-4"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-t-3xl w-full max-w-lg p-6 pb-10"
            >
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-6" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 gradient-lime rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {selectedDay}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Dia {selectedDay}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {protocolDays[selectedDay - 1].title}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-muted/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <p className="font-medium text-foreground">
                      Instrução do Dia
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {protocolDays[selectedDay - 1].instruction}
                  </p>
                </div>

                <div className="bg-yellow-light/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent-foreground" />
                    <p className="font-medium text-foreground">Dica do Dia</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {protocolDays[selectedDay - 1].tip}
                  </p>
                </div>
              </div>

              {!completedDays.includes(selectedDay) && selectedDay <= currentDay && (
                <Button
                  onClick={() => handleComplete(selectedDay)}
                  className="w-full h-14 gradient-lime text-primary-foreground font-bold shadow-glow"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Marcar como Concluído
                </Button>
              )}

              {completedDays.includes(selectedDay) && (
                <div className="flex items-center justify-center gap-2 text-primary font-medium">
                  <Check className="w-5 h-5" />
                  Dia concluído!
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
};

export default Protocol;
