import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import rainMossModelImg from "@assets/Model_With_perfume_RM.2_1782995811864.png";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={rainMossModelImg} 
          alt="Vints Milano Cinematic Hero" 
          className="w-full h-full object-cover object-[center_15%]"
        />
        <div className="absolute inset-0 bg-background/60 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-6"
        >
          Eau de Parfum Collection
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-8 leading-tight font-light"
        >
          Where Every Drop<br />Tells a Story
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="rounded-none border-primary/50 text-primary-foreground hover:bg-primary/90 px-10 py-7 text-sm tracking-[0.2em] uppercase font-medium"
            onClick={() => document.getElementById('preorder')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Pre-Order Now
          </Button>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Discover</span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-primary"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
