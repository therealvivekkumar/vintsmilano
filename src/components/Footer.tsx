export function Footer() {
  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <img
          src="/vints-milano-logo.png"
          alt="Vints Milano"
          className="w-36 h-auto brightness-200 opacity-80 mb-8"
        />

        <div className="w-full max-w-md h-[1px] bg-border mb-8" />

        <p className="text-xs text-muted-foreground/60 tracking-wider">
          © 2026 Vints Milano. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
