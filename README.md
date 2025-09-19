# markdown-it-rn

React Native renderer for markdown-it with customizable styling using React Native's StyleSheet.

## Install

```bash
npm i markdown-it-rn
# peer deps expected in your app:
npm i react react-native
```

## Usage

### Basic Usage

```tsx
import React from 'react';
import { MarkdownItRN } from 'markdown-it-rn';

export default function Screen() {
  return (
    <MarkdownItRN
      md={`# Hello World\n\n- [x] Task done\n- [ ] Task todo\n\n> A quote\n\n\`inline code\``}
      onLinkPress={(href) => console.log('open', href)}
    />
  );
}
```

### Advanced Usage with Custom Styling

```tsx
import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { MarkdownItRN } from 'markdown-it-rn';

const customStyles = StyleSheet.create({
  root: {
    padding: 24,
    backgroundColor: 'white',
  },
  heading: {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2563eb',
      marginBottom: 16,
    },
    h2: {
      fontSize: 20,
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: 12,
    },
  },
  paragraph: {
    color: '#374151',
    marginBottom: 8,
    lineHeight: 24,
  },
  link: {
    color: '#3b82f6',
    textDecorationLine: 'underline',
  },
  codeBlock: {
    container: {
      backgroundColor: '#f3f4f6',
      borderRadius: 8,
      padding: 16,
      marginVertical: 12,
    },
    text: {
      fontFamily: 'monospace',
      fontSize: 14,
      color: '#1f2937',
    },
  },
});

export default function Screen() {
  return (
    <MarkdownItRN
      md={`# Custom Styled Markdown\n\nThis is a paragraph with [a link](https://example.com).\n\n\`\`\`javascript\nconsole.log('Hello World');\n\`\`\``}
      styles={{
        root: customStyles.root,
        h1: customStyles.heading.h1,
        h2: customStyles.heading.h2,
        paragraph: customStyles.paragraph,
        link: customStyles.link,
        codeBlockContainer: customStyles.codeBlock.container,
        codeBlockText: customStyles.codeBlock.text,
      }}
      onLinkPress={(href) => Linking.openURL(href)}
      configure={(md) => md.set({ linkify: true, typographer: true })}
      autoUnfence={true}
    />
  );
}
```

### Using Default Styles

```tsx
import React from 'react';
import { MarkdownItRN } from 'markdown-it-rn';

export default function Screen() {
  return <MarkdownItRN md={`# Using Default Styles\n\nThis uses the built-in default styling.`} />;
}
```

### Handling Pasted Markdown (autoUnfence)

When `autoUnfence` is true (default), triple‑backtick fenced blocks labeled as `md`/`markdown` are unwrapped so the inner markdown renders directly. Disable this if you want to keep the fence.

````tsx
const pasted = '```md\n# Title\n\n- item\n```';
<MarkdownItRN md={pasted} autoUnfence />;
````

## API Reference

### Props

| Prop          | Type                             | Required | Default         | Description                                         |
| ------------- | -------------------------------- | -------- | --------------- | --------------------------------------------------- |
| `md`          | `string`                         | ✅       | -               | Markdown string to render                           |
| `styles`      | `StyleMap`                       | ❌       | `defaultStyles` | Fine-grained style overrides for each element       |
| `onLinkPress` | `(href: string) => void`         | ❌       | -               | Handler for link taps. Without it, links won't open |
| `configure`   | `(md: MarkdownIt) => MarkdownIt` | ❌       | -               | Customize markdown-it instance                      |
| `autoUnfence` | `boolean`                        | ❌       | `true`          | Unwrap pasted ```md fenced blocks                   |

## Styling

### Container Styling

Use `styles.root` to style the root container (the `style` prop has been removed):

```tsx
<MarkdownItRN
  md="# Hello"
  styles={{
    root: {
      padding: 16,
      backgroundColor: 'white',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  }}
/>
```

### Element-Specific Styling

Use the `styles` prop to override styles for specific markdown elements. All styles accept React Native StyleSheet properties.

You can also pass any individual style keys directly as shorthand props (e.g., `h1`, `paragraph`, `tableContainer`). They are merged with `defaultStyles` and with the `styles` object. Merge order is: `defaultStyles` < `styles` prop < individual shorthand props.

## Overrideable Style Attributes

The following table shows all the style attributes that can be overridden through the `styles` prop:

| Element              | Attribute Path       | Type         | Description                | React Native Style Properties                                                      |
| -------------------- | -------------------- | ------------ | -------------------------- | ---------------------------------------------------------------------------------- |
| **Root Container**   | `root`               | `ViewStyle`  | Root container styling     | `padding`, `gap`, etc.                                                             |
| **Text Elements**    |                      |              |                            |                                                                                    |
|                      | `paragraph`          | `TextStyle`  | Paragraph text styling     | `color`, `fontSize`, `lineHeight`, etc.                                            |
|                      | `break`              | `TextStyle`  | Line break styling         | `color`, `fontSize`, etc.                                                          |
|                      | `strong`             | `TextStyle`  | Bold text styling          | `fontWeight`, `color`, etc.                                                        |
|                      | `em`                 | `TextStyle`  | Italic text styling        | `fontStyle`, `color`, etc.                                                         |
|                      | `strikethrough`      | `TextStyle`  | Strikethrough text styling | `textDecorationLine`, `color`, etc.                                                |
| **Headings**         |                      |              |                            |                                                                                    |
|                      | `h1`                 | `TextStyle`  | H1 heading styling         | `fontSize`, `fontWeight`, `color`, `marginTop`, etc.                               |
|                      | `h2`                 | `TextStyle`  | H2 heading styling         | `fontSize`, `fontWeight`, `color`, `marginTop`, etc.                               |
|                      | `h3`                 | `TextStyle`  | H3 heading styling         | `fontSize`, `fontWeight`, `color`, `marginTop`, etc.                               |
|                      | `h4`                 | `TextStyle`  | H4 heading styling         | `fontSize`, `fontWeight`, `color`, `marginTop`, etc.                               |
|                      | `h5`                 | `TextStyle`  | H5 heading styling         | `fontSize`, `fontWeight`, `color`, `marginTop`, etc.                               |
|                      | `h6`                 | `TextStyle`  | H6 heading styling         | `fontSize`, `fontWeight`, `color`, `marginTop`, etc.                               |
| **Links & Media**    |                      |              |                            |                                                                                    |
|                      | `link`               | `TextStyle`  | Link styling               | `color`, `textDecorationLine`, etc.                                                |
|                      | `image`              | `ImageStyle` | Image styling              | `width`, `height`, `marginVertical`, `borderRadius`, etc.                          |
| **Code**             |                      |              |                            |                                                                                    |
|                      | `codeBlockContainer` | `ViewStyle`  | Code block container       | `backgroundColor`, `borderRadius`, `padding`, `marginVertical`, etc.               |
|                      | `codeBlockText`      | `TextStyle`  | Code block text            | `fontFamily`, `fontSize`, `color`, `padding`, etc.                                 |
|                      | `codeInline`         | `TextStyle`  | Inline code styling        | `fontFamily`, `fontSize`, `backgroundColor`, `padding`, etc.                       |
| **Block Elements**   |                      |              |                            |                                                                                    |
|                      | `blockquote`         | `ViewStyle`  | Blockquote styling         | `borderLeftWidth`, `paddingLeft`, `marginVertical`, `borderLeftColor`, etc.        |
|                      | `hr`                 | `ViewStyle`  | Horizontal rule styling    | `height`, `backgroundColor`, `marginVertical`, etc.                                |
| **Lists**            |                      |              |                            |                                                                                    |
|                      | `listUl`             | `ViewStyle`  | Unordered list container   | `marginVertical`, `marginLeft`, etc.                                               |
|                      | `listOl`             | `ViewStyle`  | Ordered list container     | `marginVertical`, `marginLeft`, etc.                                               |
|                      | `listItem`           | `ViewStyle`  | List item styling          | `flexDirection`, `alignItems`, `marginBottom`, etc.                                |
|                      | `listBullet`         | `TextStyle`  | List bullet/number styling | `width`, `textAlign`, `color`, etc.                                                |
|                      | `listContent`        | `ViewStyle`  | List item content          | `flex`, etc.                                                                       |
| **Tables**           |                      |              |                            |                                                                                    |
|                      | `tableContainer`     | `ViewStyle`  | Table container            | `borderWidth`, `borderColor`, `marginVertical`, `borderRadius`, `overflow`, etc.   |
|                      | `tableThead`         | `ViewStyle`  | Table header section       | `backgroundColor`, etc.                                                            |
|                      | `tableTbody`         | `ViewStyle`  | Table body section         | Any `ViewStyle` properties                                                         |
|                      | `tableRow`           | `ViewStyle`  | Table row styling          | `flexDirection`, etc.                                                              |
|                      | `tableTh`            | `ViewStyle`  | Table header cell          | `padding`, `borderWidth`, `borderColor`, `fontWeight`, etc.                        |
|                      | `tableTd`            | `ViewStyle`  | Table data cell            | `padding`, `borderWidth`, `borderColor`, `flex`, etc.                              |
|                      | `tableThText`        | `TextStyle`  | Table header text          | `color`, etc.                                                                      |
|                      | `tableTdText`        | `TextStyle`  | Table data text            | `color`, etc.                                                                      |
| **Checklists**       |                      |              |                            |                                                                                    |
|                      | `checklistList`      | `ViewStyle`  | Checklist container        | `marginVertical`, etc.                                                             |
|                      | `checklistItem`      | `ViewStyle`  | Checklist item             | `flexDirection`, `alignItems`, `gap`, `marginBottom`, etc.                         |
|                      | `checklistBox`       | `ViewStyle`  | Checkbox styling           | `width`, `height`, `textAlign`, `borderWidth`, `borderColor`, `borderRadius`, etc. |
|                      | `checklistChecked`   | `TextStyle`  | Checked checkbox           | `backgroundColor`, `color`, etc.                                                   |
|                      | `checklistUnchecked` | `TextStyle`  | Unchecked checkbox         | `color`, etc.                                                                      |
|                      | `checklistLabel`     | `TextStyle`  | Checklist label            | `color`, etc.                                                                      |
| **Footnotes**        |                      |              |                            |                                                                                    |
|                      | `footnotesContainer` | `ViewStyle`  | Footnotes container        | `marginTop`, `paddingTop`, `borderTopWidth`, `borderTopColor`, etc.                |
|                      | `footnotesItem`      | `ViewStyle`  | Footnote item              | `flexDirection`, `gap`, `marginBottom`, etc.                                       |
|                      | `footnotesRef`       | `TextStyle`  | Footnote reference         | `color`, `fontFamily`, `fontSize`, etc.                                            |
|                      | `footnotesBackref`   | `TextStyle`  | Footnote back reference    | `color`, `fontFamily`, `fontSize`, etc.                                            |
| **Definition Lists** |                      |              |                            |                                                                                    |
|                      | `deflistContainer`   | `ViewStyle`  | Definition list container  | `marginVertical`, etc.                                                             |
|                      | `deflistRow`         | `ViewStyle`  | Definition row             | `marginBottom`, etc.                                                               |
|                      | `deflistDt`          | `TextStyle`  | Definition term            | `fontWeight`, `color`, etc.                                                        |
|                      | `deflistDd`          | `TextStyle`  | Definition description     | `paddingLeft`, `color`, etc.                                                       |

### Example: Custom Theme

```tsx
import { StyleSheet } from 'react-native';

const darkTheme = StyleSheet.create({
  root: {
    backgroundColor: '#111827',
    padding: 16,
  },
  paragraph: {
    color: '#f3f4f6',
    marginBottom: 12,
  },
  h1: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  h2: {
    color: '#e5e7eb',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  link: {
    color: '#60a5fa',
    textDecorationLine: 'underline',
  },
  codeBlockContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  codeBlockText: {
    color: '#10b981',
    fontFamily: 'monospace',
    padding: 12,
  },
});

<MarkdownItRN
  md={markdown}
  styles={{
    root: darkTheme.root,
    paragraph: darkTheme.paragraph,
    h1: darkTheme.h1,
    h2: darkTheme.h2,
    link: darkTheme.link,
    codeBlockContainer: darkTheme.codeBlockContainer,
    codeBlockText: darkTheme.codeBlockText,
  }}
/>;
```

## Plugins

The component enables the following markdown-it plugins by default:

- **deflist**: Definition lists
- **emoji**: Emoji support (`:smile:` → 😄)
- **footnote**: Footnote support

### Customizing Plugins

Use the `configure` prop to customize the markdown-it instance:

```tsx
<MarkdownItRN
  md={markdown}
  configure={(md) => {
    // markdown-it defaults used by this component:
    // - html: false
    // - linkify: true
    // - typographer: true
    // Plugins enabled by default:
    // - emoji, footnote, deflist
    // You can tweak options or enable/disable plugins as needed:
    md.set({ linkify: true, typographer: true });
    // md.disable('linkify');

    // Add custom plugins
    // md.use(customPlugin);

    return md;
  }}
/>
```

### Markdown-it Defaults

- **HTML** rendering is disabled (`html: false`).
- **Linkify** (auto-link URLs) is enabled.
- **Typographer** (smart quotes, dashes) is enabled.

## Supported Markdown Features

- ✅ Headings (H1-H6)
- ✅ Paragraphs and line breaks
- ✅ **Bold**, _italic_, and ~~strikethrough~~ text
- ✅ [Links](https://example.com) and images
- ✅ `Inline code` and code blocks
- ✅ > Blockquotes
- ✅ Lists (ordered and unordered)
- ✅ Tables
- ✅ Task lists / checklists
- ✅ Horizontal rules
- ✅ Footnotes[^1]
- ✅ Definition lists
- ✅ Emoji support

[^1]: Like this footnote!

## Example App

This repository includes a complete example app in the `example/` directory that demonstrates all the features and shows how to use the component with **NativeWind** for styling.

### Running the Example

```bash
cd example
npm install
npm start
```

### NativeWind Integration

Use `cssInterop` to map Tailwind `className` props to the component's style slots:

```tsx
import { cssInterop } from 'nativewind';
import { MarkdownItRN } from 'markdown-it-rn';

const NativewindMarkdownItRN = cssInterop(MarkdownItRN, {
  rootClassName: { target: 'root' },
  paragraphClassName: { target: 'paragraph' },
  breakClassName: { target: 'break' },
  strongClassName: { target: 'strong' },
  emClassName: { target: 'em' },
  strikethroughClassName: { target: 'strikethrough' },
  h1ClassName: { target: 'h1' },
  h2ClassName: { target: 'h2' },
  h3ClassName: { target: 'h3' },
  h4ClassName: { target: 'h4' },
  h5ClassName: { target: 'h5' },
  h6ClassName: { target: 'h6' },
  linkClassName: { target: 'link' },
  imageClassName: { target: 'image' },
  codeBlockContainerClassName: { target: 'codeBlockContainer' },
  codeBlockTextClassName: { target: 'codeBlockText' },
  codeInlineClassName: { target: 'codeInline' },
  blockquoteClassName: { target: 'blockquote' },
  listUlClassName: { target: 'listUl' },
  listOlClassName: { target: 'listOl' },
  listItemClassName: { target: 'listItem' },
  listBulletClassName: { target: 'listBullet' },
  listContentClassName: { target: 'listContent' },
  hrClassName: { target: 'hr' },
  tableContainerClassName: { target: 'tableContainer' },
  tableTheadClassName: { target: 'tableThead' },
  tableTbodyClassName: { target: 'tableTbody' },
  tableRowClassName: { target: 'tableRow' },
  tableThClassName: { target: 'tableTh' },
  tableTdClassName: { target: 'tableTd' },
  tableThTextClassName: { target: 'tableThText' },
  tableTdTextClassName: { target: 'tableTdText' },
  checklistListClassName: { target: 'checklistList' },
  checklistItemClassName: { target: 'checklistItem' },
  checklistBoxClassName: { target: 'checklistBox' },
  checklistCheckedClassName: { target: 'checklistChecked' },
  checklistUncheckedClassName: { target: 'checklistUnchecked' },
  checklistLabelClassName: { target: 'checklistLabel' },
  footnotesContainerClassName: { target: 'footnotesContainer' },
  footnotesItemClassName: { target: 'footnotesItem' },
  footnotesRefClassName: { target: 'footnotesRef' },
  footnotesBackrefClassName: { target: 'footnotesBackref' },
  deflistContainerClassName: { target: 'deflistContainer' },
  deflistRowClassName: { target: 'deflistRow' },
  deflistDtClassName: { target: 'deflistDt' },
  deflistDdClassName: { target: 'deflistDd' },
});

// Usage with Tailwind classes
<NativewindMarkdownItRN
  md={markdown}
  rootClassName="p-3 gap-2"
  h1ClassName="mt-4 mb-2 text-4xl font-extrabold tracking-tight"
  paragraphClassName="leading-relaxed mb-3"
  linkClassName="underline text-blue-600"
  codeBlockContainerClassName="my-3 rounded-md border border-neutral-200"
  // ... other Tailwind classes
/>;
```

The example app demonstrates comprehensive markdown rendering with a clean, modern design using Tailwind CSS classes.

## Contributing

Contributions are welcome! Whether you want to:

- 🐛 Report bugs or issues
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🔧 Submit bug fixes or enhancements
- 🎨 Add new themes or styling options

Please feel free to open an issue or submit a pull request on GitHub.

### Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the example app: `cd example && npm install && npm start`
4. Make your changes and test them in the example app
5. Run linting: `npm run lint`
6. Submit a pull request

## License

MIT
