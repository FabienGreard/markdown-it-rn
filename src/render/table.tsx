import React from 'react';

import { View, Text } from 'react-native';

import type { TableRenderResult, LinkHandler, Token, ClassMap } from '../types';

import { renderInlineTokens } from './inline';

export function renderTable(
  tokens: Token[],
  startIndex: number,
  onLinkPress?: LinkHandler,
  classes: ClassMap = {},
  keyPrefix = 'tbl',
): TableRenderResult {
  let idx = startIndex;
  let key = 0;
  const headRows: React.ReactNode[] = [];
  const bodyRows: React.ReactNode[] = [];
  let inHead = false;

  const READ_ROW = () => {
    const cells: React.ReactNode[] = [];
    while (idx < tokens.length) {
      const t = tokens[idx];
      if (t.type === 'tr_close') {
        idx++;
        break;
      } // end of row

      // Expect th_open/td_open
      if (t.type !== 'th_open' && t.type !== 'td_open') {
        idx++;
        continue;
      }
      const isHeader = t.type === 'th_open';
      idx++; // consume th_open/td_open

      // Usually the next token is 'inline'
      const inlineTok = tokens[idx] && tokens[idx].type === 'inline' ? tokens[idx++] : undefined;

      // Advance to cell close
      const closeType = isHeader ? 'th_close' : 'td_close';
      while (idx < tokens.length && tokens[idx].type !== closeType) idx++;
      if (idx < tokens.length) idx++; // consume th_close/td_close

      const { nodes } = renderInlineTokens(
        inlineTok?.children ?? [],
        0,
        onLinkPress,
        classes,
        `${keyPrefix}-cell-${key}`,
      );

      cells.push(
        <View
          key={`${keyPrefix}-c-${key++}`}
          className={`${classes.table?.td ?? ''} ${isHeader ? (classes.table?.th ?? '') : ''}`}>
          {<Text className={classes.table?.tdText ?? classes.table?.thText ?? ''}>{nodes}</Text>}
        </View>,
      );
    }
    return cells;
  };

  while (idx < tokens.length) {
    const t = tokens[idx++];

    if (t.type === 'thead_open') {
      inHead = true;
      continue;
    }
    if (t.type === 'thead_close') {
      inHead = false;
      continue;
    }
    if (t.type === 'tbody_open' || t.type === 'tbody_close') {
      continue;
    }
    if (t.type === 'table_close') break;

    if (t.type === 'tr_open') {
      const cells = READ_ROW();
      (inHead ? headRows : bodyRows).push(
        <View key={`${keyPrefix}-r-${key++}`} className={classes.table?.row ?? ''}>
          {cells}
        </View>,
      );
    }
  }

  const node = (
    <View
      className={classes.table?.container ?? ''}
      style={
        !classes.table?.container
          ? { borderWidth: 1, borderRadius: 12, overflow: 'hidden' }
          : undefined
      }>
      {headRows.length > 0 && <View className={classes.table?.thead ?? ''}>{headRows}</View>}
      <View className={classes.table?.tbody ?? ''}>{bodyRows}</View>
    </View>
  );

  return { node, index: idx };
}
