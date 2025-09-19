export function enforceRasterFormat(url: string): string {
  try {
    const u = new URL(url);
    if (/(^|\.)placehold\.co$/i.test(u.hostname)) {
      const p = u.pathname;
      const hasExt = /\.(png|jpe?g|gif|webp|avif)$/i.test(p);
      const hasFormatSeg = /(\/(png|jpe?g|gif|webp|avif))$/i.test(p);
      if (!hasExt && !hasFormatSeg) {
        u.pathname = p.replace(/\/?$/, '/png');
        return u.toString();
      }
    }
  } catch {
    return url;
  }
  return url;
}
