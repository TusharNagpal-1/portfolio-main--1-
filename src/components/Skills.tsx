"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TerminalMockup from "./ui/TerminalMockup";
import { Folder } from "lucide-react";
import { 
  SiCplusplus, SiPython, SiJavascript, SiTypescript, SiPostgresql,
  SiReact, SiNextdotjs, SiTailwindcss, SiFramer, SiHtml5,
  SiNodedotjs, SiExpress, SiMongodb, SiPrisma, SiGit, SiGithub,
  SiDocker, SiPostman, SiVercel
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";

const skillCategories = [
  {
    title: "languages",
    displayTitle: "Languages",
    skills: [
      { name: "C++", icon: SiCplusplus, color: "#00599C", size: "12KB", perm: "-rw-r--r--" },
      { name: "Python", icon: SiPython, color: "#3776AB", size: "8.5KB", perm: "-rw-r--r--" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", size: "14KB", perm: "-rwxr-xr-x" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", size: "16KB", perm: "-rwxr-xr-x" },
      { name: "SQL", icon: FaDatabase, color: "#4479A1", size: "6.2KB", perm: "-rw-r--r--" },
    ],
    color: "text-blue-400",
  },
  {
    title: "frontend",
    displayTitle: "Frontend",
    skills: [
      { name: "React.js", icon: SiReact, color: "#61DAFB", size: "28KB", perm: "-rwxr-xr-x" },
      { name: "Next.js", icon: SiNextdotjs, color: "#E2E8F0", size: "32KB", perm: "-rwxr-xr-x" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", size: "12KB", perm: "-rw-r--r--" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF", size: "18KB", perm: "-rw-r--r--" },
      { name: "HTML/CSS", icon: SiHtml5, color: "#E34F26", size: "10KB", perm: "-rw-r--r--" },
    ],
    color: "text-cyan-400",
  },
  {
    title: "backend",
    displayTitle: "Backend",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", size: "24KB", perm: "-rwxr-xr-x" },
      { name: "Express.js", icon: SiExpress, color: "#E2E8F0", size: "16KB", perm: "-rwxr-xr-x" },
      { name: "Next.js APIs", icon: SiNextdotjs, color: "#E2E8F0", size: "20KB", perm: "-rwxr-xr-x" },
      { name: "REST APIs", icon: FaDatabase, color: "#6DB33F", size: "14KB", perm: "-rw-r--r--" },
    ],
    color: "text-green-400",
  },
  {
    title: "databases",
    displayTitle: "Databases",
    skills: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", size: "18KB", perm: "-rw-r--r--" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", size: "22KB", perm: "-rw-r--r--" },
      { name: "Prisma ORM", icon: SiPrisma, color: "#E2E8F0", size: "12KB", perm: "-rw-r--r--" },
      { name: "Mongoose", icon: SiMongodb, color: "#880000", size: "10KB", perm: "-rw-r--r--" }, 
    ],
    color: "text-purple-400",
  },
  {
    title: "devops",
    displayTitle: "Tools & DevOps",
    skills: [
      { name: "Git", icon: SiGit, color: "#F05032", size: "6KB", perm: "-rwxr-xr-x" },
      { name: "GitHub", icon: SiGithub, color: "#E2E8F0", size: "8KB", perm: "-rw-r--r--" },
      { name: "Docker", icon: SiDocker, color: "#2496ED", size: "20KB", perm: "-rwxr-xr-x" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37", size: "12KB", perm: "-rw-r--r--" },
      { name: "Vercel", icon: SiVercel, color: "#E2E8F0", size: "8KB", perm: "-rw-r--r--" },
    ],
    color: "text-orange-400",
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-12 md:py-24 relative z-10 bg-card/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <SectionHeading title="~/skills" subtitle="Explore my developer stack using the interactive folder explorer." />

        <TerminalMockup title="skills_navigator.py" className="max-w-5xl mx-auto">
          <div className="space-y-4 font-mono text-xs sm:text-sm">
            
            {/* Command Entry */}
            <div>
              <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
              <span className="text-foreground">cd skills/ && ls -la</span>
            </div>

            {/* Folder Explorer Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border border-border p-4 rounded bg-card/60">
              
              {/* Directory Navigator (Left Col) */}
              <div className="md:col-span-4 border-r border-border/50 pr-4 space-y-2">
                <div className="text-muted text-xs pb-1 select-none border-b border-border/50 uppercase tracking-wider">
                  Directories
                </div>
                
                <div className="space-y-1.5">
                  {skillCategories.map((category, idx) => (
                    <button
                      key={category.title}
                      onClick={() => setActiveTab(idx)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left border transition-all ${
                        activeTab === idx
                          ? "bg-primary/10 border-primary/30 text-primary font-bold"
                          : "bg-transparent border-transparent text-muted hover:text-foreground hover:bg-card/30"
                      }`}
                    >
                      <Folder size={14} className={activeTab === idx ? "text-primary" : "text-muted"} />
                      <span>{category.title}/</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Directory Contents Listing (Right Col) */}
              <div className="md:col-span-8 flex flex-col justify-between min-h-[220px]">
                <div>
                  <div className="text-muted text-xs pb-1 select-none border-b border-border/50 flex justify-between uppercase tracking-wider">
                    <span>Contents: ~/skills/{skillCategories[activeTab].title}</span>
                    <span className="text-secondary select-none">ls -la</span>
                  </div>

                  <div className="pt-3 space-y-2.5 overflow-y-auto max-h-[280px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-2"
                      >
                        {skillCategories[activeTab].skills.map((skill) => {
                          const Icon = skill.icon;
                          return (
                            <div 
                              key={skill.name} 
                              className="flex items-center justify-between py-1 border-b border-border/50 hover:bg-card/30 px-2 rounded group transition-all"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-muted select-none text-[10px] sm:text-xs">
                                  {skill.perm}
                                </span>
                                <span className="text-muted select-none text-[10px] sm:text-xs min-w-[35px] text-right">
                                  {skill.size}
                                </span>
                                <div className="flex items-center gap-2 font-semibold text-foreground group-hover:text-primary transition-colors">
                                  <Icon size={14} color={skill.color || "currentColor"} />
                                  <span>{skill.name}</span>
                                </div>
                              </div>
                              <span className="text-[10px] font-mono text-muted group-hover:text-secondary transition-colors">
                                [source_file]
                              </span>
                            </div>
                          );
                        })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 text-[10px] text-muted select-none flex justify-between items-center">
                  <span>Total {skillCategories[activeTab].skills.length} files</span>
                  <span className="text-primary font-bold">STATUS: OK</span>
                </div>

              </div>
            </div>

            {/* Waiting prompt */}
            <div>
              <span className="text-primary font-bold">tushar@macbook:~/skills$</span>{" "}
              <span className="cursor-blink text-primary">_</span>
            </div>

          </div>
        </TerminalMockup>
      </div>
    </section>
  );
}
