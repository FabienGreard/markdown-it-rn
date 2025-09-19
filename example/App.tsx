import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MarkdownItRN } from 'markdown-it-rn';

import { cssInterop } from 'nativewind';

/* usage with nativewind */
const NativewindMarkdownItRN = cssInterop(MarkdownItRN, {
  rootClassName: {
    target: 'root',
  },
  paragraphClassName: {
    target: 'paragraph',
  },
  h1ClassName: {
    target: 'h1',
  },
  h2ClassName: {
    target: 'h2',
  },
  h3ClassName: {
    target: 'h3',
  },
  h4ClassName: {
    target: 'h4',
  },
  h5ClassName: {
    target: 'h5',
  },
  h6ClassName: {
    target: 'h6',
  },
  linkClassName: {
    target: 'link',
  },
  imageClassName: {
    target: 'image',
  },
  codeBlockContainerClassName: {
    target: 'codeBlockContainer',
  },
  codeBlockTextClassName: {
    target: 'codeBlockText',
  },
  codeInlineClassName: {
    target: 'codeInline',
  },
  blockquoteClassName: {
    target: 'blockquote',
  },
  listUlClassName: {
    target: 'listUl',
  },
  listOlClassName: {
    target: 'listOl',
  },
  listItemClassName: {
    target: 'listItem',
  },
  listBulletClassName: {
    target: 'listBullet',
  },
  listContentClassName: {
    target: 'listContent',
  },
  hrClassName: {
    target: 'hr',
  },
  tableContainerClassName: {
    target: 'tableContainer',
  },
  tableTheadClassName: {
    target: 'tableThead',
  },
  tableTbodyClassName: {
    target: 'tableTbody',
  },
  tableRowClassName: {
    target: 'tableRow',
  },
  tableThClassName: {
    target: 'tableTh',
  },
  tableTdClassName: {
    target: 'tableTd',
  },
  tableThTextClassName: {
    target: 'tableThText',
  },
  tableTdTextClassName: {
    target: 'tableTdText',
  },
  checklistListClassName: {
    target: 'checklistList',
  },
  checklistItemClassName: {
    target: 'checklistItem',
  },
  checklistBoxClassName: {
    target: 'checklistBox',
  },
  checklistCheckedClassName: {
    target: 'checklistChecked',
  },
  checklistUncheckedClassName: {
    target: 'checklistUnchecked',
  },
  checklistLabelClassName: {
    target: 'checklistLabel',
  },
  footnotesContainerClassName: {
    target: 'footnotesContainer',
  },
  footnotesItemClassName: {
    target: 'footnotesItem',
  },
  footnotesRefClassName: {
    target: 'footnotesRef',
  },
  footnotesBackrefClassName: {
    target: 'footnotesBackref',
  },
  deflistContainerClassName: {
    target: 'deflistContainer',
  },
  deflistRowClassName: {
    target: 'deflistRow',
  },
  deflistDtClassName: {
    target: 'deflistDt',
  },
  deflistDdClassName: {
    target: 'deflistDd',
  },
  breakClassName: {
    target: 'break',
  },
  strongClassName: {
    target: 'strong',
  },
  emClassName: {
    target: 'em',
  },
  strikethroughClassName: {
    target: 'strikethrough',
  },
});

import './global.css';

const SAMPLE = `
# markdown-it-rn demo 

## Headings

### This is a Level 3 Heading

#### This is a Level 4 Heading

## Text Styles

This is **bold** text, and this is *italic* text.

You can also make some text ***bold and italic*** at the same time.

## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 2a
  - Subitem 2b
- Item 3

### Ordered List

1. First item
2. Second item
3. Third item

## Links

You can create a [link to Google](https://www.google.com).

## Images

![Sample Image](https://placehold.co/600x400.png "Sample Image")

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Code

### Inline Code

Here is a piece of \`inline code\`.

### Code Block

\`\`\`
def hello_world():
    print("Hello, World!")
\`\`\`

## Horizontal Rule

---

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |

## Checklists

- [ ] Task 1
- [x] Task 2
- [ ] Task 3

## Footnotes

Here is a simple footnote[^1].

[^1]: This is the footnote.

## Strikethrough

This is a ~~strikethrough~~ example.

## Definition List

Term 1
: Definition 1

Term 2
: Definition 2
`;

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="auto" />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <NativewindMarkdownItRN
            md={SAMPLE}
            onLinkPress={(href) => Linking.openURL(href)}
            /* component style override usage with nativewind */
            rootClassName="p-3 gap-2"
            paragraphClassName="leading-relaxed mb-3"
            breakClassName=""
            strongClassName="font-bold"
            emClassName="italic"
            strikethroughClassName="line-through"
            h1ClassName="mt-4 mb-2 text-4xl font-extrabold tracking-tight"
            h2ClassName="mt-3 mb-2 text-3xl font-bold tracking-tight"
            h3ClassName="mt-3 mb-2 text-2xl font-semibold"
            h4ClassName="mt-2 mb-1 text-xl font-semibold"
            h5ClassName="mt-2 mb-1 text-lg font-medium"
            h6ClassName="mt-1 mb-1 text-sm font-medium uppercase tracking-wide"
            linkClassName="underline"
            imageClassName="w-full h-48 my-3 rounded-md"
            codeBlockContainerClassName="my-3 rounded-md border border-neutral-200"
            codeBlockTextClassName="font-mono text-sm p-3"
            codeInlineClassName="font-mono text-sm px-1.5 py-0.5 rounded"
            blockquoteClassName="border-l-4 pl-3 my-3  italic"
            listUlClassName="my-2 ml-5"
            listOlClassName="my-2 ml-5"
            listItemClassName="flex-row items-start mb-1"
            listBulletClassName="w-5 text-left"
            listContentClassName="flex-1"
            hrClassName="my-4 h-px"
            tableContainerClassName="border my-3 rounded-md overflow-hidden"
            tableTheadClassName=""
            tableTbodyClassName=""
            tableRowClassName="flex-row"
            tableThClassName="p-3 border font-semibold text-left flex-1"
            tableTdClassName="p-3 border text-left flex-1"
            tableThTextClassName=""
            tableTdTextClassName=""
            checklistListClassName="my-2"
            checklistItemClassName="flex-row items-center gap-2 mb-2"
            checklistBoxClassName="w-5 h-5 text-center border rounded-sm"
            checklistCheckedClassName=""
            checklistUncheckedClassName=""
            checklistLabelClassName=""
            footnotesContainerClassName="mt-6 pt-4 border-t"
            footnotesItemClassName="flex-row gap-2 mb-1"
            footnotesRefClassName="font-mono text-xs"
            footnotesBackrefClassName="font-mono text-xs"
            deflistContainerClassName="my-3"
            deflistRowClassName="mb-2"
            deflistDtClassName="font-semibold"
            deflistDdClassName="pl-4"
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
