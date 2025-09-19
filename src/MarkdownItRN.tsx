import { memo } from 'react';

import { View } from 'react-native';

import { buildMd } from './engine/buildMd';
import { renderBlocks } from './render/blocks';
import type { Configure, LinkHandler, ClassMap } from './types';
import { unwrapPastedMarkdown } from './utils/unwrapPastedMarkdown';
import { defaultClasses } from './themes/default';

export type MarkdownItRNProps = {
  md: string;
  className?: string; // container classes (NativeWind)
  classes?: ClassMap; // override classNames for every component (defaults to empty strings)
  onLinkPress?: LinkHandler;
  configure?: Configure; // markdown-it plugins/options hook
  autoUnfence?: boolean;
};

export const MarkdownItRN = memo(function MarkdownItRN({
  md,
  className,
  classes = defaultClasses,
  onLinkPress,
  configure,
  autoUnfence = true,
}: MarkdownItRNProps) {
  const source = autoUnfence ? unwrapPastedMarkdown(md) : md;

  const mdEngine = buildMd(configure);
  const tokens = mdEngine.parse(source, {});

  const { nodes } = renderBlocks(tokens, 0, onLinkPress, classes ?? {}, 'root');

  return <View className={`${className ?? ''} ${classes?.root ?? ''}`.trim()}>{nodes}</View>;
});
