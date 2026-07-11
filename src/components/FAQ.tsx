import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    { q: "How long until my perfume arrives?", a: "Bengaluru: Usually within 24 hours. If you're lucky, your order might even arrive personally delivered by the founder (yes, we love a good story).\n\nRest of India: 7–10 business days after your batch ships. More details will be sent via email." },
    { q: "Is this a pre-order?", a: "Yes. We are currently accepting pre-orders for our inaugural launch batch, dispatched within 30 days." },
    { q: "Can I cancel my order?", a: "Cancellations are accepted within 24 hours of placing the order. Contact us via email or WhatsApp." },
    { q: "What payment methods are available?", a: "We accept all major UPI apps, net banking, credit/debit cards, and cash on delivery for selected cities." }
  ];

  return (
    <section id="faq" className="py-16 md:py-32 bg-background scroll-mt-20 md:scroll-mt-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-10 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-6">Common Questions</h2>
          <div className="w-12 h-[1px] bg-primary mx-auto" />
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
              <AccordionTrigger className="text-left font-serif text-lg md:text-xl hover:no-underline hover:text-primary transition-colors py-8 text-foreground/90 font-normal">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-8 font-light text-sm md:text-base">
                {faq.a.split("\n\n").map((para, j) => (
                  <p key={j} className={j > 0 ? "mt-4" : ""}>{para}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
