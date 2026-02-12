export type ToolMeta = {
  slug: string; // e.g. "constraint-tie-breaker"
  name: string; // display name
  oneLiner: string; // short description
  status?: "Probe" | "Candidate" | "Machine";
};

// Curated list ONLY (browser-safe).
// Add tools here when you ship them so:
// - sidebar renders
// - /tools index renders
// - sitemap auto-includes them (if you use TOOL_INDEX there)
export const TOOL_INDEX: ToolMeta[] = [
  {
    slug: "constraint-tie-breaker",
    name: "Constraint Tie-Breaker",
    oneLiner: "Choose between two options using one non-negotiable constraint.",
    status: "Probe",
  },
  {
    slug: "constraint-validity-check",
    name: "Constraint Validity Check",
    oneLiner: "Check if a constraint is structurally usable before deciding with it.",
    status: "Probe",
  },
  // Add new tools here as you ship them.
];
