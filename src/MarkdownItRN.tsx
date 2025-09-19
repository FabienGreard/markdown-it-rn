import { memo } from 'react';

import { View } from 'react-native';

import { buildMd } from './engine/buildMd';
import { renderBlocks } from './render/blocks';
import type { Configure, LinkHandler, StyleMap } from './types';
import { unwrapPastedMarkdown } from './utils/unwrapPastedMarkdown';
import { defaultStyles } from './themes/default';

export type MarkdownItRNProps = {
  md: string;
  styles?: StyleMap; // override styles for every component
  onLinkPress?: LinkHandler;
  configure?: Configure; // markdown-it plugins/options hook
  autoUnfence?: boolean;
} & StyleMap;

export const MarkdownItRN = memo(function MarkdownItRN({
  md,
  styles,
  onLinkPress,
  configure,
  autoUnfence = true,
  ...stylesOverride
}: MarkdownItRNProps) {
  const source = autoUnfence ? unwrapPastedMarkdown(md) : md;

  const mdEngine = buildMd(configure);
  const tokens = mdEngine.parse(source, {});

  styles = { ...defaultStyles, ...styles, ...stylesOverride };

  const { nodes } = renderBlocks(tokens, 0, onLinkPress, styles ?? {}, 'root');

  return <View style={styles?.root}>{nodes}</View>;
});
