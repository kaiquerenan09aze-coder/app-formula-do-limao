import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Mail, ChevronDown, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/layout/BottomNav";

const faqs = [
  {
    question: "Posso tomar a fórmula à noite?",
    answer:
      "O ideal é tomar em jejum pela manhã, 30 minutos antes do café. Isso potencializa a absorção e os efeitos detox no organismo.",
  },
  {
    question: "Preciso usar limão orgânico?",
    answer:
      "O limão orgânico é preferível pois não contém agrotóxicos na casca. Caso use limão convencional, lave bem com água e bicarbonato.",
  },
  {
    question: "Posso fazer a fórmula e guardar para depois?",
    answer:
      "Não recomendamos. O limão oxidado perde propriedades importantes. Prepare sempre na hora para melhores resultados.",
  },
  {
    question: "Posso continuar após os 21 dias?",
    answer:
      "Sim! Após o protocolo inicial, você pode manter o hábito 3 a 4 vezes por semana como manutenção.",
  },
  {
    question: "A fórmula é indicada para gestantes?",
    answer:
      "Gestantes e lactantes devem consultar seu médico antes de iniciar qualquer protocolo alimentar.",
  },
  {
    question: "Senti azia, é normal?",
    answer:
      "Algumas pessoas podem sentir azia nos primeiros dias. Experimente diluir mais o limão ou adicionar menos quantidade inicialmente.",
  },
];

const Support = () => {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Preciso de ajuda com a Fórmula do Limão", "_blank");
  };

  const handleEmail = () => {
    window.open("mailto:suporte@formuladolimao.com?subject=Suporte - Fórmula do Limão", "_blank");
  };

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
              Suporte
            </h1>
            <p className="text-sm text-muted-foreground">
              Estamos aqui para ajudar
            </p>
          </div>
        </div>
      </motion.header>

      <main className="px-4 py-6">
        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <Button
            onClick={handleWhatsApp}
            className="h-auto py-6 flex-col gap-3 gradient-lime text-primary-foreground rounded-xl shadow-glow hover:shadow-lg"
          >
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="font-semibold">WhatsApp</span>
            <span className="text-xs opacity-80">Resposta rápida</span>
          </Button>

          <Button
            onClick={handleEmail}
            variant="outline"
            className="h-auto py-6 flex-col gap-3 bg-card border-border rounded-xl hover:bg-muted"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <span className="font-semibold text-foreground">Email</span>
            <span className="text-xs text-muted-foreground">
              Suporte completo
            </span>
          </Button>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">
            Perguntas Frequentes
          </h2>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="bg-card rounded-xl border border-border/50 px-4 overflow-hidden"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Help Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-yellow-light/30 rounded-2xl p-6 text-center"
        >
          <span className="text-4xl">🍋</span>
          <h3 className="font-display text-lg font-semibold text-forest mt-3 mb-2">
            Não encontrou sua dúvida?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Entre em contato pelo WhatsApp que nossa equipe responde em até 24h
          </p>
          <Button
            onClick={handleWhatsApp}
            className="gradient-lime text-primary-foreground shadow-glow"
          >
            Falar com Suporte
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Support;
