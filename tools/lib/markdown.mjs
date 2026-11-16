// Small Markdown helpers shared by the tools.

// The anchor GitHub generates for a heading.
export function githubAnchor(text) {
  return text
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, '')
    .replace(/ /g, '-');
}

export function parseHeadings(text) {
  const headings = [];
  const seen = new Map();
  let fence = null;
  text.split(/\r?\n/).forEach((line, index) => {
    const marker = line.match(/^ {0,3}(`{3,})/);
    if (marker) {
      if (fence === null) fence = marker[1].length;
      else if (marker[1].length >= fence) fence = null;
      return;
    }
    if (fence !== null) return;
    const m = line.match(/^(#{1,6}) (.+?)\s*$/);
    if (!m) return;
    const base = githubAnchor(m[2]);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    headings.push({ level: m[1].length, text: m[2], line: index + 1, anchor: count ? `${base}-${count}` : base });
  });
  return headings;
}

// Blanks out fenced code and inline code so that link checks only see real prose.
export function stripCode(lines, inCode) {
  return lines.map((line, index) => (inCode.has(index + 1) ? '' : line.replace(/`[^`]*`/g, '')));
}
