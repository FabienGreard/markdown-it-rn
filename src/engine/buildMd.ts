import MarkdownIt from 'markdown-it';

import type { Configure } from '../types';

export function buildMd(configure?: Configure) {
  const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
  return configure ? configure(md) : md;
}
