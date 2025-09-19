import { StyleSheet } from 'react-native';
import type { StyleMap } from '../types';

export const defaultStyles = StyleSheet.create({
  root: {
    padding: 12,
    gap: 8,
  },

  paragraph: {
    color: '#404040',
    lineHeight: 24,
    marginBottom: 12,
  },

  break: {},

  strong: {
    fontWeight: 'bold' as const,
    color: '#404040',
  },

  em: {
    fontStyle: 'italic',
    color: '#404040',
  },

  strikethrough: {
    textDecorationLine: 'line-through',
    color: '#404040',
  },

  // Headings
  h1: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 36,
    fontWeight: '800' as const,
    letterSpacing: -0.025,
    color: '#404040',
  },

  h2: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 30,
    fontWeight: 'bold' as const,
    letterSpacing: -0.025,
    color: '#404040',
  },

  h3: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 24,
    fontWeight: '600' as const,
    color: '#404040',
  },

  h4: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#404040',
  },

  h5: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 18,
    fontWeight: '500' as const,
    color: '#404040',
  },

  h6: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '500' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.05,
    color: '#525252',
  },

  link: {
    textDecorationLine: 'underline',
    color: '#737373',
  },

  image: {
    width: '100%',
    height: 192,
    marginVertical: 12,
    borderRadius: 6,
  },

  // Code blocks
  codeBlockContainer: {
    marginVertical: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },

  codeBlockText: {
    fontFamily: 'monospace',
    fontSize: 14,
    padding: 12,
    color: '#404040',
  },

  codeInline: {
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    color: '#404040',
  },

  blockquote: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginVertical: 12,
    borderLeftColor: '#d4d4d4',
    color: '#404040',
    fontStyle: 'italic',
  },

  // Lists
  listUl: {
    marginVertical: 8,
    marginLeft: 20,
  },

  listOl: {
    marginVertical: 8,
    marginLeft: 20,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },

  listBullet: {
    width: 20,
    textAlign: 'left' as const,
    color: '#404040',
  },

  listContent: {
    flex: 1,
  },

  hr: {
    marginVertical: 16,
    height: 1,
    backgroundColor: '#d4d4d4',
  },

  // Table
  tableContainer: {
    borderWidth: 1,
    borderColor: '#d4d4d4',
    marginVertical: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },

  tableThead: {
    backgroundColor: '#fafafa',
  },

  tableTbody: {},

  tableRow: {
    flexDirection: 'row',
  },

  tableTh: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    fontWeight: '600' as const,
    flex: 1,
  },

  tableTd: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    flex: 1,
  },

  tableThText: {
    color: '#404040',
  },

  tableTdText: {
    color: '#404040',
  },

  // Checklist
  checklistList: {
    marginVertical: 8,
  },

  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  checklistBox: {
    width: 20,
    height: 20,
    textAlign: 'center' as const,
    borderWidth: 1,
    borderColor: '#a3a3a3',
    borderRadius: 2,
  },

  checklistChecked: {
    backgroundColor: '#404040',
    color: '#ffffff',
  },

  checklistUnchecked: {
    color: '#a3a3a3',
  },

  checklistLabel: {
    color: '#404040',
  },

  // Footnotes
  footnotesContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#d4d4d4',
  },

  footnotesItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },

  footnotesRef: {
    color: '#737373',
    fontFamily: 'monospace',
    fontSize: 12,
  },

  footnotesBackref: {
    color: '#737373',
    fontFamily: 'monospace',
    fontSize: 12,
  },

  // Definition list
  deflistContainer: {
    marginVertical: 12,
  },

  deflistRow: {
    marginBottom: 8,
  },

  deflistDt: {
    fontWeight: '600' as const,
    color: '#404040',
  },

  deflistDd: {
    paddingLeft: 16,
    color: '#404040',
  },
}) satisfies StyleMap;
