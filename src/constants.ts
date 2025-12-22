import type { Skill } from "./types"

export const SKILLS = {
  "github-actions": { title: "GitHub Actions", icon: "github-actions" },
  arch: { title: "Arch", icon: "arch" },
  astro: { title: "Astro", icon: "astro" },
  c: { title: "C", icon: "c" },
  chromadb: { title: "ChromaDB", icon: "chromadb" },
  clearml: { title: "ClearML", icon: "clearml" },
  cpp: { title: "C++", icon: "cpp" },
  django: { title: "Django", icon: "django" },
  docker: { title: "Docker", icon: "docker" },
  fastapi: { title: "FastAPI", icon: "fastapi" },
  gcloud: { title: "Google Cloud", icon: "gcloud" },
  git: { title: "Git", icon: "git" },
  gleam: { title: "Gleam", icon: "gleam" },
  go: { title: "Go", icon: "go" },
  graphql: { title: "GraphQL", icon: "graphql" },
  hardhat: { title: "Hardhat", icon: "hardhat" },
  haskell: { title: "Haskell", icon: "haskell" },
  huggingface: { title: "HuggingFace", icon: "huggingface" },
  java: { title: "Java", icon: "java" },
  javascript: { title: "JavaScript", icon: "javascript" },
  jenkins: { title: "Jenkins", icon: "jenkins" },
  kotlin: { title: "Kotlin", icon: "kotlin" },
  kubernetes: { title: "Kubernetes", icon: "kubernetes" },
  litellm: { title: "LiteLLM", icon: "litellm" },
  llamacpp: { title: "llama.cpp", icon: "llamacpp" },
  lua: { title: "Lua", icon: "lua" },
  mongodb: { title: "MondoDB", icon: "mongodb" },
  nextjs: { title: "Next.js", icon: "nextjs", color: "black" },
  nixos: { title: "NixOS", icon: "nixos" },
  numpy: { title: "Numpy", icon: "numpy" },
  ocaml: { title: "OCaml", icon: "ocaml" },
  openai: { title: "OpenAI", icon: "openai" },
  pandas: { title: "Pandas", icon: "pandas" },
  polars: { title: "Polars", icon: "polars" },
  postgresql: { title: "PostgreSQL", icon: "postgresql" },
  python: { title: "Python", icon: "python" },
  pytorch: { title: "Pytorch", icon: "pytorch" },
  qt: { title: "Qt", icon: "qt" },
  react: { title: "React", icon: "react" },
  rocq: { title: "Rocq", icon: "rocq" },
  rust: { title: "Rust", icon: "rust" },
  sklearn: { title: "Sklearn", icon: "sklearn" },
  solidity: { title: "Solidity", icon: "solidity" },
  spring: { title: "Spring", icon: "spring" },
  sql: { title: "SQL", icon: "postgresql" },
  tailwind: { title: "Tailwind", icon: "tailwind" },
  typescript: { title: "TypeScript", icon: "typescript" },
  vite: { title: "Vite", icon: "vite" },
} as const satisfies Dictionary<Skill>

export const LANGUAGE_SKILLS: Skill[] = [
  SKILLS["python"],
  SKILLS["java"],
  SKILLS["cpp"],
  SKILLS["go"],
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
  SKILLS["litellm"],
  SKILLS["numpy"],
  SKILLS["pandas"],
  SKILLS["polars"],
  SKILLS["sklearn"],
]

export const OPERATING_SYSTEM_SKILLS: Skill[] = [SKILLS["nixos"], SKILLS["arch"]]

export const PROGRAMMING_LANGUAGE_TIER_LIST: Dictionary<Skill[]> = {
  S: [SKILLS["haskell"], SKILLS["rust"]],
  A: [SKILLS["kotlin"], SKILLS["gleam"]],
  B: [SKILLS["python"], SKILLS["typescript"], SKILLS["ocaml"]],
  C: [SKILLS["c"], SKILLS["cpp"], SKILLS["go"], SKILLS["lua"], SKILLS["rocq"]],
  D: [SKILLS["java"], SKILLS["javascript"]],
}
