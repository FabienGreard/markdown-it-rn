import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Linking } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MarkdownItRN, defaultClasses } from 'markdown-it-rn';

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
      <SafeAreaView className="flex-1">
        <StatusBar style="auto" />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <MarkdownItRN
            md={SAMPLE}
            className="p-4"
            onLinkPress={(href) => Linking.openURL(href)}
            classes={defaultClasses}
          />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
