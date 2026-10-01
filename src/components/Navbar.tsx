"use client";

import { useState, useEffect, MouseEvent } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navItems = [
  { name: "~/about", href: "#about" },
  { name: "~/skills", href: "#skills" },
  { name: "~/projects", href: "#projects" },
  { name: "~/achievements", href: "#achievements" },
  { name: "~/experience", href: "#experience" },
  { name: "~/contact", href: "#contact" },
];

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };
  
  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Theme Toggle State
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          currentSection = section;
        }
      }

      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 50) {
          currentSection = sections[sections.length - 1]; // Select last section when reached bottom
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass py-4 shadow-md glow-primary" : "bg-transparent py-6"
        }`}
      >
        <div className="container px-4 mx-auto max-w-7xl flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="text-xl font-bold tracking-tight text-primary font-mono hover:opacity-80 transition-opacity"
          >
            tushar.dev:~$
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <MagneticButton key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              </MagneticButton>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 ml-2 rounded-full hover:bg-muted/20 transition-colors text-foreground"
              aria-label="Toggle Theme"
            >
              {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <Sun size={20} />}
            </button>

            <a
              href="https://drive.google.com/file/d/1mUKMXPS8lStktiqIsmgfPVTlElnkcDH-/view?usp=sharing"
              target="_blank"
              className="px-4 py-1.5 text-xs font-mono font-bold tracking-tight text-primary border border-primary/40 hover:bg-primary/10 rounded transition-colors ml-4"
            >
              ./resume
            </a>
          </div>

          <div className="flex items-center md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 mr-2 rounded-full hover:bg-muted/20 transition-colors text-foreground"
              aria-label="Toggle Theme"
            >
              {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <Sun size={20} />}
            </button>
            {/* Mobile Menu Toggle */}
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col items-center space-y-6 font-mono">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`text-xl font-bold ${
                    activeSection === item.href.substring(1)
                      ? "text-primary"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://drive.google.com/file/d/1mUKMXPS8lStktiqIsmgfPVTlElnkcDH-/view?usp=sharing"
                target="_blank"
                className="mt-4 px-6 py-2 text-sm font-bold text-primary border border-primary/40 hover:bg-primary/10 rounded transition-colors"
              >
                ./download_resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
