export function previewMarkdown(markdown: string) {
  return markdown
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/[`*_>#~\-]/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\n/g, ' ')
    .trim();
}
