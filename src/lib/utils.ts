export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getGridCols(count: number): string {
  if (count <= 12) return "grid-cols-4 sm:grid-cols-6";
  if (count <= 20) return "grid-cols-5 sm:grid-cols-6";
  if (count <= 30) return "grid-cols-6 sm:grid-cols-8";
  if (count <= 40) return "grid-cols-7 sm:grid-cols-8";
  if (count <= 50) return "grid-cols-8 sm:grid-cols-10";
  return "grid-cols-10";
}
