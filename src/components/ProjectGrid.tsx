import React, { useState } from "react";
import type { Project, Category } from "../types/portfolio";
import { ChevronRight } from "lucide-react";

interface ProjectGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<Category>("all");

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.category === activeTab);

  const gridClassName =
    filteredProjects.length === 1
      ? "grid-cols-1"
      : filteredProjects.length === 2
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <section id="projects" className="py-20 px-6 border-t border-[#05668d]/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#16c172] mb-2">
              Portfolio
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Featured Work
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

        <div className={`grid ${gridClassName} gap-8`}>
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl border border-[#05668d]/40 hover:border-[#16c172] bg-[#000009] overflow-hidden transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
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
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold border border-[#05668d]/50 bg-[#05668d]/20 text-white hover:bg-[#16c172] hover:text-black hover:border-[#16c172] transition-all flex items-center justify-center gap-1.5"
                >
                  Case Study <ChevronRight size={14} />
                </button>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-lg border border-[#05668d]/50 bg-[#000009] text-gray-300 hover:text-white hover:border-[#16c172] transition-colors"
                  aria-label="GitHub Repo"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56v-2.1c-3.21.7-3.89-1.36-3.89-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.17-3.09-.12-.3-.51-1.51.11-3.14 0 0 .96-.31 3.14 1.17A10.9 10.9 0 0 1 12 6.7c.97 0 1.95.13 2.86.38 2.17-1.48 3.13-1.17 3.13-1.17.63 1.63.24 2.84.12 3.14.73.8 1.17 1.83 1.17 3.09 0 4.43-2.7 5.4-5.27 5.68.41.36.78 1.08.78 2.18v3.23c0 .31.2.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
