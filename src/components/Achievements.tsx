"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import TerminalMockup from "./ui/TerminalMockup";
import { Star, Award, Activity } from "lucide-react";

interface Achievement {
  title: string;
  slug: string;
  description: string;
  icon: ReactNode;
  status: string;
  color: string;
}

const achievements: Achievement[] = [
  {
    title: "LeetCode 1500+ Rating",
    slug: "leetcode_rating.log",
    description: "Top 12% globally, solving complex algorithmic challenges and participating in weekly contests.",
    icon: <Star className="text-yellow-400" size={20} />,
    status: "TOP_12_PERCENT_GLOBALLY",
    color: "text-yellow-400",
  },
  {
    title: "CodeChef 1417 Rating",
    slug: "codechef_rating.log",
    description: "Consistent performer in Division 3 competitive programming contests, demonstrating strong problem-solving logic.",
    icon: <Award className="text-amber-500" size={20} />,
    status: "DIV_3_COMPETITOR",
    color: "text-amber-500",
  },
  {
    title: "300+ DSA Problems Solved",
    slug: "dsa_solved.log",
    description: "Mastered core data structures and algorithms across arrays, dynamic programming, graphs, and trees.",
    icon: <Activity className="text-emerald-400" size={20} />,
    status: "CORE_DSA_MASTERED",
    color: "text-emerald-400",
  },
];

function AchievementCard({ achievement, index }: { achievement: Achievement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex h-full"
    >
      <TerminalMockup 
        title={`achievements/${achievement.slug}`} 
        className="flex flex-col h-full bg-card/80 border border-border hover:border-primary/30 transition-colors"
      >
        <div className="flex flex-col h-full justify-between font-mono text-xs sm:text-sm space-y-4">
          <div>
            {/* Command */}
            <div className="flex items-center gap-2 mb-2 select-none">
              <span className="text-primary font-bold">tushar@macbook:~$</span>
              <span className="text-foreground font-semibold">cat {achievement.slug}</span>
            </div>

            {/* Title & Icon */}
            <div className="flex items-center gap-2 font-bold text-foreground text-sm py-1">
              {achievement.icon}
              <span>{achievement.title}</span>
            </div>

            {/* Description */}
            <p className="text-muted leading-relaxed mt-2 select-text">
              {achievement.description}
            </p>
          </div>

          {/* Status Badge */}
          <div className="pt-3 border-t border-border/50 mt-auto flex items-center justify-between select-none">
            <span className="text-muted text-[10px]">SYSTEM_STATUS:</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-card/30 border border-border ${achievement.color}`}>
              {achievement.status}
            </span>
          </div>
        </div>
      </TerminalMockup>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="py-12 md:py-24 relative z-10 bg-card/30">
      <div className="container px-4 mx-auto max-w-7xl">
        <SectionHeading title="~/achievements" subtitle="A testament to my algorithmic problem-solving capabilities." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard key={achievement.title} achievement={achievement} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
