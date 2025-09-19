import React from 'react';

import type MarkdownIt from 'markdown-it';

export type Configure = (md: MarkdownIt) => MarkdownIt;
export type LinkHandler = (href: string) => void;

export type RenderResult = { nodes: React.ReactNode[]; index: number };
export type InlineRenderResult = { nodes: React.ReactNode[]; index: number };
export type TableRenderResult = { node: React.ReactNode; index: number };

export type ClassMap = {
  root?: string;
  paragraph?: string;
  heading?: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
  };
  link?: string;
  image?: string;
  codeBlock?: { container?: string; text?: string };
  codeInline?: string;
  blockquote?: string;
  list?: {
    ul?: string;
    ol?: string;
    item?: string;
    bullet?: string;
    content?: string;
  };
  hr?: string;
  table?: {
    container?: string;
    thead?: string;
    tbody?: string;
    row?: string;
    th?: string;
    td?: string;
    thText?: string;
    tdText?: string;
  };
  checklist?: {
    list?: string;
    item?: string;
    box?: string;
    checked?: string;
    unchecked?: string;
    label?: string;
  };
  footnotes?: {
    container?: string;
    list?: string;
    item?: string;
    ref?: string;
    backref?: string;
    content?: string;
  };
  deflist?: { container?: string; row?: string; dt?: string; dd?: string };
  break?: string;
  strong?: string;
  em?: string;
  strikethrough?: string;
};

export type { default as Token } from 'markdown-it/lib/token.mjs';
