import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-[200] transition-all duration-500 border-b border-transparent ${
        scrolled ? "bg-background/95 backdrop-blur-md border-border/50 py-1 shadow-sm" : "bg-transparent py-2"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-foreground/80 font-medium">
          <a href="#collection" className="hover:text-primary transition-colors">Collection</a>
        </div>
        
        <a href="#" className="mx-auto md:mx-0">
          <img
            src="/vints-milano-logo.png"
            alt="Vints Milano"
            className="w-28 h-auto brightness-200 opacity-90"
          />
        </a>
        
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-foreground/80 font-medium">
          <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href="#preorder" className="hover:text-primary transition-colors">Pre-Order</a>
        </div>
      </div>
    </nav>
  );
}
