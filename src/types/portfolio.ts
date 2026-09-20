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
