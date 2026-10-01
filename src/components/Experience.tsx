"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TerminalMockup from "./ui/TerminalMockup";

interface ExperienceEntryProps {
  title: string;
  role: string;
  duration: string;
  description: string[];
  tags?: string[];
  isLatest?: boolean;
  index?: number;
}

const ExperienceEntry = ({ 
  title, 
  role, 
  duration, 
  description, 
  tags = [],
  isLatest = false,
  index = 0 
}: ExperienceEntryProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ x: 8 }}
    className="flex items-start gap-3 group"
  >
    <span className={`text-lg font-bold select-none transition-all ${isLatest ? 'text-primary' : 'text-muted group-hover:text-primary'}`}>
      ★
    </span>
    <div className="space-y-2 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`font-bold text-sm transition-all ${isLatest ? 'text-amber-400' : 'text-amber-500/70'}`}>
          {title}
        </span>
        {isLatest && <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-semibold animate-pulse">CURRENT</span>}
        <span className={`text-xs font-semibold select-none ${isLatest ? 'text-cyan-400' : 'text-muted'}`}>
          {duration}
        </span>
      </div>
      
      <div className={`text-sm font-bold uppercase transition-colors ${isLatest ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'}`}>
        {role}
      </div>

      <div className="space-y-1.5 pl-3 border-l-2 border-primary/30 group-hover:border-primary/60 transition-colors">
        {Array.isArray(description) ? (
          description.map((desc, i) => (
            <p key={i} className="text-muted group-hover:text-muted/80 text-xs leading-relaxed transition-colors">
              ✦ {desc}
            </p>
          ))
        ) : (
          <p className="text-muted group-hover:text-muted/80 text-xs leading-relaxed transition-colors">
            ✦ {description}
          </p>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2 + i * 0.05 }}
              className="px-2 py-1 text-xs rounded-md bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/30 font-medium hover:border-primary/60 transition-all"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

export default function Experience() {
  const experiences = [
    {
  title: "Moodify",
  role: "CampusSutras (Full-Stack Developer) — Remote",
  duration: "15 Jun 2026 - 15 Jul 2026",
  description: [
    "Developed a mood-based music player using React.js, Node.js, Express.js and MongoDB, integrating face-api.js for webcam-based facial-expression detection and mood identification.",
    "Developed RESTful APIs for song retrieval and upload; implemented multipart audio-file handling using Multer, cloud storage with ImageKit, and persistent song metadata using MongoDB/Mongoose.",
    "Implemented mood-based song filtering and an admin interface for adding songs with title, artist, mood and audio file, while maintaining a modular frontend/backend project structure."
  ],
  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "face-api.js", "Multer", "ImageKit"],
  isLatest: true
},
    {
      title: "commit e466cf3",
      role: "Program Chair — IEEE Computer Society",
      duration: "2023 - Present",
      description: [
        "Lead a team of 15+ members to organize technical workshops, hackathons, and coding contests.",
        "Mentored junior developers in web engineering and competitive programming.",
        "Managed 50+ workshops participants and coordinated with industry professionals."
      ],
      tags: ["Leadership", "Mentoring", "Team Management", "Technical Workshops"],
      isLatest: false
    },
   
    {
      title: "commit 0609087",
      role: "B.Tech Computer Science & Engineering",
      duration: "2022 - Present",
      description: [
        "Pursuing Bachelor's degree with focus on Data Structures, Algorithms, OOP, DBMS, and Operating Systems.",
        "Building production-ready software projects and applying academic knowledge to real-world applications."
      ],
      tags: ["DSA", "DBMS", "Operating Systems", "CS Fundamentals"],
      isLatest: false
    }
  ];

  return (
    <section id="experience" className="py-12 md:py-24 relative z-10 w-full overflow-hidden bg-background">
      <div className="container px-4 mx-auto max-w-4xl">
        <SectionHeading title="~/experience" subtitle="Professional journey & contributions formatted as an interactive timeline." />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-8"
        >
          <TerminalMockup title="career_timeline.sh" className="max-w-3xl mx-auto">
            <div className="space-y-4 font-mono text-xs sm:text-sm">
              {/* CLI Command */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                <span className="text-foreground">cat professional_journey.txt</span>
              </motion.div>

              {/* Experience Timeline */}
              <div className="space-y-5 leading-relaxed pt-4 pb-2">
                {experiences.map((exp, idx) => (
                  <ExperienceEntry key={idx} {...exp} index={idx} />
                ))}
              </div>

              {/* Stats Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-t border-primary/20 pt-4 mt-4 grid grid-cols-3 gap-3 text-center"
              >
                <div className="group hover:bg-primary/10 p-2 rounded transition-colors">
                  <p className="text-lg font-bold text-primary">50+</p>
                  <p className="text-xs text-muted group-hover:text-foreground/70 transition-colors">Developers Mentored</p>
                </div>
                <div className="group hover:bg-primary/10 p-2 rounded transition-colors">
                  <p className="text-lg font-bold text-primary">15+</p>
                  <p className="text-xs text-muted group-hover:text-foreground/70 transition-colors">Team Members Led</p>
                </div>
                <div className="group hover:bg-primary/10 p-2 rounded transition-colors">
                  <p className="text-lg font-bold text-primary">10+</p>
                  <p className="text-xs text-muted group-hover:text-foreground/70 transition-colors">Production Apps</p>
                </div>
              </motion.div>

              {/* CLI Waiting State */}
              <div className="pt-4 border-t border-primary/20">
                <span className="text-primary font-bold">tushar@macbook:~$</span>{" "}
                <span className="cursor-blink text-primary">_</span>
              </div>

            </div>
          </TerminalMockup>
        </motion.div>
      </div>
    </section>
  );
}
