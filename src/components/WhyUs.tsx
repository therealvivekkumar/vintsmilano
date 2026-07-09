import { motion } from "framer-motion";
import { Clock, Leaf, Award } from "lucide-react";

export function WhyUs() {
  const features = [
    { icon: Clock, title: "Long Lasting", desc: "Extrait-level concentrations ensuring 12-20 hours of performance." },
    { icon: Leaf, title: "Premium Ingredients", desc: "Sourced globally, crafted to absolute perfection." },
    { icon: Award, title: "Limited First Batch", desc: "Exclusive pre-order access to our inaugural numbered batch." },
  ];

  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">The Atelier Standard</h2>
          <div className="w-12 h-[1px] bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center mb-6 bg-background group-hover:border-primary transition-colors duration-500">
                <feature.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl mb-3 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
