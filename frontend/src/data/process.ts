// Step numbers are rendered as "01"–"05"; titles and descriptions live in
// the locale files under `process.steps.<id>`.
export const processSteps = [
  { id: "understand", number: "01" },
  { id: "architect", number: "02" },
  { id: "build", number: "03" },
  { id: "deploy", number: "04" },
  { id: "evolve", number: "05" },
] as const;
