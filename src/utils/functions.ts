export function removeConsecutiveSpaces(str: string): string {
  return str.replace(/\s+/g, " ");
}
export function removeConsecutiveHypens(str: string): string {
  return str.replace(/-+/g, "-");
}
