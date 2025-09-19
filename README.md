# markdown-it-rn

React Native renderer for markdown-it with customizable styling using React Native's StyleSheet.

## Why This Library?

Modern alternative to [`react-native-markdown-display`](https://www.npmjs.com/package/react-native-markdown-display) (no longer maintained).

✅ Actively maintained • Modern RN compatibility • Flexible styling • TypeScript support • Lightweight

## Install

```bash
npm i markdown-it-rn
# peer deps expected in your app:
npm i react react-native
```

## Usage

```tsx
import { MarkdownItRN } from 'markdown-it-rn';

// Basic
<MarkdownItRN md="# Hello World" />

// With custom styles
<MarkdownItRN
  md="# Styled"
  styles={{
    h1: { fontSize: 24, color: '#2563eb' },
    paragraph: { color: '#374151' }
  }}
  onLinkPress={(href) => Linking.openURL(href)}
/>

// With plugins
<MarkdownItRN
  md=":smile: emoji"
  configure={(md) => md.use(emoji)}
/>
```

## API

| Prop          | Type                             | Default | Description                    |
| ------------- | -------------------------------- | ------- | ------------------------------ |
| `md`          | `string`                         | -       | Markdown string                |
| `styles`      | `StyleMap`                       | `{}`    | Style overrides                |
| `onLinkPress` | `(href: string) => void`         | -       | Link tap handler               |
| `configure`   | `(md: MarkdownIt) => MarkdownIt` | -       | Configure markdown-it instance |
| `autoUnfence` | `boolean`                        | `true`  | Unwrap ```md fenced blocks     |

## Styling

Override any element with the `styles` prop:

```tsx
<MarkdownItRN
  md="# Hello"
  styles={{
    root: { padding: 16, backgroundColor: 'white' },
    h1: { fontSize: 24, color: '#2563eb' },
    paragraph: { color: '#374151', lineHeight: 24 },
  }}
/>
```

### Available Style Keys

**Text:** `paragraph`, `break`, `strong`, `em`, `strikethrough`  
**Headings:** `h1`-`h6`  
**Links & Media:** `link`, `image`  
**Code:** `codeBlockContainer`, `codeBlockText`, `codeInline`  
**Blocks:** `blockquote`, `hr`  
**Lists:** `listUl`, `listOl`, `listItem`, `listBullet`, `listContent`  
**Tables:** `tableContainer`, `tableThead`, `tableTbody`, `tableRow`, `tableTh`, `tableTd`, `tableThText`, `tableTdText`  
**Checklists:** `checklistList`, `checklistItem`, `checklistBox`, `checklistChecked`, `checklistUnchecked`, `checklistLabel`  
**Footnotes:** `footnotesContainer`, `footnotesItem`, `footnotesRef`, `footnotesBackref`  
**Definition Lists:** `deflistContainer`, `deflistRow`, `deflistDt`, `deflistDd`

### Dark Theme Example

```tsx
<MarkdownItRN
  md={markdown}
  styles={{
    root: { backgroundColor: '#111827', padding: 16 },
    paragraph: { color: '#f3f4f6' },
    h1: { color: '#ffffff', fontSize: 24 },
    link: { color: '#60a5fa' },
    codeBlockContainer: { backgroundColor: '#1f2937' },
    codeBlockText: { color: '#10b981', fontFamily: 'monospace' },
  }}
/>
```

## Plugins

Minimal core, install only what you need:

```bash
npm i markdown-it-emoji
```

```tsx
import { full as emoji } from 'markdown-it-emoji';

<MarkdownItRN
  md={markdown}
  configure={(md) => md.use(emoji).set({ linkify: true, typographer: true })}
/>;
```

**Built-in:** Footnotes, definition lists, task lists (`- [ ]`, `- [x]`)  
**Available:** Emoji, tables, and other markdown-it plugins  
**Note:** Raw HTML is ignored, plugins using HTML won't work

## Features

✅ Headings, paragraphs, **bold**, _italic_, ~~strikethrough~~  
✅ [Links](https://example.com), images, `code`, code blocks  
✅ Lists, tables, > blockquotes, horizontal rules  
✅ Task lists, footnotes, definition lists  
✅ Emoji support (with plugin)

## NativeWind Support

```bash
cd example && npm install && npm start
```

```tsx
import { cssInterop } from 'nativewind';

const NativewindMarkdownItRN = cssInterop(MarkdownItRN, {
  rootClassName: { target: 'root' },
  h1ClassName: { target: 'h1' },
  paragraphClassName: { target: 'paragraph' },
  // ... map other styles
});

<NativewindMarkdownItRN
  md={markdown}
  rootClassName="p-3 gap-2"
  h1ClassName="text-4xl font-extrabold"
  paragraphClassName="leading-relaxed mb-3"
/>;
```

## Contributing

🐛 Report issues • 💡 Suggest features • 🔧 Submit PRs

```bash
npm install
cd example && npm install && npm start
npm run lint
```

## License

MIT
