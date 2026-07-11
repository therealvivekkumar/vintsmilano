import logoDark from "@/assets/brand/vints-logo-dark.png";
import { Instagram, Mail } from "lucide-react";
import type { SVGProps } from "react";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/vintsmilano/",
    icon: Instagram,
  },
  {
    name: "X",
    href: "https://x.com/vintsmilano",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@vintsmilano.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#f4f2ee] border-t border-border/50">
      <div className="container mx-auto px-6 py-16 md:py-20 flex flex-col items-center">
        <img src={logoDark} alt="Vints Milano" className="h-14 w-auto mb-2" />

        <div className="w-8 h-[1px] bg-primary/40 mb-6" />

        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
          Stay Connected
        </p>

        <div className="flex items-center gap-4 mb-10">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target={name === "Email" ? undefined : "_blank"}
              rel={name === "Email" ? undefined : "noopener noreferrer"}
              aria-label={name}
              className="group w-11 h-11 flex items-center justify-center border border-border text-foreground/70 hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <a
          href="mailto:hello@vintsmilano.com"
          className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide font-light mb-10"
        >
          hello@vintsmilano.com
        </a>

        <div className="w-full max-w-xs h-px bg-border/60 mb-6" />

        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] text-center">
          © 2026 Vints Milano. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
