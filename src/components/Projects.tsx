"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Terminal as TerminalIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import TerminalMockup from "./ui/TerminalMockup";

interface Project {
  title: string;
  slug: string;
  description: string;
  tech: string[];
  metrics: string;
  github: string;
  live: string;
}

const projects: Project[] = [
  {
    title: "VenueFlow Event Booking Platform",
    slug: "VenueFlow ",
    description:
      "A production-ready full stack event management and ticket booking platform that enables users to browse events, securely request bookings with email OTP verification, and track booking status. Features a comprehensive admin dashboard for event management, booking approvals, payment confirmation, and real-time analytics with role-based access control.",
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Nodemailer",
      "Tailwind CSS",
    ],
    metrics:
      "Built a secure booking workflow with OTP verification, role-based authentication, and real-time admin analytics.",
    github: "https://github.com/TusharNagpal-1/VenueFlow",
    live: "https://venue-flow-brown.vercel.app/",
  },
  {
    title: "OutReachIQ AI",
    slug: "OutReachIQ AI",
    description:
      "A production-ready AI-powered SaaS application that generates personalized, high-converting cold emails using the Groq AI API. Features secure JWT authentication, email history management, prompt engineering, and a scalable MERN architecture with a modern React interface.",
    tech: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Groq AI API",
      "Tailwind CSS",
    ],
    metrics: "Reduced cold email creation time by over 90% with AI-powered personalized generation.",
    github: "https://github.com/TusharNagpal-1/ai-cold-email-generator",
    live: "https://coldemail.tusharnagpal.com",
  },
  {
  title: "Moodify",
  slug: "Moodify",
  description:
    "A mood-based music player built with the MERN stack, featuring webcam-based facial-expression detection using face-api.js, mood identification, personalized song filtering, and an admin interface for managing songs and audio content.",
  tech: [
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "face-api.js",
    "Multer",
    "ImageKit"
  ],
  metrics:
    "Implemented facial-expression-based mood detection, mood-based song filtering, RESTful APIs for song management, and cloud-based audio storage.",
  github: "YOUR_GITHUB_LINK",
  live: "YOUR_LIVE_LINK",
},
  {
    title: "PayFlow",
    slug: "PayFlow",
    description:
      "A production-ready fintech backend inspired by modern UPI payment platforms, featuring secure JWT authentication, MPIN-based transaction security, wallet management, peer-to-peer transfers, utility bill payments, and scalable REST APIs built with the MERN stack.",
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcrypt",
      "Nodemailer",
    ],
    metrics:
      "Implemented secure wallet transfers, MPIN-protected transactions, and RESTful APIs for a scalable digital payment system.",
    github: "https://github.com/TusharNagpal-1/PhonePe-Backend-Project/tree/main",
    live: "https://payflow.tusharnagpal.com",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex h-full"
    >
      <TerminalMockup
        title={`projects/${project.slug}`}
        className="flex flex-col h-full bg-card/80 border border-border hover:border-primary/30 transition-colors"
      >
        <div className="flex flex-col h-full justify-between font-mono text-xs sm:text-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 select-none">
              <span className="text-primary font-bold">tushar@macbook:~$</span>
              <span className="text-foreground font-semibold">cat desc.txt</span>
            </div>
            <p className="text-muted leading-relaxed select-text">{project.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1.5 select-none">
              <span className="text-primary font-bold">tushar@macbook:~$</span>
              <span className="text-foreground font-semibold">./metrics --impact</span>
            </div>
            <div className="text-secondary font-bold select-text pb-1 flex items-center gap-1.5">
              <TerminalIcon size={12} className="text-secondary" />
              <span>{project.metrics}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 select-none">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-card/30 border border-border rounded text-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-auto select-none">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors text-xs font-semibold"
            >
              <Github size={14} />
              ./src_code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-muted hover:text-secondary transition-colors text-xs font-semibold"
            >
              <ExternalLink size={14} />
              ./run_demo
            </a>
          </div>
        </div>
      </TerminalMockup>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-24 relative z-10 bg-background">
      <div className="container px-4 mx-auto max-w-7xl">
        <SectionHeading title="~/projects" subtitle="Explore my build log showing real-world products and developer tools." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
