import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-border/50 bg-background/80 backdrop-blur-md font-mono">
      <div className="container px-4 mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-lg font-bold tracking-tight text-primary">
          tushar.dev:~$
        </div>
        
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Tushar Nagpal. All rights reserved.
        </p>
        
        <div className="flex items-center gap-4">
          <a href="https://github.com/TusharNagpal-1" aria-label="GitHub" target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/tushar-nagpal-a6aa78300/" aria-label="LinkedIn" target="_blank" rel="noreferrer" className="text-muted hover:text-secondary transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="mailto:nagpaltushar669@gmail.com" aria-label="Email" className="text-muted hover:text-accent transition-colors">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
