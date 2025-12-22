// generateTierList.ts
import type { Skill } from "@/types"
import { PROGRAMMING_LANGUAGE_TIER_LIST } from "../../constants"
import { REPO_ICONS_URL } from "./constants"

const TIER_COLORS: Record<string, string> = {
  S: "#ff7f7f",
  A: "#ffbf7f",
  B: "#ffdf7f",
  C: "#ffff7f",
  D: "#bfff7f",
}

function generateTierRow(tier: string, skills: Skill[]): string {
  const commonStyle = "padding:25px 30px;border-radius:3px;color:black"

  if (skills.length === 0)
    return `| <span style="background:${TIER_COLORS[tier]};${commonStyle}">${tier}</span> | |\n|---------|---------|`

  const icons = skills.map(
    (s) =>
      `<img src="${REPO_ICONS_URL + s.icon}.svg" title="${s.title}" alt="${s.title}" width="55" height="55"/>`,
  )
  return `| <span style="background:${TIER_COLORS[tier]};${commonStyle}">${tier}</span> | ${icons.join(" | ")} |\n|---------|${"---------|".repeat(skills.length)}`
}

const markdown = Object.entries(PROGRAMMING_LANGUAGE_TIER_LIST)
  .map(([tier, skills]) => generateTierRow(tier, skills))
  .join("\n\n")

console.log(markdown)
