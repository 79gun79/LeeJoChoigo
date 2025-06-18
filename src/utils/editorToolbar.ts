export const toolbarItemsByWidth: { [key: number]: string[][] } = {
  768: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
  ],
  540: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task'],
    ['image', 'link'],
    ['code', 'codeblock'],
  ],
  500: [
    ['bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol'],
    ['image', 'link'],
    ['code', 'codeblock'],
  ],
  450: [
    ['bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['image', 'link'],
    ['code', 'codeblock'],
  ],
  374: [
    ['bold', 'italic', 'strike'],
    ['hr'],
    ['image', 'link'],
    ['code', 'codeblock'],
  ],
  363: [
    ['bold', 'italic', 'strike'],
    ['image', 'link'],
    ['code', 'codeblock'],
  ],
  334: [
    ['bold', 'strike'],
    ['image', 'link'],
    ['code', 'codeblock'],
  ],
};

export const getToolbarItems = (width: number): string[][] => {
  if (width >= 541) return toolbarItemsByWidth[768];

  const sorted = Object.keys(toolbarItemsByWidth)
    .map(Number)
    .sort((a, b) => a - b);

  for (const maxWidth of sorted) {
    if (width <= maxWidth) {
      return toolbarItemsByWidth[maxWidth];
    }
  }

  return toolbarItemsByWidth[768];
};
