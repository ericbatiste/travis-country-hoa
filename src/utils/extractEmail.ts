export const extractEmail = (rawEmail: string): string => {
  const emailMatch = rawEmail.match(/<(.+)>/);
  return emailMatch ? emailMatch[1].trim() : rawEmail.trim();
}