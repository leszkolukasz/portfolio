// generateMarkdown.ts
import type { Skill } from "@/types"
import {
  LANGUAGE_SKILLS,
  WEB_SKILLS,
  MACHINE_LEARNING_SKILLS,
  OPERATING_SYSTEM_SKILLS,
} from "../../constants"
import { REPO_ICONS_URL } from "./constants"

function generateSkillRow(skills: Skill[]): string {
  const titles = skills.map((s) => s.title)
  const icons = skills.map(
    (s) =>
      `<img src="${REPO_ICONS_URL + s.icon}.svg" title="${s.title}" alt="${s.title}" width="55" height="55"/>`,
  )
  return `| ${titles.join(" | ")} |\n|${"---------|".repeat(skills.length)}\n| ${icons.join(" | ")} |`
}

const markdown = [
  "### Languages\n\n" + generateSkillRow(LANGUAGE_SKILLS),
  "### Web\n\n" + generateSkillRow(WEB_SKILLS),
  "### Machine Learning\n\n" + generateSkillRow(MACHINE_LEARNING_SKILLS),
  "### OS\n\n" + generateSkillRow(OPERATING_SYSTEM_SKILLS),
].join("\n\n")

console.log(markdown)
