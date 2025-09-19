export function unwrapPastedMarkdown(input: string): string {
  if (!input) return input;

  const s = input.replace(/\r\n?/g, '\n');

  const openRe = /(^|\n)[ \t]*```(\w+)?[ \t]*\n/;
  const open = openRe.exec(s);
  if (!open) return s;

  const lang = (open[2] || '').toLowerCase();
  if (!/^(md|markdown|mkd|mdown)$/.test(lang)) return s;

  const contentStart = open.index + open[0].length;

  const closeRe = /(^|\n)[ \t]*```[ \t]*(?=\n|$)/g;
  closeRe.lastIndex = contentStart;

  let lastClose: RegExpExecArray | null = null;
  for (let m: RegExpExecArray | null = null; (m = closeRe.exec(s)); ) {
    lastClose = m;
  }
  if (!lastClose) return s;

  const inner = s.slice(contentStart, lastClose.index);
  const afterClose = s.slice(lastClose.index + lastClose[0].length);

  return inner + (afterClose.trim().length ? '\n' + afterClose.trimStart() : '');
}
