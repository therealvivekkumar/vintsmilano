import { useState, useEffect, type MouseEvent } from "react";
import logoDark from "@/assets/brand/vints-logo-dark.png";
import logoLight from "@/assets/brand/vints-logo-light.png";

export function Navbar({ onLogoClick }: { onLogoClick?: () => void } = {}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onLogoClick?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[200] transition-all duration-500 border-b border-transparent py-4 md:py-6 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-border/50 md:py-3 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 relative flex items-center justify-between min-h-14 md:min-h-16">
        <div className={`hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${scrolled ? 'text-foreground/80' : 'text-white/80'}`}>
          <a href="/#collection" className="hover:text-primary transition-colors">Collection</a>
        </div>
        
        <a href="/" onClick={handleLogoClick} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" aria-label="Go to home">
          <img
            src={scrolled ? logoDark : logoLight}
            style={{ filter: scrolled ? undefined : "drop-shadow(0 1px 3px rgba(0,0,0,0.5))" }}
            alt="Vints Milano"
            className="h-14 md:h-16 w-auto transition-opacity duration-300"
          />
        </a>
        
        <div className={`hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${scrolled ? 'text-foreground/80' : 'text-white/80'}`}>
          <a href="/#faq" className="hover:text-primary transition-colors">FAQ</a>
          <a href="/#preorder" className="hover:text-primary transition-colors">Pre-Order</a>
        </div>
      </div>
    </nav>
  );
}
