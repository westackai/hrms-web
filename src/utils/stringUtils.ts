export function toTitleCase(str?: string | null) {
  if (!str) return ""; 
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
