export type ToolMeta = {
  slug: string;         // e.g. "constraint-tie-breaker"
  name: string;         // display name
  oneLiner: string;     // short description
  status?: "Probe" | "Candidate" | "Machine"; // optional label
};

export const TOOL_INDEX: ToolMeta[] = [
  {
    slug: "constraint-tie-breaker",
    name: "Constraint Tie-Breaker",
    oneLiner: "Choose between two options using one non-negotiable constraint.",
    status: "Probe",
  },
  // Add new tools here as you ship them.
];
