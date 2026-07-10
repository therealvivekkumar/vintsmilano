import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBannerImg from "@/assets/hero-banner.png";

export function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBannerImg} 
          alt="Vints Milano Cinematic Hero" 
          className="w-full h-full object-cover object-[center_20%] opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/45" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-16">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/80 font-medium tracking-[0.3em] uppercase text-xs mb-8"
        >
          Eau de Parfum Collection
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white mb-10 leading-[1.1] font-light drop-shadow-sm"
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
            className="rounded-none bg-white text-black hover:bg-white/90 px-12 py-8 text-xs tracking-[0.2em] uppercase font-medium transition-colors"
            onClick={() => document.getElementById('preorder')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Pre-Order Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
