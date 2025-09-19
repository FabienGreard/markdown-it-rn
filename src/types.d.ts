import React from 'react';
import type { TextStyle, ViewStyle, ImageStyle } from 'react-native';

import type MarkdownIt from 'markdown-it';

export type Configure = (md: MarkdownIt) => MarkdownIt;
export type LinkHandler = (href: string) => void;

export type RenderResult = { nodes: React.ReactNode[]; index: number };
export type InlineRenderResult = { nodes: React.ReactNode[]; index: number };
export type TableRenderResult = { node: React.ReactNode; index: number };

export type StyleMap = {
  root?: ViewStyle;
  paragraph?: TextStyle;
  // Individual heading styles
  h1?: TextStyle;
  h2?: TextStyle;
  h3?: TextStyle;
  h4?: TextStyle;
  h5?: TextStyle;
  h6?: TextStyle;
  link?: TextStyle;
  image?: ImageStyle;
  // Code block styles
  codeBlockContainer?: ViewStyle;
  codeBlockText?: TextStyle;
  codeInline?: TextStyle;
  blockquote?: TextStyle;
  // List styles
  listUl?: ViewStyle;
  listOl?: ViewStyle;
  listItem?: ViewStyle;
  listBullet?: TextStyle;
  listContent?: ViewStyle;
  hr?: ViewStyle;
  // Table styles
  tableContainer?: ViewStyle;
  tableThead?: ViewStyle;
  tableTbody?: ViewStyle;
  tableRow?: ViewStyle;
  tableTh?: ViewStyle;
  tableTd?: ViewStyle;
  tableThText?: TextStyle;
  tableTdText?: TextStyle;
  // Checklist styles
  checklistList?: ViewStyle;
  checklistItem?: ViewStyle;
  checklistBox?: ViewStyle;
  checklistChecked?: TextStyle;
  checklistUnchecked?: TextStyle;
  checklistLabel?: TextStyle;
  // Footnotes styles
  footnotesContainer?: ViewStyle;
  footnotesItem?: ViewStyle;
  footnotesRef?: TextStyle;
  footnotesBackref?: TextStyle;
  // Definition list styles
  deflistContainer?: ViewStyle;
  deflistRow?: ViewStyle;
  deflistDt?: TextStyle;
  deflistDd?: TextStyle;
  // Inline styles
  break?: TextStyle;
  strong?: TextStyle;
  em?: TextStyle;
  strikethrough?: TextStyle;
};

export type { default as Token } from 'markdown-it/lib/token.mjs';
