import React from 'react';

import { View, Text, ScrollView } from 'react-native';

import type { RenderResult, LinkHandler, Token, StyleMap } from '../types';

import { renderInlineTokens } from './inline';
import { renderTable } from './table';

function stripChecklistPrefix(inlineTok: Token | undefined): { isTask: boolean; checked: boolean } {
  if (!inlineTok || !Array.isArray(inlineTok.children) || inlineTok.children.length === 0)
    return { isTask: false, checked: false };
  const first = inlineTok.children[0];
  if (first.type !== 'text' || typeof first.content !== 'string')
    return { isTask: false, checked: false };
  const m = first.content.match(/^\s*\[( |x|X)\]\s+/);
  if (!m) return { isTask: false, checked: false };
  const checked = m[1].toLowerCase() === 'x';
  first.content = first.content.slice(m[0].length); // mutate token to drop marker
  return { isTask: true, checked };
}

export function renderBlocks(
  tokens: Token[],
  startIndex = 0,
  onLinkPress?: LinkHandler,
  styles: StyleMap = {},
  keyPrefix = 'blk',
): RenderResult {
  const out: React.ReactNode[] = [];
  let idx = startIndex;
  let key = 0;

  const takeUntil = (closeType: string, innerKey: string) => {
    const children: React.ReactNode[] = [];
    let group = 0;
    while (idx < tokens.length && tokens[idx].type !== closeType) {
      const res = renderBlocks(tokens, idx, onLinkPress, styles, innerKey);
      children.push(<React.Fragment key={`${innerKey}-${group++}`}>{res.nodes}</React.Fragment>);
      idx = res.index;
    }
    idx++; // consume close
    return children;
  };

  while (idx < tokens.length) {
    const t = tokens[idx++];

    switch (t.type) {
      case 'paragraph_open': {
        const pChildren: React.ReactNode[] = [];
        let pChunk = 0;
        while (idx < tokens.length) {
          const nt = tokens[idx];
          if (nt.type === 'inline') {
            const inlineTok = tokens[idx++];
            const { nodes } = renderInlineTokens(
              inlineTok.children || [],
              0,
              onLinkPress,
              styles,
              `${keyPrefix}-p-${key}-${pChunk++}`,
            );
            pChildren.push(...nodes);
            continue;
          }
          if (nt.type === 'footnote_anchor') {
            const anchorTok = tokens[idx++];
            const fid = (anchorTok.meta && (anchorTok.meta.id ?? anchorTok.meta.label)) ?? 0;
            pChildren.push(
              <Text
                key={`${keyPrefix}-fn-backref-${key}-${fid}`}
                style={styles.footnotesBackref}
              >
                {' ↩'}
              </Text>,
            );
            continue;
          }
          if (nt.type === 'paragraph_close') {
            idx++;
            break;
          }
          break;
        }

        out.push(
          <Text key={`${keyPrefix}-p-${key++}`} style={styles.paragraph}>
            {pChildren}
          </Text>,
        );
        break;
      }

      case 'heading_open': {
        const tag = t.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
        const inlineTok = tokens[idx++];
        const { nodes } = renderInlineTokens(
          inlineTok.children || [],
          0,
          onLinkPress,
          styles,
          `${keyPrefix}-h-${key}`,
        );
        idx++; // heading_close
        const hStyle = styles[tag];
        out.push(
          <View key={`${keyPrefix}-h-${key++}`}>
            <Text style={hStyle}>{nodes}</Text>
          </View>,
        );
        break;
      }

      case 'fence': {
        out.push(
          <ScrollView
            key={`${keyPrefix}-code-${key++}`}
            horizontal
            style={styles.codeBlockContainer}
          >
            <Text style={styles.codeBlockText}>{t.content}</Text>
          </ScrollView>,
        );
        break;
      }

      case 'blockquote_open': {
        const inner = takeUntil('blockquote_close', `${keyPrefix}-q-${key}`);
        out.push(
          <View key={`${keyPrefix}-q-${key++}`} style={styles.blockquote}>
            {inner}
          </View>,
        );
        break;
      }

      case 'bullet_list_open': {
        const items: React.ReactNode[] = [];
        let hasChecklistItems = false;
        while (idx < tokens.length && tokens[idx].type !== 'bullet_list_close') {
          if (tokens[idx].type === 'list_item_open') {
            idx++;
            // Detect checklist & render custom row
            const maybePara = tokens[idx];
            let checklistHandled = false;
            if (maybePara && maybePara.type === 'paragraph_open') {
              const inlineTok = tokens[idx + 1];
              const { isTask, checked } = stripChecklistPrefix(inlineTok);
              if (isTask) {
                hasChecklistItems = true;
                // consume paragraph_open + inline + paragraph_close
                idx += 2;
                const { nodes } = renderInlineTokens(
                  inlineTok.children || [],
                  0,
                  onLinkPress,
                  styles,
                  `${keyPrefix}-tl-${key}`,
                );
                idx++; // paragraph_close
                // consume any trailing tokens in li until close
                while (idx < tokens.length && tokens[idx].type !== 'list_item_close') {
                  const rest = renderBlocks(
                    tokens,
                    idx,
                    onLinkPress,
                    styles,
                    `${keyPrefix}-li-${key}`,
                  );
                  items.push(
                    <React.Fragment key={`${keyPrefix}-li-extra-${key}`}>
                      {rest.nodes}
                    </React.Fragment>,
                  );
                  idx = rest.index + 1; // skip the close handled in recursion
                }
                idx++; // list_item_close
                items.push(
                  <View
                    key={`${keyPrefix}-ul-li-${items.length}`}
                    style={styles.checklistItem}
                  >
                    <Text
                      style={[styles.checklistBox, checked ? styles.checklistChecked : styles.checklistUnchecked]}
                    >
                      {checked ? '✓' : '✗'}
                    </Text>
                    <Text style={styles.checklistLabel}>{nodes}</Text>
                  </View>,
                );
                checklistHandled = true;
              }
            }
            if (!checklistHandled) {
              const res = renderBlocks(tokens, idx, onLinkPress, styles, `${keyPrefix}-ul-${key}`);
              idx = res.index; // at list_item_close
              idx++; // consume list_item_close
              items.push(
                <View
                  key={`${keyPrefix}-ul-li-${items.length}`}
                  style={styles.listItem}
                >
                  <Text style={styles.listBullet}>•</Text>
                  <View style={styles.listContent}>{res.nodes}</View>
                </View>,
              );
            }
          } else {
            idx++;
          }
        }
        idx++; // bullet_list_close
        const listStyle = hasChecklistItems ? styles.checklistList : styles.listUl;
        out.push(
          <View key={`${keyPrefix}-ul-${key++}`} style={listStyle}>
            {items}
          </View>,
        );
        break;
      }

      case 'ordered_list_open': {
        const start = Number(t.attrGet?.('start') || 1);
        const items: React.ReactNode[] = [];
        let n = 0;
        while (idx < tokens.length && tokens[idx].type !== 'ordered_list_close') {
          if (tokens[idx].type === 'list_item_open') {
            idx++;
            const res = renderBlocks(tokens, idx, onLinkPress, styles, `${keyPrefix}-ol-${key}`);
            idx = res.index; // at list_item_close
            idx++; // consume list_item_close
            items.push(
              <View key={`${keyPrefix}-ol-li-${items.length}`} style={styles.listItem}>
                <Text style={styles.listBullet}>{`${start + n}.`}</Text>
                <View style={styles.listContent}>{res.nodes}</View>
              </View>,
            );
            n++;
          } else {
            idx++;
          }
        }
        idx++; // ordered_list_close
        out.push(
          <View key={`${keyPrefix}-ol-${key++}`} style={styles.listOl}>
            {items}
          </View>,
        );
        break;
      }

      case 'hr': {
        out.push(<View key={`${keyPrefix}-hr-${key++}`} style={styles.hr} />);
        break;
      }

      case 'table_open': {
        const { node, index } = renderTable(
          tokens,
          idx,
          onLinkPress,
          styles,
          `${keyPrefix}-tbl-${key}`,
        );
        idx = index; // table_close consumed by renderTable
        out.push(<React.Fragment key={`${keyPrefix}-tbl-wrap-${key++}`}>{node}</React.Fragment>);
        break;
      }

      // Definition lists
      case 'dl_open': {
        const rows: React.ReactNode[] = [];

        while (idx < tokens.length && tokens[idx].type !== 'dl_close') {
          if (tokens[idx].type === 'dt_open') {
            // ---- Term ----
            idx++; // into dt
            const dtInline = tokens[idx++]; // the inline token for term
            const dtNodes = renderInlineTokens(
              dtInline.children || [],
              0,
              onLinkPress,
              styles,
              `${keyPrefix}-dt-${key}`,
            ).nodes;
            idx++; // dt_close

            // ---- Definition ----
            if (tokens[idx].type === 'dd_open') {
              idx++; // into dd
              const res = renderBlocks(tokens, idx, onLinkPress, styles, `${keyPrefix}-dd-${key}`);
              idx = res.index; // at dd_close
              idx++; // consume dd_close

              rows.push(
                <View
                  key={`${keyPrefix}-dl-row-${rows.length}`}
                  style={styles.deflistRow}
                >
                  <Text style={styles.deflistDt}>{dtNodes}</Text>
                  <View style={styles.deflistDd}>{res.nodes}</View>
                </View>,
              );
            }
          } else {
            idx++;
          }
        }

        idx++; // consume dl_close
        out.push(
          <View key={`${keyPrefix}-dl-${key++}`} style={styles.deflistContainer}>
            {rows}
          </View>,
        );

        break;
      }

      // Footnote block
      case 'footnote_block_open': {
        const items: React.ReactNode[] = [];
        while (idx < tokens.length && tokens[idx].type !== 'footnote_block_close') {
          if (tokens[idx].type === 'footnote_open') {
            const id = tokens[idx].meta?.id ?? items.length;
            idx++;

            const res = renderBlocks(tokens, idx, onLinkPress, styles, `${keyPrefix}-fn-${id}`);
            idx = res.index; // at footnote_close
            idx++; // consume footnote_close
            items.push(
              <View key={`${keyPrefix}-fn-item-${id}`} style={styles.footnotesItem}>
                <Text style={styles.footnotesRef}>[{Number(id) + 1}]</Text>
                <View>{res.nodes}</View>
              </View>,
            );
          } else {
            idx++;
          }
        }
        idx++; // footnote_block_close
        out.push(
          <View
            key={`${keyPrefix}-fnblock-${key++}`}
            style={styles.footnotesContainer}
          >
            <View>{items}</View>
          </View>,
        );
        break;
      }

      case 'list_item_open':
      case 'paragraph_close':
      case 'heading_close':
      case 'dd_close':
      case 'list_item_close':
      case 'bullet_list_close':
      case 'ordered_list_close':
      case 'blockquote_close':
        return { nodes: out, index: idx - 1 };

      case 'inline': {
        const { nodes } = renderInlineTokens(
          t.children || [],
          0,
          onLinkPress,
          styles,
          `${keyPrefix}-ip-${key}`,
        );
        out.push(
          <Text key={`${keyPrefix}-ip-${key++}`} style={styles.paragraph}>
            {nodes}
          </Text>,
        );
        break;
      }

      default:
        // ignore html_block and unknowns
        break;
    }
  }
  return { nodes: out, index: idx };
}
