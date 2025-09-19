import React from 'react';

import { Text, Image, TouchableWithoutFeedback } from 'react-native';

import { enforceRasterFormat } from '../utils/enforceRasterFormat';

import type { InlineRenderResult, LinkHandler, Token, ClassMap } from '../types';

export function renderInlineTokens(
  tokens: Token[],
  startIndex = 0,
  onLinkPress?: LinkHandler,
  classes: ClassMap = {},
  keyPrefix = 'inl',
): InlineRenderResult {
  const out: React.ReactNode[] = [];
  let idx = startIndex;
  let k = 0;

  const takeGroup = (stopType?: string): React.ReactNode[] => {
    const inner: React.ReactNode[] = [];
    while (idx < tokens.length) {
      const t = tokens[idx++];
      if (stopType && t.type === stopType) break;

      switch (t.type) {
        case 'text':
          inner.push(t.content);
          break;

        case 'softbreak':
        case 'hardbreak':
          inner.push(
            <Text key={`${keyPrefix}-br-${k++}`} className={classes.break ?? ''}>
              {'\n'}
            </Text>,
          );
          break;

        case 'code_inline':
          inner.push(
            <Text key={`${keyPrefix}-ci-${k++}`} className={classes.codeInline ?? ''}>
              {t.content}
            </Text>,
          );
          break;

        case 'strong_open': {
          const children = takeGroup('strong_close');
          inner.push(
            <Text key={`${keyPrefix}-st-${k++}`} className={classes.strong ?? ''}>
              {children}
            </Text>,
          );
          break;
        }

        case 'em_open': {
          const children = takeGroup('em_close');
          inner.push(
            <Text key={`${keyPrefix}-em-${k++}`} className={classes.em ?? ''}>
              {children}
            </Text>,
          );
          break;
        }

        case 's_open': {
          const children = takeGroup('s_close');
          inner.push(
            <Text key={`${keyPrefix}-s-${k++}`} className={classes.strikethrough ?? ''}>
              {children}
            </Text>,
          );
          break;
        }

        case 'link_open': {
          const href = t.attrGet?.('href') ?? '';
          const children = takeGroup('link_close');

          inner.push(
            <TouchableWithoutFeedback
              key={`${keyPrefix}-a-${k++}`}
              onPress={() => onLinkPress?.(href)}
            >
              <Text className={classes.link ?? ''}>{children}</Text>
            </TouchableWithoutFeedback>,
          );
          break;
        }

        case 'image': {
          const raw = t.attrGet?.('src');
          const alt = t.attrGet?.('alt') ?? '';
          const src = raw ? enforceRasterFormat(raw) : undefined;

          if (src) {
            inner.push(
              <Image
                key={`${keyPrefix}-img-${k++}`}
                source={{ uri: src }}
                accessibilityLabel={alt}
                className={classes.image ?? ''}
                style={!classes.image ? { width: 160, height: 160 } : undefined}
                onError={(e: { nativeEvent?: { error?: string } }) => {
                  console.warn('Image load error:', src, e.nativeEvent?.error);
                }}
              />,
            );
          }
          break;
        }

        // markdown-it-footnote inline reference
        case 'footnote_ref': {
          const id = (t.meta && (t.meta.id ?? t.meta.label)) ?? 0;
          inner.push(
            <Text key={`${keyPrefix}-fnr-${k++}`} className={classes.footnotes?.ref ?? ''}>
              [{Number(id) + 1}]
            </Text>,
          );
          break;
        }

        // Some versions emit these wrappers
        case 'footnote_ref_open': {
          const children = takeGroup('footnote_ref_close');
          inner.push(
            <Text key={`${keyPrefix}-fnro-${k++}`} className={classes.footnotes?.ref ?? ''}>
              {children}
            </Text>,
          );
          break;
        }

        default:
          // ignore html_inline and unknowns by default
          break;
      }
    }
    return inner;
  };

  out.push(...takeGroup());
  return { nodes: out, index: idx };
}
