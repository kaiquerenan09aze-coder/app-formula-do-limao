import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChefHat,
  Gift,
  Clock,
  CheckCircle2,
  Zap,
  Leaf,
  Droplets,
  Heart,
  Flame,
  Apple,
  Circle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import BottomNav from "@/components/layout/BottomNav";
import { useState } from "react";

interface FormulaContent {
  objetivo: string;
  ingredientes: string[];
  preparo: string[];
  horario: string;
  frequencia: string;
  observacoes: string[];
}

interface Formula {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  content: FormulaContent;
}

interface ModuleData {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  formulas: Formula[];
}

const modulesData: Record<string, ModuleData> = {
  introducao: {
    title: "Introdução ao Método",
    description: "Entenda como a Fórmula do Limão transforma seu metabolismo",
    icon: BookOpen,
    color: "bg-primary",
    formulas: [
      {
        id: "intro-1",
        title: "O que é a Fórmula do Limão",
        subtitle: "Base do protocolo metabólico",
        icon: Leaf,
        content: {
          objetivo: "Compreender o mecanismo de ação do limão no organismo, seus compostos ativos e como ele auxilia na secagem corporal de forma natural.",
          ingredientes: [],
          preparo: [
            "A Fórmula do Limão é um protocolo natural baseado no uso estratégico do limão e seus compostos bioativos para acelerar o metabolismo.",
            "O ácido cítrico presente no limão estimula a produção de enzimas digestivas, facilitando a quebra de gorduras.",
            "A vitamina C atua como cofator na síntese de carnitina, molécula essencial para o transporte de ácidos graxos para as mitocôndrias.",
            "Os flavonoides do limão possuem ação antioxidante e anti-inflamatória, reduzindo a inflamação crônica associada ao ganho de peso.",
          ],
          horario: "Leitura recomendada pela manhã",
          frequencia: "Leia uma vez antes de iniciar o protocolo",
          observacoes: [
            "Este não é um método de emagrecimento milagroso — é um protocolo baseado em fitoquímica.",
            "Consulte seu médico antes de iniciar qualquer protocolo alimentar.",
          ],
        },
      },
      {
        id: "intro-2",
        title: "Como o Limão Age no Corpo",
        subtitle: "Mecanismo metabólico explicado",
        icon: Zap,
        content: {
          objetivo: "Entender os 4 pilares de ação do limão: digestão, desintoxicação, alcalinização e termogênese leve.",
          ingredientes: [],
          preparo: [
            "Pilar 1 — Digestão: O ácido cítrico estimula a produção de bile pelo fígado, melhorando a digestão de gorduras.",
            "Pilar 2 — Desintoxicação: Os compostos do limão ativam as enzimas de fase II do fígado, acelerando a eliminação de toxinas.",
            "Pilar 3 — Alcalinização: Apesar de ácido, o limão produz resíduos alcalinos após metabolização, equilibrando o pH sanguíneo.",
            "Pilar 4 — Termogênese: Combinado com gengibre e canela, potencializa a geração de calor corporal, aumentando o gasto calórico basal.",
          ],
          horario: "Leitura recomendada pela manhã",
          frequencia: "Leia uma vez antes de iniciar o protocolo",
          observacoes: [
            "A eficácia é potencializada quando combinada com hidratação adequada (mínimo 2L de água por dia).",
          ],
        },
      },
      {
        id: "intro-3",
        title: "Benefícios Principais",
        subtitle: "O que esperar do protocolo",
        icon: Heart,
        content: {
          objetivo: "Conhecer os principais benefícios relatados por quem segue o protocolo completo de 21 dias.",
          ingredientes: [],
          preparo: [
            "Redução do inchaço abdominal já nos primeiros 3-5 dias.",
            "Melhora da digestão e regularidade intestinal.",
            "Aumento da disposição e energia ao longo do dia.",
            "Pele mais luminosa e hidratada.",
            "Redução da retenção de líquidos.",
            "Aceleração do metabolismo basal.",
            "Diminuição da compulsão por doces.",
          ],
          horario: "Leitura recomendada a qualquer momento",
          frequencia: "Consulte sempre que precisar de motivação",
          observacoes: [
            "Os resultados variam de pessoa para pessoa.",
            "Melhores resultados são obtidos seguindo o protocolo completo de 21 dias.",
          ],
        },
      },
      {
        id: "intro-4",
        title: "Para Quem é Indicado",
        subtitle: "Público-alvo e contraindicações",
        icon: Apple,
        content: {
          objetivo: "Identificar se o protocolo é adequado para o seu perfil e conhecer as contraindicações.",
          ingredientes: [],
          preparo: [
            "Indicado para mulheres e homens adultos que desejam desinchar e acelerar o metabolismo naturalmente.",
            "Ideal para quem busca um método simples, sem suplementos caros ou dietas restritivas.",
            "Perfeito para iniciantes em protocolos de saúde natural.",
            "Recomendado para quem sente inchaço constante, digestão lenta ou falta de energia.",
          ],
          horario: "Leitura antes de iniciar o protocolo",
          frequencia: "Leia uma vez",
          observacoes: [
            "Contraindicado para pessoas com gastrite aguda, úlcera gástrica ou alergia a cítricos.",
            "Gestantes e lactantes devem consultar o médico antes de iniciar.",
            "Pessoas com sensibilidade dental devem usar canudo ao consumir bebidas com limão.",
          ],
        },
      },
    ],
  },
  receita: {
    title: "Receitas Oficiais",
    description: "As fórmulas completas do protocolo de secagem",
    icon: ChefHat,
    color: "bg-accent",
    formulas: [
      {
        id: "receita-1",
        title: "Fórmula Detox Matinal",
        subtitle: "A base do protocolo diário",
        icon: Droplets,
        content: {
          objetivo: "Preparar a bebida base do protocolo que deve ser consumida todos os dias em jejum para ativar o metabolismo.",
          ingredientes: [
            "1 limão siciliano orgânico",
            "200ml de água morna (não quente)",
            "1 colher de chá de gengibre fresco ralado",
            "1 pitada de canela em pó (Ceilão de preferência)",
          ],
          preparo: [
            "Aqueça a água até ficar morna (não pode ferver).",
            "Esprema o limão fresco diretamente na água — nunca use suco industrializado.",
            "Adicione o gengibre ralado e misture bem.",
            "Finalize com a pitada de canela.",
            "Beba imediatamente, de preferência com canudo para proteger o esmalte dental.",
          ],
          horario: "Em jejum, 30 minutos antes do café da manhã",
          frequencia: "Diariamente durante os 21 dias do protocolo",
          observacoes: [
            "A água não pode estar fervendo — temperaturas altas destroem a vitamina C.",
            "Use limão fresco, nunca suco de caixinha.",
            "Após beber, espere 30 minutos antes de comer.",
            "Escove os dentes 30 minutos após o consumo para proteger o esmalte.",
          ],
        },
      },
      {
        id: "receita-2",
        title: "Shot Termogênico",
        subtitle: "Potencializador metabólico",
        icon: Flame,
        content: {
          objetivo: "Preparar um shot concentrado para acelerar a termogênese e potencializar a queima de gordura nos dias de maior esforço.",
          ingredientes: [
            "½ limão espremido",
            "50ml de água gelada",
            "1 colher de chá de vinagre de maçã orgânico",
            "1 pitada de pimenta caiena",
            "½ colher de chá de cúrcuma em pó",
          ],
          preparo: [
            "Esprema o meio limão no copo.",
            "Adicione a água gelada.",
            "Acrescente o vinagre de maçã e misture.",
            "Adicione a cúrcuma e a pimenta caiena.",
            "Misture bem e beba de uma vez.",
          ],
          horario: "30 minutos antes do almoço",
          frequencia: "3x por semana (dias alternados)",
          observacoes: [
            "Comece com menos pimenta e aumente gradualmente.",
            "Não consuma em jejum se tiver sensibilidade estomacal.",
            "A cúrcuma mancha — cuidado com roupas claras.",
          ],
        },
      },
      {
        id: "receita-3",
        title: "Água Detox Noturna",
        subtitle: "Desintoxicação enquanto dorme",
        icon: Droplets,
        content: {
          objetivo: "Preparar uma infusão noturna que auxilia na desintoxicação durante o sono e reduz o inchaço matinal.",
          ingredientes: [
            "3 rodelas finas de limão com casca",
            "5 folhas de hortelã fresca",
            "500ml de água filtrada",
            "3 rodelas de pepino",
          ],
          preparo: [
            "Coloque a água em uma jarra de vidro.",
            "Adicione as rodelas de limão com casca (bem lavadas).",
            "Acrescente as folhas de hortelã levemente amassadas.",
            "Coloque as rodelas de pepino.",
            "Deixe na geladeira por no mínimo 4 horas antes de consumir.",
          ],
          horario: "Consumir entre 19h e 21h",
          frequencia: "Diariamente durante o protocolo",
          observacoes: [
            "Prepare à tarde para consumir à noite.",
            "Use jarra de vidro (plástico pode reagir com o ácido).",
            "Descarte as frutas após 24 horas de infusão.",
          ],
        },
      },
    ],
  },
  bonus: {
    title: "Bônus Exclusivos",
    description: "Fórmulas extras para potencializar seus resultados",
    icon: Gift,
    color: "bg-yellow",
    formulas: [
      {
        id: "bonus-1",
        title: "Receitas Detox com Limão",
        subtitle: "4 receitas complementares",
        icon: Droplets,
        content: {
          objetivo: "Diversificar seu protocolo com variações saborosas que mantêm o mesmo efeito detoxificante.",
          ingredientes: [
            "Limão + Couve + Gengibre (suco verde)",
            "Limão + Abacaxi + Hortelã (água aromatizada)",
            "Limão + Maçã + Canela (chá frio)",
            "Limão + Beterraba + Cenoura (suco antioxidante)",
          ],
          preparo: [
            "Suco Verde: Bata 1 folha de couve, suco de 1 limão, 1cm de gengibre e 200ml de água no liquidificador.",
            "Água Aromatizada: Combine rodelas de limão, pedaços de abacaxi e hortelã em 1L de água. Deixe na geladeira 4h.",
            "Chá Frio: Prepare chá de maçã com canela, deixe esfriar e adicione suco de meio limão.",
            "Suco Antioxidante: Bata ½ beterraba, 1 cenoura, suco de 1 limão e 200ml de água.",
          ],
          horario: "Alternar ao longo do dia como complemento",
          frequencia: "2-3 vezes por semana como variação",
          observacoes: [
            "Essas receitas são complementares, não substituem a fórmula principal.",
            "Consuma logo após o preparo para manter os nutrientes.",
          ],
        },
      },
      {
        id: "bonus-2",
        title: "Chás Complementares",
        subtitle: "Infusões que potencializam o protocolo",
        icon: Leaf,
        content: {
          objetivo: "Incorporar chás estratégicos que aceleram os resultados do protocolo principal.",
          ingredientes: [
            "Chá Verde — acelera metabolismo",
            "Chá de Hibisco — ação diurética",
            "Chá de Cavalinha — reduz retenção de líquidos",
            "Chá de Gengibre com Limão — termogênico",
          ],
          preparo: [
            "Para todos: ferva 200ml de água, desligue o fogo e adicione 1 colher de chá da erva.",
            "Tampe e deixe em infusão por 5-10 minutos.",
            "Coe e consuma morno ou gelado.",
            "Para o chá de gengibre com limão: adicione o suco de meio limão após coar.",
          ],
          horario: "Manhã: Chá Verde | Tarde: Hibisco | Noite: Cavalinha",
          frequencia: "1-2 xícaras por dia",
          observacoes: [
            "Chá verde contém cafeína — evite após as 16h se tiver sensibilidade.",
            "Hibisco é contraindicado para pressão baixa.",
          ],
        },
      },
      {
        id: "bonus-3",
        title: "Cardápio Semanal",
        subtitle: "Planejamento alimentar de 7 dias",
        icon: Apple,
        content: {
          objetivo: "Seguir um cardápio semanal que complementa o protocolo e maximiza os resultados de secagem.",
          ingredientes: [
            "Proteínas magras (frango, peixe, ovos)",
            "Vegetais verdes e coloridos",
            "Gorduras boas (abacate, azeite, castanhas)",
            "Carboidratos complexos (batata doce, arroz integral)",
            "Frutas de baixo índice glicêmico",
          ],
          preparo: [
            "Café da manhã: Fórmula do Limão + 30min depois: ovos mexidos com espinafre.",
            "Lanche: Frutas vermelhas com castanhas.",
            "Almoço: Proteína grelhada + salada colorida + arroz integral.",
            "Lanche da tarde: Chá complementar + 1 fruta.",
            "Jantar: Sopa de legumes ou salada com proteína leve.",
          ],
          horario: "Seguir os horários sugeridos em cada refeição",
          frequencia: "7 dias por semana durante o protocolo",
          observacoes: [
            "Adapte as porções ao seu biótipo e nível de atividade.",
            "Evite alimentos ultraprocessados durante o protocolo.",
            "Hidrate-se com no mínimo 2L de água por dia.",
          ],
        },
      },
      {
        id: "bonus-4",
        title: "Lista de Compras",
        subtitle: "Tudo que você precisa para começar",
        icon: CheckCircle2,
        content: {
          objetivo: "Ter em mãos todos os ingredientes necessários para seguir o protocolo completo de 21 dias.",
          ingredientes: [
            "🍋 Limões sicilianos orgânicos (21 unidades mínimo)",
            "🫚 Gengibre fresco (200g)",
            "🌿 Hortelã fresca (2 maços por semana)",
            "🥒 Pepinos (7 unidades por semana)",
            "🫖 Canela em pó (1 pote)",
            "🍵 Chá verde, Hibisco e Cavalinha (1 caixa de cada)",
            "🧴 Vinagre de maçã orgânico (1 garrafa)",
            "🌶 Pimenta caiena (1 pote pequeno)",
            "🟡 Cúrcuma em pó (1 pote)",
          ],
          preparo: [
            "Compre os limões semanalmente para garantir frescor (7 por semana).",
            "Armazene o gengibre na geladeira envolto em papel toalha.",
            "A hortelã dura mais se guardada em copo com água na geladeira.",
            "Verifique se o vinagre de maçã é orgânico e com \"mãe\" do vinagre.",
          ],
          horario: "Faça compras 1x por semana, preferencialmente às segundas",
          frequencia: "Compra semanal durante as 3 semanas do protocolo",
          observacoes: [
            "Prefira produtos orgânicos quando possível.",
            "Total estimado: R$ 50-80 por semana.",
            "Essa lista cobre todas as receitas do protocolo e dos bônus.",
          ],
        },
      },
    ],
  },
};

const Module = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { toggleFormulaComplete, isFormulaCompleted, getModuleProgress } = useAuth();
  const [expandedFormula, setExpandedFormula] = useState<string | null>(null);

  const module = moduleId ? modulesData[moduleId] : null;

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Módulo não encontrado</p>
      </div>
    );
  }

  const formulaIds = module.formulas.map((f) => f.id);
  const progress = getModuleProgress(formulaIds);

  const getStatusLabel = () => {
    if (progress.percent === 0) return "Não iniciado";
    if (progress.percent === 100) return "Concluído ✓";
    return "Em progresso";
  };

  const getStatusColor = () => {
    if (progress.percent === 0) return "text-muted-foreground";
    if (progress.percent === 100) return "text-primary";
    return "text-accent-foreground";
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${module.color} px-4 pt-12 pb-8 rounded-b-[2rem]`}
      >
        <div className="flex items-center gap-4 mb-4">
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

        {/* Module Progress */}
        <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary-foreground/80">
              {progress.completed} de {progress.total} fórmulas
            </span>
            <span className={`text-sm font-bold text-primary-foreground`}>
              {progress.percent}%
            </span>
          </div>
          <Progress value={progress.percent} className="h-2 bg-primary-foreground/20" />
          <p className={`text-xs mt-2 font-semibold text-primary-foreground/80`}>
            Status: {getStatusLabel()}
          </p>
        </div>
      </motion.header>

      <main className="px-4 py-6 space-y-4">
        {module.formulas.map((formula, idx) => {
          const isCompleted = isFormulaCompleted(formula.id);
          const isExpanded = expandedFormula === formula.id;
          const FormulaIcon = formula.icon;

          return (
            <motion.div
              key={formula.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
            >
              {/* Formula Card */}
              <button
                onClick={() => setExpandedFormula(isExpanded ? null : formula.id)}
                className={`w-full text-left bg-card rounded-xl p-4 shadow-soft border transition-all duration-300 ${
                  isCompleted ? "border-primary/50" : "border-border/50"
                } hover:shadow-card`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 ${module.color} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <FormulaIcon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">
                      {formula.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {formula.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground/40" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Formula Content */}
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 bg-card rounded-xl border border-border/50 p-5 space-y-5 shadow-soft"
                >
                  {/* Objetivo */}
                  <div>
                    <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      🎯 Objetivo
                    </h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {formula.content.objetivo}
                    </p>
                  </div>

                  {/* Ingredientes */}
                  {formula.content.ingredientes.length > 0 && (
                    <div>
                      <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        🍋 Ingredientes
                      </h5>
                      <ul className="space-y-1.5">
                        {formula.content.ingredientes.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Modo de Preparo / Aplicação */}
                  <div>
                    <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      📝 {formula.content.ingredientes.length > 0 ? "Modo de Preparo" : "Conteúdo"}
                    </h5>
                    <ol className="space-y-2">
                      {formula.content.preparo.map((step, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Horário e Frequência */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground font-medium">Horário Ideal</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formula.content.horario}
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap className="w-3.5 h-3.5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground font-medium">Frequência</p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {formula.content.frequencia}
                      </p>
                    </div>
                  </div>

                  {/* Observações */}
                  {formula.content.observacoes.length > 0 && (
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <h5 className="font-semibold text-foreground mb-2 text-sm flex items-center gap-2">
                        ⚠️ Observações Importantes
                      </h5>
                      <ul className="space-y-1">
                        {formula.content.observacoes.map((obs, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                            <span className="text-accent">•</span>
                            {obs}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Complete Button - Fixed at bottom of card */}
                  <div className="pt-2 border-t border-border/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFormulaComplete(formula.id);
                      }}
                      className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        isCompleted
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "gradient-lime text-primary-foreground shadow-glow"
                      }`}
                    >
                      <Checkbox
                        checked={isCompleted}
                        className="pointer-events-none border-current data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      {isCompleted ? "✅ Fórmula Concluída" : "Marcar como Concluída"}
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
};

export default Module;
