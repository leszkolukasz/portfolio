import type { Skill } from "./types"

export const SKILLS = {
  python: { title: "Python", icon: "python" },
  react: { title: "React", icon: "react" },
  typescript: { title: "TypeScript", icon: "typescript" },
  solidity: { title: "Solidity", icon: "solidity" },
  tailwind: { title: "Tailwind", icon: "tailwind" },
  postgresql: { title: "PostgreSQL", icon: "postgresql" },
  graphql: { title: "GraphQL", icon: "graphql" },
  chromadb: { title: "ChromaDB", icon: "chromadb" },
  vite: { title: "Vite", icon: "vite" },
  nextjs: { title: "Next.js", icon: "nextjs", color: "black" },
  hardhat: { title: "Hardhat", icon: "hardhat" },
  pytorch: { title: "Pytorch", icon: "pytorch" },
  fastapi: { title: "FastAPI", icon: "fastapi" },
  huggingface: { title: "HuggingFace", icon: "huggingface" },
  docker: { title: "Docker", icon: "docker" },
  java: { title: "Java", icon: "java" },
  kotlin: { title: "Kotlin", icon: "kotlin" },
  spring: { title: "Spring", icon: "spring" },
  jenkins: { title: "Jenkins", icon: "jenkins" },
  mongodb: { title: "MondoDB", icon: "mongodb" },
  "github-actions": { title: "GitHub Actions", icon: "github-actions" },
  kubernetes: { title: "Kubernetes", icon: "kubernetes" },
  cpp: { title: "C++", icon: "cpp" },
  rust: { title: "Rust", icon: "rust" },
  haskell: { title: "Haskell", icon: "haskell" },
  ocaml: { title: "OCaml", icon: "ocaml" },
  rocq: { title: "Rocq", icon: "rocq" },
  sql: { title: "SQL", icon: "postgresql" },
  django: { title: "Django", icon: "django" },
  astro: { title: "Astro", icon: "astro" },
  qt: { title: "Qt", icon: "qt" },
  llamacpp: { title: "llama.cpp", icon: "llamacpp" },
  clearml: { title: "ClearML", icon: "clearml" },
  numpy: { title: "Numpy", icon: "numpy" },
  pandas: { title: "Pandas", icon: "pandas" },
  polars: { title: "Polars", icon: "polars" },
  sklearn: { title: "Sklearn", icon: "sklearn" },
  git: { title: "Git", icon: "git" },
  nixos: { title: "NixOS", icon: "nixos" },
  arch: { title: "Arch", icon: "arch" },
} as const satisfies Dictionary<Skill>

export const LANGUAGE_SKILLS: Skill[] = [
  SKILLS["python"],
  SKILLS["java"],
  SKILLS["cpp"],
  SKILLS["rust"],
  SKILLS["typescript"],
  SKILLS["haskell"],
  SKILLS["ocaml"],
  SKILLS["sql"],
]

export const WEB_SKILLS: Skill[] = [
  SKILLS["django"],
  SKILLS["fastapi"],
  SKILLS["spring"],
  SKILLS["react"],
  SKILLS["nextjs"],
  SKILLS["astro"],
]

export const MACHINE_LEARNING_SKILLS: Skill[] = [
  SKILLS["pytorch"],
  SKILLS["llamacpp"],
  SKILLS["clearml"],
  SKILLS["numpy"],
  SKILLS["pandas"],
  SKILLS["polars"],
  SKILLS["sklearn"],
]

export const OPERATING_SYSTEM_SKILLS: Skill[] = [SKILLS["nixos"], SKILLS["arch"]]
