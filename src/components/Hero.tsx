"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download, Play } from "lucide-react";
import TerminalMockup from "./ui/TerminalMockup";

interface TerminalLine {
  type: "command" | "output";
  text: string;
}

const TERMINAL_SCRIPT = [
  { type: "command", text: "who am i" },
  { type: "output", text: "tushar-nagpal (Full Stack Developer & CS Undergrad)" },
  { type: "command", text: "cat info.json" },
  {
    type: "output",
    text: `{
  "location": "India",
  "dsa_solved": "300+",
  "specialties": ["MERN", "Next.js", "AI Integration"],
  "status": "available_for_opportunities"
}`,
  },
  { type: "command", text: "npm run dev" },
  { type: "output", text: "> next dev\n- ready started server on http://localhost:3000\n- performance: outstanding (100% SEO & lag-free)" },
];

export default function Hero() {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentCommandText, setCurrentCommandText] = useState("");
  const [scriptIndex, setScriptIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const isTyping = scriptIndex < TERMINAL_SCRIPT.length;

  // Auto-typing terminal simulator effect
  useEffect(() => {
    if (scriptIndex >= TERMINAL_SCRIPT.length) {
      return;
    }

    const currentItem = TERMINAL_SCRIPT[scriptIndex];

    if (currentItem.type === "command") {
      if (charIndex < currentItem.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCommandText((prev) => prev + currentItem.text[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 80 + Math.random() * 40); // natural typing speed
        return () => clearTimeout(timeout);
      } else {
        // Command typing finished
        const timeout = setTimeout(() => {
          setTerminalLines((prev) => [
            ...prev,
            { type: "command", text: currentItem.text },
          ]);
          setCurrentCommandText("");
          setCharIndex(0);
          setScriptIndex((prev) => prev + 1);
        }, 500); // pause after command
        return () => clearTimeout(timeout);
      }
    } else {
      // Output item (appears instantly)
      const timeout = setTimeout(() => {
        setTerminalLines((prev) => [
          ...prev,
          { type: "output", text: currentItem.text },
        ]);
        setScriptIndex((prev) => prev + 1);
      }, 400); // delay before output prints
      return () => clearTimeout(timeout);
    }
  }, [scriptIndex, charIndex]);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden bg-background"
    >
      <div className="container relative z-10 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and Terminal Mockup */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-block px-3 py-1 text-xs font-mono font-bold tracking-tight rounded border border-primary/20 bg-primary/5 text-primary">
                $ status --available
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                Hi,I&apos;m <span className="text-primary glow-text">Tushar Nagpal</span>
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl font-mono">
                Building scalable AI-powered web applications and solving complex problems with clean code.
              </p>
            </motion.div>

            {/* Simulated Terminal Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <TerminalMockup title="tushar@portfolio:~">
                <div className="space-y-3 font-mono text-xs sm:text-sm">
                  {/* Previous lines */}
                  {terminalLines.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap">
                      {line.type === "command" ? (
                        <div>
                          <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                          <span className="text-foreground">{line.text}</span>
                        </div>
                      ) : (
                        <div className="text-muted leading-relaxed">{line.text}</div>
                      )}
                    </div>
                  ))}

                  {/* Current line being typed */}
                  {scriptIndex < TERMINAL_SCRIPT.length &&
                    TERMINAL_SCRIPT[scriptIndex].type === "command" && (
                      <div>
                        <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                        <span className="text-foreground">{currentCommandText}</span>
                        <span className="cursor-blink text-primary">|</span>
                      </div>
                    )}

                  {/* Waiting state at the end */}
                  {!isTyping && (
                    <div>
                      <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                      <span className="cursor-blink text-primary">_</span>
                    </div>
                  )}
                </div>
              </TerminalMockup>
            </motion.div>

            {/* Social Links & Resume CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#projects"
                className="px-6 py-2.5 text-sm font-bold font-mono text-black bg-primary hover:bg-primary-hover rounded shadow-lg transition-colors flex items-center gap-2"
              >
                <Play size={14} className="fill-current" />
                ./run_projects
              </a>
              <a
                href="https://drive.google.com/file/d/1mUKMXPS8lStktiqIsmgfPVTlElnkcDH-/view?usp=sharing"
                target="_blank"
                className="px-6 py-2.5 text-sm font-bold font-mono text-primary border border-primary/50 hover:bg-primary/10 rounded transition-colors flex items-center gap-2"
              >
                <Download size={14} />
                ./resume
              </a>

              <div className="flex items-center gap-2 sm:ml-4">
                {[
                  { icon: <Github size={18} />, href: "https://github.com/TusharNagpal-1", label: "GitHub" },
                  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/tushar-nagpal-a6aa78300/", label: "LinkedIn" },
                  { icon: <Mail size={18} />, href: "mailto:nagpaltushar669@gmail.com", label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="p-2 border border-border hover:border-primary/50 text-muted hover:text-primary transition-all rounded bg-card/40"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Structured Focus Index (Mac/Terminal Layout) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-xl border border-border bg-card/40 space-y-6"
            >
              {/* Category 1 */}
              <div>
                <div className="border-b border-primary/20 pb-1.5 mb-3 font-mono text-xs text-primary flex items-center justify-between">
                  <span>&gt; SKILLS / FOCUS</span>
                  <span className="text-muted/20 select-none">{'////////////////////'}</span>
                </div>
                
                <div className="space-y-2.5 font-mono text-xs sm:text-sm">
                  {[
                    { num: "1.1", label: "Full Stack Development" },
                    { num: "1.2", label: "Next.js & MERN Stack" },
                    { num: "1.3", label: "AI API Integrations" }
                  ].map((item) => (
                    <div key={item.num} className="flex items-center gap-3 py-1 border-b border-border/50">
                      <span className="text-secondary font-bold select-none">{item.num}</span>
                      <span className="text-foreground/90 font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2 */}
              <div>
                <div className="border-b border-primary/20 pb-1.5 mb-3 font-mono text-xs text-primary flex items-center justify-between">
                  <span>&gt; METRICS / RATINGS</span>
                  <span className="text-muted/20 select-none">{'////////////////////'}</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs sm:text-sm">
                  {[
                    { num: "2.1", label: "LeetCode 1500+ Rating" },
                    { num: "2.2", label: "300+ DSA Problems Solved" },
                    { num: "2.3", label: "IEEE CS Program Chair" },
                  ].map((item) => (
                    <div key={item.num} className="flex items-center gap-3 py-1 border-b border-border/50">
                      <span className="text-accent font-bold select-none">{item.num}</span>
                      <span className="text-foreground/90 font-semibold">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
