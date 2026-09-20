import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";

export interface TechSkill {
  id: string;
  name: string;
  orbitCategory: "Frontend" | "Backend" | "Languages" | "Tooling";
  positionAngle: number;
  logoColor: string;
  proofOfWork: string[];
}

const skills: TechSkill[] = [
  {
    id: "html-css",
    name: "HTML / CSS",
    orbitCategory: "Frontend",
    positionAngle: 0,
    logoColor: "#e34f26",
    proofOfWork: [
      "Responsive cross-device UI layouts",
      "Semantic HTML5 structures and accessibility",
      "Custom Tailwind design systems",
    ],
  },
  {
    id: "typescript",
    name: "TypeScript",
    orbitCategory: "Languages",
    positionAngle: 60,
    logoColor: "#3178c6",
    proofOfWork: [
      "Strict interfaces across components",
      "Type-safe state management",
      "Preventing runtime errors in complex flows",
    ],
  },
  {
    id: "git",
    name: "Git / GitHub",
    orbitCategory: "Tooling",
    positionAngle: 120,
    logoColor: "#f05032",
    proofOfWork: [
      "Automated GitHub Actions pipeline",
      "Version-controlled project delivery",
      "Vercel and Netlify deployments",
    ],
  },
  {
    id: "react-next",
    name: "React / Next.js",
    orbitCategory: "Frontend",
    positionAngle: 180,
    logoColor: "#61dafb",
    proofOfWork: [
      "Urban Eats review portal architecture",
      "Client-side rendering optimizations",
      "Vercel deployment workflow",
    ],
  },
  {
    id: "supabase",
    name: "Supabase / SQL",
    orbitCategory: "Backend",
    positionAngle: 240,
    logoColor: "#3ecf8e",
    proofOfWork: [
      "NexxtKadam auth and relational DB design",
      "Row Level Security configuration",
      "Real-time data synchronization",
    ],
  },
  {
    id: "javascript",
    name: "JavaScript",
    orbitCategory: "Languages",
    positionAngle: 300,
    logoColor: "#f7df1e",
    proofOfWork: [
      "ES6+ application architecture",
      "Optimized DOM navigation",
      "Client-side search and state",
    ],
  },
];

function TechLogo({ skill }: { skill: TechSkill }) {
  const commonProps = {
    viewBox: "0 0 32 32",
    className: "h-8 w-8",
    fill: "none",
    "aria-hidden": true,
  };

  if (skill.id === "typescript") {
    return (
      <svg {...commonProps} fill={skill.logoColor}>
        <rect width="32" height="32" rx="2" />
        <text x="5" y="23" fill="white" fontSize="14" fontWeight="800">
          TS
        </text>
      </svg>
    );
  }

  if (skill.id === "html-css") {
    return (
      <svg {...commonProps} fill={skill.logoColor}>
        <path d="M3 2h26l-2.3 25L16 30 5.3 27 3 2Zm21 7H8l.3 3h15.4l-.7 7.5-6 2-6-2-.3-3H7l.7 5.2L16 27l8.3-5.3L26 9h-2Z" />
        <text x="11" y="17" fill="white" fontSize="7" fontWeight="800">
          5
        </text>
      </svg>
    );
  }

  if (skill.id === "javascript") {
    return (
      <svg {...commonProps} fill={skill.logoColor}>
        <rect width="32" height="32" rx="2" />
        <text x="4" y="23" fill="#111827" fontSize="13" fontWeight="800">
          JS
        </text>
      </svg>
    );
  }

  if (skill.id === "react-next") {
    return (
      <svg {...commonProps} stroke={skill.logoColor} strokeWidth="2">
        <circle cx="16" cy="16" r="3" fill={skill.logoColor} />
        <ellipse cx="16" cy="16" rx="14" ry="5" />
        <ellipse cx="16" cy="16" rx="14" ry="5" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="14" ry="5" transform="rotate(120 16 16)" />
      </svg>
    );
  }

  if (skill.id === "supabase") {
    return (
      <svg {...commonProps} fill={skill.logoColor}>
        <path d="M18 2 5 17h9l-2 13 15-18h-9L18 2Z" />
      </svg>
    );
  }

  if (skill.id === "git") {
    return (
      <svg {...commonProps} fill={skill.logoColor}>
        <path d="m29 14-11-11a3 3 0 0 0-4 0l-3 3 5 5a3 3 0 0 1 3 3v5a3 3 0 1 1-2 0v-5a3 3 0 0 1-1-2l-5-5-8 8a3 3 0 0 0 0 4l11 11a3 3 0 0 0 4 0l11-11a3 3 0 0 0 0-4Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps} fill={skill.logoColor}>
      <path d="m4 3 2.5 25L16 31l9.5-3L28 3H4Zm17 8H11l.3 3h9.4l-.7 7.5-4 1.3-4-1.3-.3-2.5H9l.7 5L16 26l6.3-2 1-13Z" />
    </svg>
  );
}

const initialNodePositions = Object.fromEntries(
  skills.map((skill) => {
    const angle = (skill.positionAngle * Math.PI) / 180;
    return [
      skill.id,
      { left: 50 + Math.cos(angle) * 30, top: 50 + Math.sin(angle) * 30 },
    ];
  }),
) as Record<string, { left: number; top: number }>;

export const TechOrbital: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(
    skills[2],
  );
  const [isDragging, setIsDragging] = useState(false);
  const [nodePositions, setNodePositions] = useState(initialNodePositions);
  const [recoilOffsets, setRecoilOffsets] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const gravityVelocityRef = useRef<Record<string, { x: number; y: number }>>(
    Object.fromEntries(skills.map((skill) => [skill.id, { x: 0, y: 0 }])),
  );
  const radarRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    skillId: string;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    moved: boolean;
  } | null>(null);

  const updateDraggedNode = (clientX: number, clientY: number) => {
    const dragState = dragStateRef.current;
    const radar = radarRef.current;
    if (!dragState || !radar) return;

    const radarRect = radar.getBoundingClientRect();
    const left = Math.max(
      8,
      Math.min(
        92,
        ((clientX + dragState.offsetX - radarRect.left) / radarRect.width) *
          100,
      ),
    );
    const top = Math.max(
      8,
      Math.min(
        92,
        ((clientY + dragState.offsetY - radarRect.top) / radarRect.height) *
          100,
      ),
    );

    setNodePositions((positions) => ({
      ...positions,
      [dragState.skillId]: { left, top },
    }));
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>,
    skill: TechSkill,
  ) => {
    const elementRect = event.currentTarget.getBoundingClientRect();
    dragStateRef.current = {
      skillId: skill.id,
      pointerId: event.pointerId,
      offsetX: elementRect.left + elementRect.width / 2 - event.clientX,
      offsetY: elementRect.top + elementRect.height / 2 - event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
    };
    setRecoilOffsets((offsets) => ({ ...offsets, [skill.id]: { x: 0, y: 0 } }));
    event.currentTarget.setPointerCapture(event.pointerId);
    setSelectedSkill(skill);
    setIsDragging(true);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (dragState?.pointerId !== event.pointerId) return;
    if (!dragState.moved)
      setSelectedSkill(
        skills.find((skill) => skill.id === dragState.skillId) ?? null,
      );
    if (dragState.moved) {
      const directionX = dragState.lastX - dragState.startX;
      const directionY = dragState.lastY - dragState.startY;
      setRecoilOffsets((offsets) => ({
        ...offsets,
        [dragState.skillId]: {
          x: directionX === 0 ? 0 : directionX > 0 ? 8 : -8,
          y: directionY === 0 ? 0 : directionY > 0 ? 8 : -8,
        },
      }));
      window.setTimeout(() => {
        setRecoilOffsets((offsets) => ({
          ...offsets,
          [dragState.skillId]: { x: 0, y: 0 },
        }));
      }, 70);
    }
    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) return;

    let animationFrame = 0;
    const applyGravity = () => {
      setNodePositions((positions) => {
        const nextPositions = { ...positions };
        let hasMotion = false;

        skills.forEach((skill) => {
          const current = positions[skill.id];
          const anchor = initialNodePositions[skill.id];
          const velocity = gravityVelocityRef.current[skill.id];
          const distanceX = anchor.left - current.left;
          const distanceY = anchor.top - current.top;

          velocity.x = (velocity.x + distanceX * 0.0012) * 0.94;
          velocity.y = (velocity.y + distanceY * 0.0012) * 0.94;
          nextPositions[skill.id] = {
            left: current.left + velocity.x,
            top: current.top + velocity.y,
          };

          if (
            Math.abs(distanceX) > 0.02 ||
            Math.abs(distanceY) > 0.02 ||
            Math.abs(velocity.x) > 0.01 ||
            Math.abs(velocity.y) > 0.01
          ) {
            hasMotion = true;
          }
        });

        return hasMotion ? nextPositions : positions;
      });
      animationFrame = requestAnimationFrame(applyGravity);
    };

    animationFrame = requestAnimationFrame(applyGravity);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging]);

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-[#05668d]/20 bg-[#000009] px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-xl text-center">
          <p className="mt-2 text-xs text-gray-400">
            Drag nodes or click one to inspect proof of work.
          </p>
        </div>

        <div
          ref={radarRef}
          className="relative mx-auto flex aspect-square w-full max-w-[600px] items-center justify-center overflow-hidden rounded-3xl border border-[#05668d]/30 bg-[#000009]/80 p-6 backdrop-blur-xl"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#05668d_1px,transparent_1px)] opacity-20 [background-size:24px_24px]" />
          <div className="pointer-events-none absolute h-[45%] w-[45%] rounded-full border border-[#05668d]/30" />
          <div className="pointer-events-none absolute h-[68%] w-[68%] rounded-full border border-[#05668d]/25" />
          <div className="pointer-events-none absolute h-[90%] w-[90%] rounded-full border border-[#05668d]/20" />
          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              points={[...skills, skills[0]]
                .map((skill) => {
                  const position = nodePositions[skill.id];
                  return `${position.left},${position.top}`;
                })
                .join(" ")}
              fill="none"
              stroke="#16c172"
              strokeWidth="0.65"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.7"
            />
          </svg>

          <motion.div
            className={`relative flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-[#d7f36b] bg-[#07110f] text-center ring-1 ring-[#16c172]/60 transition-opacity ${isDragging ? "pointer-events-none z-0" : "z-20"}`}
            animate={{
              scale: [1, 1.04, 1],
              boxShadow: [
                "0 0 24px 4px rgba(22,193,114,0.35)",
                "0 0 58px 14px rgba(215,243,107,0.5)",
                "0 0 24px 4px rgba(22,193,114,0.35)",
              ],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#16c172]">
              Tech Stack
            </span>
            <h3 className="text-base font-black text-white">Trrishvin</h3>
          </motion.div>

          {skills.map((skill) => {
            const isSelected = selectedSkill?.id === skill.id;

            return (
              <motion.button
                key={skill.id}
                type="button"
                onPointerDown={(event) => handlePointerDown(event, skill)}
                onPointerMove={(event) => {
                  const dragState = dragStateRef.current;
                  if (dragState?.pointerId === event.pointerId) {
                    const distance = Math.hypot(
                      event.clientX - dragState.startX,
                      event.clientY - dragState.startY,
                    );
                    dragState.moved = dragState.moved || distance > 4;
                    dragState.lastX = event.clientX;
                    dragState.lastY = event.clientY;
                    updateDraggedNode(event.clientX, event.clientY);
                  }
                }}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onClick={() => setSelectedSkill(skill)}
                style={{
                  left: `${nodePositions[skill.id].left}%`,
                  top: `${nodePositions[skill.id].top}%`,
                  color: isSelected ? "#16c172" : "#d1d5db",
                  transform: `translate(-50%, -50%) translate(${recoilOffsets[skill.id]?.x ?? 0}px, ${recoilOffsets[skill.id]?.y ?? 0}px)`,
                }}
                className={`absolute z-30 flex touch-none select-none cursor-grab flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 backdrop-blur-md transition-[transform,colors] duration-300 active:cursor-grabbing sm:p-4 ${isSelected ? "border-[#16c172] bg-[#000009] shadow-[0_0_20px_rgba(22,193,114,0.3)]" : "border-[#05668d]/40 bg-[#000009]/90 hover:border-[#16c172]"}`}
                aria-label={`Inspect ${skill.name} proof of work`}
              >
                <div className="rounded-lg bg-[#05668d]/20 p-1.5">
                  <TechLogo skill={skill} />
                </div>
                <div className="text-center">
                  <h4 className="text-xs font-extrabold text-white">
                    {skill.name}
                  </h4>
                  <p className="font-mono text-[9px] uppercase text-gray-400">
                    {skill.orbitCategory}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mx-auto mt-8 max-w-4xl rounded-2xl border border-[#05668d]/40 bg-[#000009] p-6"
          >
            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-[#05668d]/20 hover:text-white"
              aria-label="Close details"
            >
              <X size={16} />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16c172]">
              PROOF OF WORK
            </span>
            <h3 className="mt-1 text-2xl font-black text-white">
              {selectedSkill.name}
            </h3>
            <p className="text-xs text-gray-400">
              {selectedSkill.orbitCategory} orbit
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {selectedSkill.proofOfWork.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#05668d]/30 bg-[#05668d]/10 p-4"
                >
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#16c172]" />
                  <p className="text-xs leading-snug text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
