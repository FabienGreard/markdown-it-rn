import MarkdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import { full as emojiPlugin } from 'markdown-it-emoji';
import footnote from 'markdown-it-footnote';

import type { Configure } from '../types';

export function buildMd(configure?: Configure) {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

  md.use(emojiPlugin).use(footnote).use(deflist);
  return configure ? configure(md) : md;
}
