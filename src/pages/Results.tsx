import { motion } from "framer-motion";
import { ArrowLeft, Quote, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/layout/BottomNav";

const testimonials = [
  {
    id: 1,
    name: "Ana Paula",
    location: "São Paulo, SP",
    text: "Em 21 dias perdi 4kg e desinchei muito! A fórmula do limão mudou minha vida.",
    rating: 5,
    result: "-4kg",
  },
  {
    id: 2,
    name: "Fernanda S.",
    location: "Rio de Janeiro, RJ",
    text: "Minha disposição aumentou demais. Acordo com mais energia e menos inchaço.",
    rating: 5,
    result: "-3.5kg",
  },
  {
    id: 3,
    name: "Juliana M.",
    location: "Belo Horizonte, MG",
    text: "O protocolo é simples e funciona! Em 2 semanas já notei diferença na cintura.",
    rating: 5,
    result: "-5cm",
  },
  {
    id: 4,
    name: "Carla R.",
    location: "Curitiba, PR",
    text: "Nunca achei que um limão poderia fazer tanta diferença. Estou amando os resultados!",
    rating: 5,
    result: "-3kg",
  },
  {
    id: 5,
    name: "Patricia L.",
    location: "Salvador, BA",
    text: "Além de emagrecer, minha pele melhorou muito. Recomendo para todas!",
    rating: 5,
    result: "-4.2kg",
  },
];

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-hero px-4 pt-12 pb-8 rounded-b-[2rem]"
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-10 h-10 rounded-full bg-forest/20 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-forest" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold text-forest">
              Resultados Reais
            </h1>
            <p className="text-forest/80 text-sm mt-1">
              Depoimentos de quem transformou o corpo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-forest/20 rounded-xl px-4 py-2 text-center flex-1">
            <p className="text-2xl font-bold text-forest">500+</p>
            <p className="text-xs text-forest/80">Alunas</p>
          </div>
          <div className="bg-forest/20 rounded-xl px-4 py-2 text-center flex-1">
            <p className="text-2xl font-bold text-forest">4.9</p>
            <p className="text-xs text-forest/80">Avaliação</p>
          </div>
          <div className="bg-forest/20 rounded-xl px-4 py-2 text-center flex-1">
            <p className="text-2xl font-bold text-forest">98%</p>
            <p className="text-xs text-forest/80">Satisfação</p>
          </div>
        </div>
      </motion.header>

      <main className="px-4 py-6 space-y-4">
        {testimonials.map((testimonial, idx) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card rounded-2xl p-5 shadow-soft border border-border/50"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 gradient-lime rounded-full flex items-center justify-center shrink-0">
                <span className="text-xl">🍋</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                    {testimonial.result}
                  </div>
                </div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow text-yellow"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="relative pl-4">
              <Quote className="absolute left-0 top-0 w-3 h-3 text-primary/30" />
              <p className="text-sm text-muted-foreground italic">
                {testimonial.text}
              </p>
            </div>
          </motion.div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-lime-light/50 rounded-2xl p-6 text-center"
        >
          <h3 className="font-display text-xl font-bold text-forest mb-2">
            O próximo resultado pode ser o seu! 🍋
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Siga o protocolo por 21 dias e veja a transformação
          </p>
          <button
            onClick={() => navigate("/protocolo")}
            className="gradient-lime text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-glow hover:shadow-lg transition-all"
          >
            Iniciar Agora
          </button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Results;
