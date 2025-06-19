export function previewMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[-*+]\s+\[[xX ]\]/g, '')
    .replace(/^\s*>+\s?/gm, '')
    .replace(/^\s*[*\-+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/^\|(.+\|)+$/gm, '')
    .replace(/^\s*\|?(?:\s*:?-+:?\s*\|)+\s*$/gm, '')
    .replace(/-{3,}/g, '')
    .replace(/\|/g, '')
    .replace(/[*_~#>`]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
