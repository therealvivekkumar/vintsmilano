import { motion } from "framer-motion";
import { Clock, Leaf, Award } from "lucide-react";

export function WhyUs() {
  const features = [
    { icon: Clock, title: "Long Lasting", desc: "Extrait-level concentrations ensuring 12-20 hours of performance." },
    { icon: Leaf, title: "Premium Ingredients", desc: "Sourced globally, crafted to absolute perfection." },
    { icon: Award, title: "Limited First Batch", desc: "Exclusive pre-order access to our inaugural numbered batch." },
  ];

  return (
    <section id="why-us" className="py-32 bg-[#f4f2ee] border-y border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-foreground mb-8"
          >
            The Atelier Standard
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-[1px] bg-primary mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 max-w-5xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full border border-primary/20 flex items-center justify-center mb-8 bg-background group-hover:border-primary transition-colors duration-700">
                <feature.icon className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors duration-700" strokeWidth={1} />
              </div>
              <h3 className="font-serif text-2xl mb-4 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px] font-light">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
