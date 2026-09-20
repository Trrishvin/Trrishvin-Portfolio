import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  ArrowUpRight,
  Download,
  Mail,
  Send,
  Code,
  Database,
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Briefcase,
  Layers,
} from "lucide-react";
import { ProgressiveBlur } from "../components/motion-primitives/progressive-blur";
import { BorderTrail } from "../components/motion-primitives/border-trail";
import { GlowEffect } from "../components/motion-primitives/glow-effect";
import * as Popover from "../components/motion-primitives/morphing-popover";
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "../components/motion-primitives/morphing-dialog";
import { ScrollProgress } from "../components/motion-primitives/scroll-progress";
import { Tilt } from "../components/motion-primitives/tilt";
import { Dock, DockIcon, DockItem } from "../components/motion-primitives/dock";
import { InView } from "./components/ui/in-view";
import { TechOrbital } from "./components/TechOrbit.tsx";
import { motion } from "motion/react";
import { TextEffect } from "../components/motion-primitives/text-effect";
import { TextScramble } from "../components/motion-primitives/text-scramble";
import { TextShimmer } from "../components/motion-primitives/text-shimmer";

export type Category = "all" | "frontend" | "fullstack";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  demoUrl?: string;
  githubUrl: string;
  image: string;
}

export interface Experience {
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

type SocialPlatform = "github" | "linkedin";

function MagneticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <Tilt
      rotationFactor={4}
      springOptions={{ stiffness: 220, damping: 24 }}
      className="h-full"
    >
      <div className={`relative h-full overflow-hidden ${className}`}>
        <BorderTrail
          size={48}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="bg-[#d7f36b]"
        />
        {children}
      </div>
    </Tilt>
  );
}

function ScrambleOnView({ children }: { children: string }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = labelRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={labelRef}>
      <TextScramble
        key={isVisible ? `${children}-visible` : children}
        as="span"
        trigger={isVisible}
        duration={1.8}
        speed={0.045}
        className="inline-block text-[#16c172]"
      >
        {children}
      </TextScramble>
    </span>
  );
}
function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <MorphingDialog
      transition={{ type: "spring", stiffness: 240, damping: 25 }}
    >
      <MorphingDialogTrigger className="w-full">
        <span className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#05668d]/50 bg-[#05668d]/20 py-2.5 text-xs font-bold text-white transition-all hover:border-[#16c172] hover:bg-[#16c172] hover:text-black">
          Case Study <ChevronRight size={14} />
        </span>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative max-h-[90vh] w-[min(92vw,42rem)] overflow-y-auto rounded-2xl border border-[#05668d] bg-[#000009] p-6 text-left shadow-2xl sm:p-8">
          <MorphingDialogClose className="rounded-full p-2 text-gray-400 transition-colors hover:text-white">
            <X size={20} />
          </MorphingDialogClose>
          <MorphingDialogTitle className="pr-12 text-2xl font-bold text-white">
            {project.title}
          </MorphingDialogTitle>
          <MorphingDialogSubtitle className="mt-1 text-xs font-semibold text-[#16c172]">
            {project.subtitle}
          </MorphingDialogSubtitle>
          <MorphingDialogDescription className="mt-6 space-y-5 text-sm text-gray-300">
            <p>{project.longDescription}</p>
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#05668d]">
                Key Accomplishments
              </h4>
              <ul className="list-inside list-disc space-y-1 text-xs text-gray-300">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </MorphingDialogDescription>
          <div className="mt-6 flex items-center gap-4 border-t border-[#05668d]/30 pt-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-[#05668d] px-5 py-2.5 text-xs font-bold text-white transition-colors hover:border-[#16c172]"
            >
              <SocialLogo platform="github" className="h-3.5 w-3.5" /> View
              GitHub Repo
            </a>
          </div>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}

function SocialLogo({
  platform,
  className,
}: {
  platform: SocialPlatform;
  className?: string;
}) {
  const commonProps = {
    viewBox: "0 0 24 24",
    className,
    fill: "currentColor",
    "aria-hidden": true,
  };

  if (platform === "github") {
    return (
      <svg {...commonProps}>
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56v-2.1c-3.21.7-3.89-1.36-3.89-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.17-3.09-.12-.3-.51-1.51.11-3.14 0 0 .96-.31 3.14 1.17A10.9 10.9 0 0 1 12 6.7c.97 0 1.95.13 2.86.38 2.17-1.48 3.13-1.17 3.13-1.17.63 1.63.24 2.84.12 3.14.73.8 1.17 1.83 1.17 3.09 0 4.43-2.7 5.4-5.27 5.68.41.36.78 1.08.78 2.18v3.23c0 .31.2.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V8.999h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.606 0 4.27 2.373 4.27 5.456v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.123 2.062 2.062 0 0 1 0 4.123ZM3.555 20.452h3.558V8.999H3.555v11.453Z" />
    </svg>
  );
}

const techStackIcons = [
  {
    name: "JavaScript",
    color: "#f7df1e",
    path: "M0 0h24v24H0z M13.3 18.2c.5.9 1.1 1.5 2.1 1.5.9 0 1.5-.4 1.5-1 0-.7-.6-.9-1.6-1.4l-.5-.2c-1.5-.7-2.5-1.5-2.5-3.2 0-1.6 1.2-2.8 3.1-2.8 1.3 0 2.3.5 3 1.8l-1.6 1c-.4-.7-.8-1-1.4-1-.6 0-1 .4-1 .9 0 .6.4.8 1.4 1.3l.5.2c1.8.8 2.8 1.6 2.8 3.3 0 1.9-1.5 2.9-3.6 2.9-2 0-3.3-.9-4-2.2l1.8-1.1Zm-7.1.2c.4.7.8 1.3 1.7 1.3.8 0 1.3-.3 1.3-1.5v-4.8h2.1v4.8c0 2.2-1.3 3.2-3.3 3.2-1.8 0-2.8-.9-3.3-2l1.5-1Z",
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    path: "M1 1h22v22H1V1Zm11.7 15.8v2.1c.4.2 1.2.4 2 .4 2 0 3.2-1 3.2-2.7 0-1.4-.8-2.1-2.3-2.8l-.5-.2c-.7-.3-1-.6-1-.9 0-.4.3-.7 1-.7.7 0 1.3.3 1.7.5l.6-1.6c-.6-.3-1.4-.5-2.4-.5-1.8 0-3 .9-3 2.5 0 1.2.7 2 2.2 2.7l.5.2c.8.4 1.1.7 1.1 1.1 0 .5-.4.8-1.1.8-.8 0-1.5-.3-2-.7Zm-4.1-4.3v6.6h2v-6.6h2v-1.7H6.6v1.7h2Z",
  },
  {
    name: "React",
    color: "#61dafb",
    path: "M12 10.1c1.1 0 2 .9 2 1.9s-.9 1.9-2 1.9-2-.9-2-1.9.9-1.9 2-1.9Zm0-5.6c2.2 0 4.2.3 5.9.8 2.9.9 4.8 2.3 4.8 4 0 1.8-2.1 3.4-5.3 4.3-1.6.5-3.5.7-5.4.7s-3.8-.2-5.4-.7c-3.2-.9-5.3-2.5-5.3-4.3 0-1.7 1.9-3.1 4.8-4 1.7-.5 3.7-.8 5.9-.8Zm0 1.4c-2 0-3.8.3-5.4.7-2.3.7-3.7 1.6-3.7 2.7 0 1.1 1.6 2.2 4.1 2.9 1.5.4 3.2.6 5 .6s3.5-.2 5-.6c2.5-.7 4.1-1.8 4.1-2.9 0-1.1-1.4-2-3.7-2.7-1.6-.4-3.4-.7-5.4-.7Zm-4.8 8c1.1-1.9 2.2-3.5 3.5-4.8 2.1-2.1 4.2-3.2 5.8-2.3 1.5.9 1.7 3.4 1 6.6-.4 1.7-1.1 3.4-2 5-1 1.7-2.1 3.1-3.3 4.2-2.1 2-4.3 2.8-5.8 1.9-1.5-.9-1.5-2.8-.9-5.3.4-1.7 1-3.5 1.7-5.3Zm1.2.7c-.7 1.7-1.2 3.3-1.5 4.8-.5 2-.4 3.3.5 3.8.9.5 2.4-.3 4-1.9 1.1-1 2.1-2.4 3.1-4 .9-1.5 1.5-3.1 1.9-4.6.6-2.6.5-4.3-.4-4.8-.9-.5-2.5.4-4.1 2-1.2 1.2-2.4 2.8-3.5 4.7Z",
  },
  {
    name: "HTML5",
    color: "#e34f26",
    path: "M2 2h20l-1.8 20L12 24l-8.2-2L2 2Zm16.4 4H5.6l.3 2.4h12.2l-.4 4.4H8.5l.2 2.3h8.8l-.3 3.2-5.2 1.4-5.2-1.4-.3-2.2H4.4l.6 4 7 1.9 7-1.9L20.2 6h-1.8Z",
  },
  {
    name: "CSS3",
    color: "#1572b6",
    path: "M2 2h20l-1.8 20L12 24l-8.2-2L2 2Zm16.5 4H5.5l.3 2.4h12.4l-.3 2.5H6.1l.3 2.4h11.2l-.4 3.3-5.2 1.4-5.1-1.4-.2-1.9H4.4l.5 3.7 7.1 1.9 7-1.9L20.2 6h-1.7Z",
  },
  {
    name: "Python",
    color: "#3776ab",
    path: "M12 2c-5.3 0-5 2.3-5 2.3v2.4h5.1v.7H5c-4.7 0-4.5 4.1-4.5 4.1s-.3 4.1 4.4 4.1h1.5v-2.5s-.1-3 3-3h5.1s2.9 0 2.9-2.9V5.1S17.8 2 12 2Zm-2.8 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM12 22c5.3 0 5-2.3 5-2.3v-2.4h-5.1v-.7H19c4.7 0 4.5-4.1 4.5-4.1s.3-4.1-4.4-4.1h-1.5v2.5s.1 3-3 3H9.5s-2.9 0-2.9 2.9v2.2S6.2 22 12 22Zm2.8-1.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9Z",
  },
  {
    name: "Supabase",
    color: "#3ecf8e",
    path: "m13.3 2-9.8 11.5c-.5.6-.1 1.5.7 1.5h6.6L9.7 22c-.2.8.8 1.3 1.3.6l9.8-11.5c.5-.6.1-1.5-.7-1.5h-6.6L14.6 2c.2-.8-.8-1.3-1.3 0Z",
  },
  {
    name: "Git",
    color: "#f05032",
    path: "M21.6 11.1 12.9 2.4a1.4 1.4 0 0 0-1.9 0L9.1 4.3l2.4 2.4c.6-.2 1.3-.1 1.8.4.6.6.7 1.4.4 2l2.3 2.3c.6-.2 1.4-.1 1.9.5.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.6-.6-.7-1.4-.5-2l-2.2-2.2v5.8c.2.1.3.2.4.3.8.8.8 2.1 0 2.9-.8.8-2.1.8-2.9 0-.8-.8-.8-2.1 0-2.9.1-.1.3-.2.4-.3V10.4c-.1-.1-.3-.2-.4-.3-.6-.6-.7-1.4-.4-2L7 5.8l-4.6 4.6a1.4 1.4 0 0 0 0 1.9l8.7 8.7a1.4 1.4 0 0 0 1.9 0l8.6-8.6a1.4 1.4 0 0 0 0-1.9Z",
  },
  {
    name: "GitHub",
    color: "#f4f7f2",
    path: "M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56v-2.1c-3.21.7-3.89-1.36-3.89-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.17-3.09-.12-.3-.51-1.51.11-3.14 0 0 .96-.31 3.14 1.17A10.9 10.9 0 0 1 12 6.7c.97 0 1.95.13 2.86.38 2.17-1.48 3.13-1.17 3.13-1.17.63 1.63.24 2.84.12 3.14.73.8 1.17 1.83 1.17 3.09 0 4.43-2.7 5.4-5.27 5.68.41.36.78 1.08.78 2.18v3.23c0 .31.2.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
  },
  {
    name: "Vercel",
    color: "#f4f7f2",
    path: "M12 3 23 21H1L12 3Z",
  },
];

function TechStackMarquee() {
  const rows = [techStackIcons, [...techStackIcons].reverse()];

  return (
    <div className="relative mb-16 overflow-hidden border-y border-[#05668d]/30 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#000009] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#000009] to-transparent" />
      <div className="space-y-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 items-center gap-4 pr-4"
              animate={{ x: rowIndex === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{
                duration: rowIndex === 0 ? 28 : 32,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {[...row, ...row].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className="group flex h-16 w-44 shrink-0 items-center gap-3 rounded-xl border border-[#05668d]/30 bg-[#000009] px-4 text-gray-500 grayscale transition-colors hover:border-[#16c172]/70"
                  whileHover={{
                    scale: 1.08,
                    color: tech.color,
                    filter: "grayscale(0%)",
                  }}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                  title={tech.name}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 shrink-0"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={tech.path} />
                  </svg>
                  <span className="text-xs font-bold tracking-wide text-gray-400 transition-colors group-hover:text-white">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

void TechStackMarquee;

type SkillCategory = "Frontend" | "Backend" | "Languages";

interface SkillNode {
  name: string;
  category: SkillCategory;
  left: string;
  top: string;
  color: string;
  icon: React.ReactNode;
  proof: string[];
}

const skillNodes: SkillNode[] = [
  {
    name: "React",
    category: "Frontend",
    left: "18%",
    top: "25%",
    color: "#61dafb",
    icon: <Code size={20} />,
    proof: [
      "Built Urban Eats review portal",
      "Responsive component architecture",
      "Interactive filtering and rating UI",
    ],
  },
  {
    name: "HTML / CSS",
    category: "Frontend",
    left: "23%",
    top: "73%",
    color: "#e34f26",
    icon: <Layers size={20} />,
    proof: [
      "Designed responsive portfolio layouts",
      "Semantic HTML structure",
      "Motion-led visual polish",
    ],
  },
  {
    name: "Supabase",
    category: "Backend",
    left: "78%",
    top: "27%",
    color: "#3ecf8e",
    icon: <Database size={20} />,
    proof: [
      "Authentication and database integration",
      "Relational scholarship schema",
      "Secure data-driven workflows",
    ],
  },
  {
    name: "Git / GitHub",
    category: "Backend",
    left: "82%",
    top: "72%",
    color: "#f05032",
    icon: <Briefcase size={20} />,
    proof: [
      "Automated GitHub Actions pipeline",
      "Version-controlled project delivery",
      "Vercel and Netlify deployments",
    ],
  },
  {
    name: "JavaScript",
    category: "Languages",
    left: "50%",
    top: "10%",
    color: "#f7df1e",
    icon: <Code size={20} />,
    proof: [
      "ES6+ application architecture",
      "Optimized DOM navigation",
      "Client-side search and state",
    ],
  },
  {
    name: "TypeScript",
    category: "Languages",
    left: "50%",
    top: "88%",
    color: "#3178c6",
    icon: <Code size={20} />,
    proof: [
      "Typed React portfolio codebase",
      "Reusable component contracts",
      "Strict build validation",
    ],
  },
];

function SkillOrbitRadar() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | "All">(
    "All",
  );
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const radarRef = useRef<HTMLDivElement>(null);
  const categories: Array<SkillCategory | "All"> = [
    "All",
    "Frontend",
    "Backend",
    "Languages",
  ];
  const visibleNodes = skillNodes.filter(
    (node) => activeCategory === "All" || node.category === activeCategory,
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#05668d]/40 bg-[radial-gradient(circle_at_center,_rgba(22,193,114,0.12),_rgba(0,0,9,0.96)_58%)] p-4 shadow-2xl shadow-[#05668d]/10 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#16c172]">
            Skill network / live
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Drag a node or select a category to inspect the evidence.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter skill categories"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeCategory === category ? "border-[#16c172] bg-[#16c172] text-black" : "border-[#05668d]/40 bg-[#000009]/60 text-gray-400 hover:border-[#16c172] hover:text-white"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={radarRef}
        className="relative mx-auto aspect-square w-full max-w-3xl overflow-hidden rounded-2xl border border-[#05668d]/30 bg-[#000009]/70"
      >
        <div className="absolute inset-[12%] rounded-full border border-[#16c172]/20" />
        <div className="absolute inset-[27%] rounded-full border border-[#05668d]/30" />
        <div className="absolute inset-[42%] rounded-full border border-[#16c172]/20" />
        <div className="absolute left-1/2 top-1/2 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#05668d]/40 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-[82%] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-[#05668d]/40 to-transparent" />
        {Array.from({ length: 18 }, (_, index) => (
          <motion.span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-[#8de0b4]"
            style={{
              left: `${8 + ((index * 37) % 84)}%`,
              top: `${8 + ((index * 61) % 84)}%`,
            }}
            animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.7, 1.4, 0.7] }}
            transition={{
              duration: 2.8 + (index % 4) * 0.7,
              repeat: Infinity,
              delay: index * 0.16,
            }}
          />
        ))}
        <motion.button
          type="button"
          onClick={() => setSelectedNode(null)}
          className={`absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#d7f36b]/70 bg-[#07110f]/90 text-center shadow-[0_0_45px_rgba(215,243,107,0.24)] backdrop-blur-md transition-opacity sm:h-36 sm:w-36 ${isDragging ? "pointer-events-none z-0 opacity-60" : "z-20"}`}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Trrishvin Full-Stack Engineer core node"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7f36b]">
            Core node
          </span>
          <span className="mt-1 text-sm font-black text-white sm:text-base">
            Trrishvin
          </span>
          <span className="mt-1 text-[9px] text-[#8de0b4]">
            Full-Stack Engineer
          </span>
        </motion.button>
        {visibleNodes.map((node, index) => (
          <motion.button
            key={node.name}
            type="button"
            drag
            dragConstraints={radarRef}
            dragMomentum={false}
            dragElastic={0.08}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            whileDrag={{ scale: 1.12, zIndex: 30 }}
            whileHover={{ scale: 1.08, zIndex: 25 }}
            onClick={() => setSelectedNode(node)}
            className="absolute z-10 flex h-14 w-28 -translate-x-1/2 -translate-y-1/2 touch-none flex-col items-center justify-center rounded-2xl border border-[#05668d]/60 bg-[#07110f]/90 px-2 text-center shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:border-[#16c172]"
            style={{ left: node.left, top: node.top, color: node.color }}
            animate={{
              y: [0, index % 2 ? -7 : 7, 0],
              rotate: [0, index % 2 ? 1 : -1, 0],
            }}
            transition={{
              duration: 4 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18,
            }}
            aria-label={`Inspect ${node.name} proof of work`}
          >
            <span className="mb-1">{node.icon}</span>
            <span className="text-[10px] font-bold text-white">
              {node.name}
            </span>
            <span className="text-[8px] uppercase tracking-wider text-gray-500">
              {node.category}
            </span>
          </motion.button>
        ))}
      </div>
      {selectedNode && (
        <motion.aside
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mt-5 rounded-2xl border border-[#16c172]/40 bg-[#07110f]/90 p-5 shadow-xl backdrop-blur-xl"
          aria-live="polite"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#16c172]">
                Proof of Work
              </p>
              <h4 className="mt-1 text-xl font-black text-white">
                {selectedNode.name}
              </h4>
              <p className="mt-1 text-xs text-gray-400">
                {selectedNode.category} orbit
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="rounded-full border border-[#05668d]/50 p-2 text-gray-400 transition-colors hover:border-[#16c172] hover:text-white"
              aria-label="Close proof of work drawer"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {selectedNode.proof.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#05668d]/30 bg-[#000009]/60 p-3 text-xs leading-relaxed text-gray-300"
              >
                <span className="mb-2 block h-1.5 w-1.5 rounded-full bg-[#d7f36b]" />
                {item}
              </div>
            ))}
          </div>
        </motion.aside>
      )}
    </div>
  );
}

void SkillOrbitRadar;

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const surfaceClass = isDarkMode ? "bg-[#000009]" : "bg-[#F4F8FC]";
  const panelClass = isDarkMode
    ? "bg-[#000009] border-[#05668d]/30"
    : "bg-white border-slate-200";
  const primaryTextClass = isDarkMode ? "text-white" : "text-slate-900";
  const secondaryTextClass = isDarkMode ? "text-gray-300" : "text-slate-700";
  const mutedTextClass = isDarkMode ? "text-gray-400" : "text-slate-600";
  const navTextClass = isDarkMode ? "text-gray-300" : "text-slate-700";
  const softBorderClass = isDarkMode
    ? "border-[#05668d]/30"
    : "border-slate-200";

  // Form State
  const [formResult, setFormResult] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects: Project[] = [
    {
      id: "nexxtkadam",
      title: "NexxtKadam",
      subtitle: "Online Career Guidance Portal",
      category: "fullstack",
      description:
        "Full-stack career guidance portal designed to help underprivileged students explore career options and access scholarship information.",
      longDescription:
        "Engineered to bridge the career awareness gap for underprivileged students. Built with an optimized DOM navigation structure and Supabase backend integration for database management and secure authentication.",
      techStack: [
        "Vanilla JS (ES6+)",
        "Supabase Auth & DB",
        "Vercel",
        "GitHub Actions",
      ],
      highlights: [
        "Optimized DOM rendering for fast section transitions",
        "Configured relational schema for scholarship matching",
        "Automated deployment pipeline via GitHub Actions",
      ],
      demoUrl: "https://nexxtkadam.netlify.app/",
      githubUrl: "https://github.com/Trrishvin/NexxtKadam",
      image: "/project-images/nexxtkadam.png",
    },
    {
      id: "urban-eats",
      title: "Urban Eats",
      subtitle: "Food Review Portal",
      category: "frontend",
      description:
        "Interactive food review web application with structured review cards, filtering options, and archive layouts.",
      longDescription:
        "Designed to showcase local food spots with rich review UI, interactive rating breakdowns, and intuitive responsive grid structures.",
      techStack: [
        "React",
        "JavaScript (ES6+)",
        "CSS3 / Responsive Design",
        "Supabase",
      ],
      highlights: [
        "Interactive review card scoring system",
        "Responsive grid layout optimized for asset loading",
        "Fast client-side dynamic search filtering",
      ],
      demoUrl: "https://trrishvin.github.io/Urban_eats/",
      githubUrl: "https://github.com/Trrishvin/Urban_eats",
      image: "/project-images/urban-eats.png",
    },
  ];

  const experience: Experience[] = [
    {
      title: "Cyber Security Warrior",
      organization: "Quick Heal",
      period: "Sep 2025 – Feb 2026",
      description:
        "Delivered structured cybersecurity awareness sessions to diverse audiences as part of a large outreach initiative. Planned and led a mass awareness session that earned local newspaper coverage.",
      tags: ["Public Speaking", "Cyber Security", "Outreach"],
    },
    {
      title: "Secondary Data Researcher",
      organization: "Cloud Chemicals",
      period: "Jul 2025 – Aug 2025",
      description:
        "Researched, compiled, and organized technical industry information into structured formats for internal reporting.",
      tags: ["Data Analytics", "Research", "Reporting"],
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const projectGridClassName =
    filteredProjects.length === 1
      ? "grid-cols-1"
      : filteredProjects.length === 2
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormResult("Sending message...");

    const formData = new FormData(e.currentTarget);
    formData.append(
      "access_key",
      (import.meta.env.VITE_PUBLIC_WEB3FORMS_ACCESS_KEY as string).trim(),
    );

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setFormResult("Message sent successfully!");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormResult(data.message || "Failed to send message.");
      }
    } catch {
      setFormResult("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${
        isDarkMode
          ? "bg-[#000009] text-gray-100"
          : "bg-[#EBF2FA] text-slate-900"
      } min-h-screen font-sans transition-colors duration-300 selection:bg-[#16c172] selection:text-black`}
    >
      <ScrollProgress className="fixed left-0 right-0 top-0 z-[60] h-1 bg-[#d7f36b]" />
      {/* HEADER / NAVIGATION */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        layout
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? isDarkMode
              ? "bg-[#000009]/80 backdrop-blur-md border-b border-[#05668d]/30 py-3 shadow-xl"
              : "bg-[#EBF2FA]/80 backdrop-blur-md border-b border-gray-300 py-3 shadow-sm"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#top"
            className="text-2xl font-black tracking-wider flex items-center gap-2 group"
          >
            <span className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#05668d] to-[#16c172] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#16c172]/20 group-hover:scale-105 transition-transform">
              TB
            </span>
            <span className="font-extrabold tracking-tight">
              TRRISHVIN<span className="text-[#16c172]">.</span>
            </span>
          </a>

          <nav aria-label="Primary navigation" className="hidden md:block">
            <Dock
              magnification={112}
              distance={180}
              panelHeight={44}
              expandOnHover={false}
              className="gap-1 rounded-full border border-[#05668d]/30 bg-[#000009]/70 px-2 backdrop-blur-lg"
            >
              {["about", "projects", "experience", "skills", "contact"].map(
                (item) => (
                  <DockItem
                    key={item}
                    onClick={() => {
                      window.location.hash = item;
                    }}
                    className="min-w-[72px] rounded-full px-3 text-center text-sm font-medium capitalize text-gray-300 transition-colors hover:text-[#16c172]"
                  >
                    <DockIcon>
                      <span>{item}</span>
                    </DockIcon>
                  </DockItem>
                ),
              )}
            </Dock>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full border border-[#05668d]/40 hover:border-[#16c172] text-[#16c172] bg-[#05668d]/10 transition-all"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs uppercase tracking-wider bg-gradient-to-r from-[#05668d] to-[#16c172] text-white hover:opacity-90 shadow-lg shadow-[#05668d]/20 transition-all hover:-translate-y-0.5"
            >
              Let's Talk <ArrowUpRight size={16} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div
            className={`md:hidden px-6 pt-4 pb-6 border-b ${surfaceClass} ${softBorderClass}`}
          >
            <nav className="flex flex-col gap-4 text-center">
              {["about", "projects", "experience", "skills", "contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 ${navTextClass} hover:text-[#16c172] font-medium capitalize`}
                  >
                    {item}
                  </a>
                ),
              )}
            </nav>
          </div>
        )}
      </motion.header>

      {/* HERO SECTION */}
      <section id="top" className="relative pt-36 pb-24 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#05668d]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[#16c172]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#16c172]/30 bg-[#16c172]/10 text-[#16c172] text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#16c172] animate-pulse" />
              Third-Year B.Sc. IT Student • Full-Stack Builder
            </div>

            <InView
              once
              transition={{ duration: 0.8, ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                <TextShimmer
                  as="span"
                  duration={3.2}
                  spread={1.5}
                  className="[--base-color:#f4f7f2] [--base-gradient-color:#d7f36b]"
                >
                  Crafting Clean Code
                </TextShimmer>{" "}
                <br />
                <TextShimmer
                  as="span"
                  duration={3.2}
                  spread={1.5}
                  className="[--base-color:#8de0b4] [--base-gradient-color:#f4f7f2]"
                >
                  & Digital Solutions.
                </TextShimmer>
              </h1>
            </InView>

            <TextEffect
              as="p"
              per="word"
              preset="fade-in-blur"
              speedReveal={1.2}
              speedSegment={0.8}
              className={`text-base sm:text-lg max-w-2xl ${mutedTextClass} leading-relaxed`}
            >
              Hi, I'm Trrishvin Bharati. Third-year B.Sc. IT student based in
              Mira Road, Thane. Comfortable reasoning through data structures,
              clean JavaScript (ES6+), React, and Supabase.
            </TextEffect>

            <InView
              once
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#05668d] to-[#16c172] text-white hover:opacity-95 shadow-xl shadow-[#05668d]/20 transition-all hover:scale-[1.02]"
                >
                  Get In Touch
                </a>

                <button
                  onClick={() => setShowResumeModal(true)}
                  className={`px-7 py-3.5 rounded-xl font-bold text-sm border border-[#05668d]/50 ${
                    isDarkMode
                      ? "bg-[#000009] text-white"
                      : "bg-white text-slate-900"
                  } hover:border-[#16c172] flex items-center gap-2 transition-all hover:scale-[1.02]`}
                >
                  <Download size={16} /> View Resume
                </button>
              </div>
            </InView>

            <div className={`flex items-center gap-6 pt-4 ${mutedTextClass}`}>
              <a
                href="https://github.com/Trrishvin"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center w-12 h-12 rounded-full hover:opacity-80 transition-opacity ${isDarkMode ? "text-[#EBF2FA]" : "text-slate-900"}`}
                aria-label="GitHub Profile"
              >
                <SocialLogo platform="github" className="w-8 h-8" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center w-12 h-12 rounded-full hover:opacity-80 transition-opacity ${isDarkMode ? "text-[#EBF2FA]" : "text-slate-900"}`}
                aria-label="LinkedIn Profile"
              >
                <SocialLogo platform="linkedin" className="w-8 h-8" />
              </a>
              <a
                href="mailto:trrishvin120923@gmail.com"
                className={`flex items-center justify-center w-12 h-12 rounded-full hover:opacity-80 transition-opacity ${isDarkMode ? "text-[#EBF2FA]" : "text-slate-900"}`}
                aria-label="Email Direct"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <Tilt
              className="w-full max-w-sm"
              rotationFactor={7}
              springOptions={{ stiffness: 180, damping: 22 }}
            >
              <div className="relative group w-full max-w-sm">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#05668d] to-[#16c172] blur opacity-40 group-hover:opacity-75 transition duration-500" />
                <div className="relative rounded-3xl overflow-hidden p-3 border bg-[#000009] border-[#05668d]/40">
                  <img
                    src="/IMG-20260906-WA0013.jpg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "IMG-20260906-WA0013.jpg";
                    }}
                    alt="Trrishvin Bharati"
                    className="w-full h-96 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition duration-500"
                  />
                  <ProgressiveBlur
                    direction="bottom"
                    blurLayers={6}
                    blurIntensity={0.35}
                    className="pointer-events-none absolute inset-x-3 bottom-[4.5rem] h-24"
                  />
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-white">
                        Trrishvin Bharati
                      </h3>
                      <p className="text-xs text-[#16c172]">
                        Mira Road, Thane, Mumbai
                      </p>
                    </div>
                    <span className="p-2 rounded-lg bg-[#05668d]/20 text-[#16c172]">
                      <Code size={18} />
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-6 border-t border-[#05668d]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
              <ScrambleOnView>Background</ScrambleOnView>
            </h2>
            <h3
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              About Me
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MagneticCard
              className={`p-8 rounded-2xl border ${panelClass} hover:border-[#16c172] transition-all`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center mb-6">
                <BookOpen size={24} />
              </div>
              <h4 className={`text-xl font-bold mb-2 ${primaryTextClass}`}>
                Education
              </h4>
              <p className={`text-sm ${mutedTextClass} mb-4`}>
                TRCAC, Dahisar (2024 – Exp. 2027)
              </p>
              <p className={`text-sm ${secondaryTextClass} leading-relaxed`}>
                Third-Year B.Sc. IT student with a solid grasp of programming
                logic, data structures, and clean JavaScript (ES6+)
                architecture.
              </p>
            </MagneticCard>

            <MagneticCard
              className={`p-8 rounded-2xl border ${panelClass} hover:border-[#16c172] transition-all`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center mb-6">
                <Layers size={24} />
              </div>
              <h4 className={`text-xl font-bold mb-2 ${primaryTextClass}`}>
                Development Mindset
              </h4>
              <p className={`text-sm ${mutedTextClass} mb-4`}>
                Problem-First Approach
              </p>
              <p className={`text-sm ${secondaryTextClass} leading-relaxed`}>
                I enjoy solving real problems over sticking rigidly to a single
                stack. Experienced with AI-assisted workflows while
                double-checking generated logic.
              </p>
            </MagneticCard>

            <MagneticCard
              className={`p-8 rounded-2xl border ${panelClass} hover:border-[#16c172] transition-all`}
            >
              <div className="w-12 h-12 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <h4 className={`text-xl font-bold mb-2 ${primaryTextClass}`}>
                Achievements & Sports
              </h4>
              <p className={`text-sm ${mutedTextClass} mb-4`}>
                Discipline & Endurance
              </p>
              <p className={`text-sm ${secondaryTextClass} leading-relaxed`}>
                Completed the 10K Pargad Heritage Run (2023) and active player
                on the college volleyball team. Winner of multiple inter-school
                drawing competitions.
              </p>
            </MagneticCard>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="py-20 px-6 border-t border-[#05668d]/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
                <ScrambleOnView>Portfolio</ScrambleOnView>
              </h2>
              <h3
                className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Featured Projects
              </h3>
            </div>

            <div className="flex items-center gap-2 mt-6 md:mt-0 p-1.5 rounded-xl border border-[#05668d]/30 bg-[#000009]">
              {(["all", "frontend", "fullstack"] as Category[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-[#16c172] text-black shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "fullstack" ? "Full-Stack" : tab}
                </button>
              ))}
            </div>
          </div>

          <div className={`grid ${projectGridClassName} gap-8`}>
            {filteredProjects.map((project) => (
              <InView
                key={project.id}
                once
                transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="group rounded-2xl border border-[#05668d]/40 hover:border-[#16c172] bg-[#000009] overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between">
                  <div>
                    <div className="relative h-52 overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <span className="absolute top-4 right-4 bg-[#000009]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#16c172] border border-[#16c172]/30">
                        {project.category === "fullstack"
                          ? "Full-Stack"
                          : project.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h4 className="text-xl font-extrabold text-white mb-1 group-hover:text-[#16c172] transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-[#05668d] font-semibold mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-gray-400 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#05668d]/15 text-gray-300 border border-[#05668d]/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center gap-3">
                    <ProjectCaseStudy project={project} />
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 rounded-lg border border-[#05668d]/50 bg-[#000009] text-gray-300 hover:text-white hover:border-[#16c172] transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <SocialLogo platform="github" className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        className="py-20 px-6 border-t border-[#05668d]/20"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
              <ScrambleOnView>Timeline</ScrambleOnView>
            </h2>
            <h3
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Experience & Outreach
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {experience.map((item, idx) => (
              <InView
                key={idx}
                once
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                variants={{
                  hidden: { opacity: 0, x: -24 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <MagneticCard className="p-8 rounded-2xl border bg-[#000009] border-[#05668d]/30 hover:border-[#16c172] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm font-medium text-[#16c172]">
                        {item.organization}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#05668d]/20 text-[#EBF2FA] border border-[#05668d]/30 self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#000009] text-gray-400 border border-[#05668d]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </MagneticCard>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <div id="skills">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
              <ScrambleOnView>Proficiencies</ScrambleOnView>
            </h2>
            <h3
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Technical Stack
            </h3>
          </div>

          <TechOrbital />

          {false && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl border bg-[#000009] border-[#05668d]/30">
                <div className="text-[#16c172] mb-4">
                  <Code size={28} />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">Languages</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    JavaScript (ES6+)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#05668d]" />{" "}
                    Python
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border bg-[#000009] border-[#05668d]/30">
                <div className="text-[#16c172] mb-4">
                  <Layers size={28} />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">Frontend</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    React.js / Next.js
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    HTML5 & CSS3 Responsive Design
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    DOM Manipulation & State
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border bg-[#000009] border-[#05668d]/30">
                <div className="text-[#16c172] mb-4">
                  <Database size={28} />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">Databases</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    Supabase (Auth & DB Design)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    SQL Fundamentals
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#05668d]" />{" "}
                    Relational Data Modelling
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-2xl border bg-[#000009] border-[#05668d]/30">
                <div className="text-[#16c172] mb-4">
                  <Briefcase size={28} />
                </div>
                <h4 className="font-bold text-lg text-white mb-3">
                  Tools & Practices
                </h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    Git & GitHub Version Control
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    Vercel / Netlify Deployment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16c172]" />{" "}
                    AI-Assisted Workflows
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-20 px-6 border-t border-[#05668d]/20 relative"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
                  <ScrambleOnView>Connect</ScrambleOnView>
                </h2>
                <h3
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Get In Touch
                </h3>
                <p className={`text-sm ${mutedTextClass} leading-relaxed mb-8`}>
                  Open for software engineering opportunities, internships, or
                  collaboration. Send a message directly.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className={`text-xs ${mutedTextClass}`}>
                        Email Direct
                      </p>
                      <a
                        href="mailto:trrishvin120923@gmail.com"
                        className={`text-sm font-bold ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        } hover:text-[#16c172]`}
                      >
                        trrishvin120923@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#05668d]/20 text-[#16c172] flex items-center justify-center">
                      <ExternalLink size={18} />
                    </div>
                    <div>
                      <p className={`text-xs ${mutedTextClass}`}>Location</p>
                      <p
                        className={`text-sm font-bold ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Mira Road, Thane-401107, Mumbai
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-xs text-gray-400 mb-3">Profiles</p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/Trrishvin"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-14 h-14 rounded-xl border border-[#05668d]/30 ${isDarkMode ? "bg-[#000009] text-white" : "bg-white text-slate-900"} hover:border-[#16c172] transition-colors flex items-center justify-center`}
                    aria-label="GitHub Profile"
                  >
                    <SocialLogo platform="github" className="w-8 h-8" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`w-14 h-14 rounded-xl border border-[#05668d]/30 ${isDarkMode ? "bg-[#000009] text-white" : "bg-white text-slate-900"} hover:border-[#16c172] transition-colors flex items-center justify-center`}
                    aria-label="LinkedIn Profile"
                  >
                    <SocialLogo platform="linkedin" className="w-8 h-8" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Popover.MorphingPopover className="w-full justify-end">
                <Popover.MorphingPopoverTrigger className="w-full max-w-md rounded-2xl border border-[#05668d]/40 bg-[#000009] p-8 text-left text-white shadow-xl transition-colors hover:border-[#16c172]">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#16c172]">
                    Start a conversation
                  </span>
                  <span className="mt-3 block text-2xl font-extrabold">
                    Open Contact Form
                  </span>
                  <span className="mt-2 block text-sm text-gray-400">
                    Send a message about an opportunity or collaboration.
                  </span>
                </Popover.MorphingPopoverTrigger>
                <Popover.MorphingPopoverContent className="fixed inset-x-4 top-1/2 z-50 mx-auto max-h-[90vh] w-auto max-w-2xl -translate-y-1/2 overflow-y-auto rounded-2xl border border-[#05668d] bg-[#000009] p-2 text-white shadow-2xl sm:inset-x-auto sm:w-[min(92vw,42rem)]">
                  <InView
                    once
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <form
                      onSubmit={handleSubmitForm}
                      className="relative isolate overflow-hidden rounded-2xl border border-[#05668d]/40 bg-[#000009] p-8 space-y-6"
                    >
                      <GlowEffect
                        mode="breathe"
                        colors={["#05668d", "#16c172", "#d7f36b"]}
                        blur="strong"
                        duration={7}
                        scale={1.15}
                        className="opacity-20"
                      />
                      <div className="relative z-10 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                              YOUR NAME
                            </label>
                            <input
                              type="text"
                              name="name"
                              required
                              placeholder="Enter your name"
                              className="w-full px-4 py-3 rounded-xl bg-[#000009] border border-[#05668d]/40 text-sm text-white focus:outline-none focus:border-[#16c172] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2">
                              YOUR EMAIL
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              placeholder="Enter your email"
                              className="w-full px-4 py-3 rounded-xl bg-[#000009] border border-[#05668d]/40 text-sm text-white focus:outline-none focus:border-[#16c172] transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-400 mb-2">
                            YOUR MESSAGE
                          </label>
                          <textarea
                            name="message"
                            rows={5}
                            required
                            placeholder="Enter your message here..."
                            className="w-full px-4 py-3 rounded-xl bg-[#000009] border border-[#05668d]/40 text-sm text-white focus:outline-none focus:border-[#16c172] transition-colors"
                          ></textarea>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-gradient-to-r from-[#05668d] to-[#16c172] text-white hover:opacity-95 shadow-xl shadow-[#05668d]/20 transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? "Sending..." : "Submit Now"}{" "}
                          <Send size={16} />
                        </button>

                        {formResult && (
                          <p className="text-center text-xs font-semibold text-[#16c172]">
                            {formResult}
                          </p>
                        )}
                      </div>
                    </form>
                  </InView>
                </Popover.MorphingPopoverContent>
              </Popover.MorphingPopover>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-[#05668d]/20 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Trrishvin Bharati. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#about" className="hover:text-[#16c172] transition-colors">
              About
            </a>
            <a
              href="#projects"
              className="hover:text-[#16c172] transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="hover:text-[#16c172] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>

      {/* RESUME PREVIEW MODAL */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#000009] border border-[#05668d] rounded-2xl max-w-3xl w-full p-6 relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">
                Resume Details — Trrishvin Bharati
              </h3>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 rounded-full text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 min-h-0 bg-slate-900 rounded-xl p-6 sm:p-8 overflow-y-auto text-sm text-gray-300 border border-[#05668d]/30 space-y-6">
              <div>
                <h4 className="text-2xl font-bold text-white">
                  TRRISHVIN BHARATI
                </h4>
                <p className="text-[#16c172] font-medium mt-1">
                  Aspiring Software Engineer
                </p>
                <p className="text-gray-400 mt-1">
                  Mira Road, Thane-401107, Mumbai | trrishvin120923@gmail.com
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#16c172] uppercase tracking-wider mb-2">
                  Career Objective
                </h5>
                <p className="leading-relaxed">
                  Third-year B.Sc. IT student who enjoys solving real problems
                  more than sticking to one stack. Comfortable reasoning through
                  data structures and algorithms, writing clean JavaScript
                  (ES6+), React, and Supabase applications.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#16c172] uppercase tracking-wider mb-2">
                  Technical Skills
                </h5>
                <p className="leading-relaxed">
                  JavaScript (ES6+), TypeScript, React.js, Next.js, HTML5, CSS3,
                  DOM manipulation, Supabase, SQL fundamentals, Git, GitHub,
                  Vercel, Netlify, and AI-assisted workflows.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#16c172] uppercase tracking-wider mb-2">
                  Technical Projects
                </h5>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-white">
                      NexxtKadam - Online Career Guidance Portal
                    </p>
                    <p className="leading-relaxed">
                      Full-stack career guidance platform built with Vanilla JS
                      (ES6+) and Supabase to help students explore careers and
                      scholarship opportunities.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Urban Eats - Food Review Portal
                    </p>
                    <p className="leading-relaxed">
                      Responsive food review web application with structured
                      review cards, ratings, filtering, and archive layouts.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-[#16c172] uppercase tracking-wider mb-2">
                  Experience
                </h5>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-white">
                      Cyber Security Warrior - Quick Heal
                    </p>
                    <p className="text-gray-400">Sep 2025 - Feb 2026</p>
                    <p className="leading-relaxed">
                      Delivered cybersecurity awareness sessions to diverse
                      audiences as part of a large outreach initiative.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      Secondary Data Researcher - Cloud Chemicals
                    </p>
                    <p className="text-gray-400">Jul 2025 - Aug 2025</p>
                    <p className="leading-relaxed">
                      Researched and organized technical industry information
                      into structured formats for internal reporting.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-[#16c172] uppercase tracking-wider mb-2">
                  Education
                </h5>
                <p className="font-semibold text-white">
                  B.Sc. in Information Technology
                </p>
                <p>TRCAC, Dahisar | 2024 - Expected 2027</p>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <a
                href="/Trrishvin_Bharati_Resume_CMSS(1).pdf"
                download
                className="px-5 py-2 rounded-lg text-xs font-bold border border-[#05668d] text-white bg-[#05668d]/10 hover:border-[#16c172] hover:text-[#16c172] transition-colors flex items-center gap-2"
              >
                <Download size={14} /> Download PDF
              </a>
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-5 py-2 rounded-lg text-xs font-bold border border-gray-600 text-gray-300 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
