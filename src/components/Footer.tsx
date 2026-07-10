import logoDark from "@/assets/brand/vints-logo-dark.png";

export function Footer() {
  return (
    <footer className="bg-[#f4f2ee] py-8 border-t border-border/50">
      <div className="container mx-auto px-6 flex flex-col items-center gap-4">
        <img src={logoDark} alt="Vints Milano" className="h-8 w-auto" />

        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
          © 2026 Vints Milano. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
