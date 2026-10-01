"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TerminalMockup from "./ui/TerminalMockup";

interface BioCardProps {
  title: string;
  content: string;
  icon: string;
  delay: number;
}

interface StatItemProps {
  label: string;
  value: string;
  color?: string;
  delay: number;
  trend?: string;
}

interface SkillBadgeProps {
  skill: string;
  level: number;
  delay: number;
}

const BioCard = ({ title, content, icon, delay }: BioCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="group"
  >
    <div className="border border-primary/20 rounded-lg p-4 group-hover:border-primary/60 group-hover:bg-primary/5 transition-all duration-300">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-sm font-bold uppercase text-primary group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <p className="text-xs text-muted leading-relaxed group-hover:text-muted/80 transition-colors">
        {content}
      </p>
    </div>
  </motion.div>
);

const StatItem = ({ label, value, color = "primary", delay, trend }: StatItemProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ scale: 1.05, y: -4 }}
    className="group"
  >
    <div className="border border-primary/20 rounded-lg p-4 group-hover:border-primary/60 group-hover:bg-gradient-to-br group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300">
      <p className={`text-xs font-semibold uppercase text-${color}/70 group-hover:text-${color} transition-colors`}>
        {label}
      </p>
      <p className={`text-xl font-bold text-${color} mt-2 group-hover:text-${color} transition-colors`}>
        {value}
      </p>
      {trend && (
        <p className="text-xs text-green-500/70 mt-1 flex items-center gap-1">
          ↗ {trend}
        </p>
      )}
    </div>
  </motion.div>
);

const SkillBadge = ({ skill, level, delay }: SkillBadgeProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, delay }}
    whileHover={{ scale: 1.1, y: -2 }}
    className="group"
  >
    <div className="px-3 py-2 rounded-full border border-primary/30 bg-gradient-to-r from-primary/20 to-primary/10 hover:from-primary/30 hover:to-primary/20 transition-all">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-primary">{skill}</span>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full ${
                i < level ? "bg-primary" : "bg-primary/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function About() {
  const bioPoints = [
    {
      title: "Problem Solver",
      content: "Passionate about solving complex algorithmic challenges and building efficient solutions that scale.",
      icon: "🧠"
    },
    {
      title: "Full Stack Developer",
      content: "Expert in MERN stack and Next.js, building production-ready applications with modern tech.",
      icon: "⚙️"
    },
    {
      title: "AI Enthusiast",
      content: "Integrating AI capabilities into web applications using APIs like Groq for intelligent solutions.",
      icon: "🤖"
    }
  ];

  const stats = [
    { label: "Projects Built", value: "5+", color: "secondary", trend: "Production Grade" },
    { label: "DSA Solved", value: "300+", color: "accent", trend: "LeetCode/CodeChef" },
    { label: "LeetCode Rating", value: "1500+", color: "primary", trend: "Top 12% Global" },
    { label: "CodeChef Rating", value: "2★ (1417)", color: "primary", trend: "Consistent Performer" }
  ];

  const skills = [
    { skill: "React & Next.js", level: 5, delay: 0 },
    { skill: "Node.js & Express", level: 5, delay: 0.05 },
    { skill: "MongoDB & Redis", level: 5, delay: 0.1 },
    { skill: "TypeScript", level: 4, delay: 0.15 },
    { skill: "REST APIs", level: 5, delay: 0.2 },
    { skill: "Socket.IO", level: 4, delay: 0.25 },
    { skill: "AI/Groq APIs", level: 4, delay: 0.3 },
    { skill: "Cloud Deployment", level: 4, delay: 0.35 }
  ];

  return (
    <section id="about" className="py-12 md:py-24 relative z-10 overflow-hidden bg-background">
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <SectionHeading title="~/about-me" subtitle="A comprehensive profile showcasing my expertise, impact, and technical capabilities." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-8">
          {/* Bio Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <TerminalMockup title="profile.md" className="flex flex-col h-full w-full">
              <div className="space-y-4 font-mono text-xs sm:text-sm flex-1">
                <div>
                  <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                  <span className="text-foreground">whoami --detailed</span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted leading-relaxed space-y-3 pt-2"
                >
                  <p>
                    <span className="text-primary font-bold">▸ Name:</span> <span className="text-foreground font-semibold">Tushar Nagpal</span>
                  </p>
                  <p>
                    <span className="text-primary font-bold">▸ Role:</span> <span className="text-foreground">Full Stack Developer & Tech Leader</span>
                  </p>
                  <p>
                    <span className="text-primary font-bold">▸ Passion:</span> <span className="text-foreground">Building scalable applications with AI integration</span>
                  </p>
                  <p>
                    <span className="text-primary font-bold">▸ Expertise:</span> <span className="text-foreground">MERN Stack, Next.js, Cloud Architecture</span>
                  </p>
                  <p>
                    <span className="text-primary font-bold">▸ Currently:</span> <span className="text-foreground animate-pulse font-semibold">Building production-ready full-stack apps</span>
                  </p>
                </motion.div>

                <div className="pt-2 border-t border-primary/20">
                  <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                  <span className="cursor-blink text-primary">_</span>
                </div>
              </div>
            </TerminalMockup>

            {/* Bio Cards */}
            <div className="grid grid-cols-2 gap-3">
              {bioPoints.map((point, idx) => (
                <BioCard
                  key={idx}
                  {...point}
                  delay={0.1 + idx * 0.05}
                />
              ))}
            </div>
          </motion.div>

          {/* Stats & Skills Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <TerminalMockup title="metrics.sh" className="flex flex-col h-full w-full">
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div>
                  <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                  <span className="text-foreground">./fetch_metrics.sh --all</span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-muted text-xs leading-relaxed pt-2 pb-2 border-b border-primary/20"
                >
                  <span className="text-primary font-bold">→ compiling performance metrics</span>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {stats.map((stat, idx) => (
                    <StatItem key={idx} {...stat} delay={0.3 + idx * 0.08} />
                  ))}
                </div>
              </div>
            </TerminalMockup>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-primary/20 rounded-lg p-4 bg-card/20 hover:border-primary/60 hover:bg-primary/5 transition-all"
            >
              <h3 className="text-sm font-bold uppercase text-primary mb-4 flex items-center gap-2">
                <span>🔧</span> Core Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, idx) => (
                  <SkillBadge key={idx} {...s} />
                ))}
              </div>
            </motion.div>

            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="border border-green-500/30 rounded-lg p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 hover:from-green-500/15 hover:to-green-500/10 transition-all"
            >
              <p className="text-xs text-green-500/80 flex items-center gap-2 font-semibold">
                <span className="text-lg">✓</span> Status: Ready for Exciting Opportunities
              </p>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                Open to full-time roles, collaborations, and challenging projects that push technological boundaries.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
