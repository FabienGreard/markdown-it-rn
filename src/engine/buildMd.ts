import MarkdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import footnote from 'markdown-it-footnote';

import type { Configure } from '../types';

export function buildMd(configure?: Configure) {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true })
    .use(deflist)
    .use(footnote);
  return configure ? configure(md) : md;
}
