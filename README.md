# markdown-it-rn

React Native renderer for markdown-it, with NativeWind-compatible `className` styling out of the box.

## Install

```bash
npm i markdown-it-rn
# peer deps expected in your app:
npm i react react-native nativewind
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
      className="p-4"
      onLinkPress={(href) => console.log('open', href)}
    />
  );
}
```

### Advanced Usage with Custom Styling

```tsx
import React from 'react';
import { Linking } from 'react-native';
import { MarkdownItRN } from 'markdown-it-rn';

const customClasses = {
  heading: {
    h1: 'text-3xl font-bold text-blue-600 mb-4',
    h2: 'text-2xl font-semibold text-gray-800 mb-3',
  },
  paragraph: 'text-gray-700 mb-2 leading-6',
  link: 'text-blue-500 underline',
  codeBlock: {
    container: 'bg-gray-100 rounded-lg p-4 my-3',
    text: 'font-mono text-sm text-gray-800',
  },
};

export default function Screen() {
  return (
    <MarkdownItRN
      md={`# Custom Styled Markdown\n\nThis is a paragraph with [a link](https://example.com).\n\n\`\`\`javascript\nconsole.log('Hello World');\n\`\`\``}
      className="p-6 bg-white"
      classes={customClasses}
      onLinkPress={(href) => Linking.openURL(href)}
      configure={(md) => md.enable(['linkify', 'typographer'])}
      autoUnfence={true}
    />
  );
}
```

### Using Default Classes

```tsx
import React from 'react';
import { MarkdownItRN, defaultClasses } from 'markdown-it-rn';

export default function Screen() {
  return (
    <MarkdownItRN
      md={`# Using Default Styles\n\nThis uses the built-in default styling.`}
      classes={defaultClasses}
    />
  );
}
```

## API Reference

### Props

| Prop          | Type                             | Required | Default          | Description                                   |
| ------------- | -------------------------------- | -------- | ---------------- | --------------------------------------------- |
| `md`          | `string`                         | ✅       | -                | Markdown string to render                     |
| `className`   | `string`                         | ❌       | `''`             | Root container classes (NativeWind)           |
| `classes`     | `ClassMap`                       | ❌       | `defaultClasses` | Fine-grained style overrides for each element |
| `onLinkPress` | `(href: string) => void`         | ❌       | -                | Handler for link taps                         |
| `configure`   | `(md: MarkdownIt) => MarkdownIt` | ❌       | -                | Customize markdown-it instance                |
| `autoUnfence` | `boolean`                        | ❌       | `true`           | Unwrap pasted ```md fenced blocks             |

## Styling

### Container Styling

Use the `className` prop to style the root container:

```tsx
<MarkdownItRN md="# Hello" className="p-4 bg-white rounded-lg shadow-md" />
```

### Element-Specific Styling

Use the `classes` prop to override styles for specific markdown elements. All classes accept NativeWind/Tailwind CSS class strings.

## Overrideable Style Attributes

The following table shows all the style attributes that can be overridden through the `classes` prop:

| Element              | Attribute Path        | Type     | Description                | Default Example                                                                                                       |
| -------------------- | --------------------- | -------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Root Container**   | `root`                | `string` | Root container styling     | `'p-3 gap-2'`                                                                                                         |
| **Text Elements**    |                       |          |                            |                                                                                                                       |
|                      | `paragraph`           | `string` | Paragraph text styling     | `'text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3'`                                                       |
|                      | `break`               | `string` | Line break styling         | `''`                                                                                                                  |
|                      | `strong`              | `string` | Bold text styling          | `'font-bold text-neutral-700 dark:text-neutral-300'`                                                                  |
|                      | `em`                  | `string` | Italic text styling        | `'italic text-neutral-700 dark:text-neutral-300'`                                                                     |
|                      | `strikethrough`       | `string` | Strikethrough text styling | `'line-through text-neutral-700 dark:text-dark-neutral-300'`                                                          |
| **Headings**         |                       |          |                            |                                                                                                                       |
|                      | `heading.h1`          | `string` | H1 heading styling         | `'mt-4 mb-2 text-4xl font-extrabold tracking-tight text-neutral-700 dark:text-neutral-300'`                           |
|                      | `heading.h2`          | `string` | H2 heading styling         | `'mt-3 mb-2 text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300'`                                |
|                      | `heading.h3`          | `string` | H3 heading styling         | `'mt-3 mb-2 text-2xl font-semibold text-neutral-700 dark:text-neutral-300'`                                           |
|                      | `heading.h4`          | `string` | H4 heading styling         | `'mt-2 mb-1 text-xl font-semibold text-neutral-700 dark:text-neutral-300'`                                            |
|                      | `heading.h5`          | `string` | H5 heading styling         | `'mt-2 mb-1 text-lg font-medium text-neutral-700 dark:text-neutral-300'`                                              |
|                      | `heading.h6`          | `string` | H6 heading styling         | `'mt-1 mb-1 text-sm font-medium uppercase tracking-wide text-neutral-600 dark:text-dark-neutral-400'`                 |
| **Links & Media**    |                       |          |                            |                                                                                                                       |
|                      | `link`                | `string` | Link styling               | `'underline text-neutral-500 dark:text-neutral-400'`                                                                  |
|                      | `image`               | `string` | Image styling              | `'w-full h-48 my-3 rounded-md'`                                                                                       |
| **Code**             |                       |          |                            |                                                                                                                       |
|                      | `codeBlock.container` | `string` | Code block container       | `'my-3 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700'`              |
|                      | `codeBlock.text`      | `string` | Code block text            | `'font-mono text-sm p-3 text-neutral-700 dark:text-neutral-300'`                                                      |
|                      | `codeInline`          | `string` | Inline code styling        | `'font-mono text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300'` |
| **Block Elements**   |                       |          |                            |                                                                                                                       |
|                      | `blockquote`          | `string` | Blockquote styling         | `'border-l-4 pl-3 my-3 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 italic'`     |
|                      | `hr`                  | `string` | Horizontal rule styling    | `'my-4 h-px bg-neutral-300 dark:bg-neutral-600'`                                                                      |
| **Lists**            |                       |          |                            |                                                                                                                       |
|                      | `list.ul`             | `string` | Unordered list container   | `'my-2 ml-5'`                                                                                                         |
|                      | `list.ol`             | `string` | Ordered list container     | `'my-2 ml-5'`                                                                                                         |
|                      | `list.item`           | `string` | List item styling          | `'flex-row items-start mb-1'`                                                                                         |
|                      | `list.bullet`         | `string` | List bullet/number styling | `'w-5 text-left text-neutral-700 dark:text-neutral-300'`                                                              |
|                      | `list.content`        | `string` | List item content          | `'flex-1'`                                                                                                            |
| **Tables**           |                       |          |                            |                                                                                                                       |
|                      | `table.container`     | `string` | Table container            | `'border border-neutral-300 dark:border-neutral-600 my-3 rounded-md overflow-hidden'`                                 |
|                      | `table.thead`         | `string` | Table header section       | `'bg-neutral-50 dark:bg-neutral-900'`                                                                                 |
|                      | `table.tbody`         | `string` | Table body section         | `''`                                                                                                                  |
|                      | `table.row`           | `string` | Table row styling          | `'flex-row'`                                                                                                          |
|                      | `table.th`            | `string` | Table header cell          | `'p-3 border border-neutral-300 dark:border-neutral-600 font-semibold text-left'`                                     |
|                      | `table.td`            | `string` | Table data cell            | `'p-3 border border-neutral-200 dark:border-neutral-700 text-left flex-1'`                                            |
|                      | `table.thText`        | `string` | Table header text          | `'text-neutral-700 dark:text-neutral-300'`                                                                            |
|                      | `table.tdText`        | `string` | Table data text            | `'text-neutral-700 dark:text-neutral-300'`                                                                            |
| **Checklists**       |                       |          |                            |                                                                                                                       |
|                      | `checklist.list`      | `string` | Checklist container        | `'my-2'`                                                                                                              |
|                      | `checklist.item`      | `string` | Checklist item             | `'flex-row items-center gap-2 mb-2'`                                                                                  |
|                      | `checklist.box`       | `string` | Checkbox styling           | `'w-5 h-5 text-center border border-neutral-400 dark:border-neutral-600 rounded-sm'`                                  |
|                      | `checklist.checked`   | `string` | Checked checkbox           | `'bg-neutral-700 dark:bg-neutral-300 text-white dark:text-black'`                                                     |
|                      | `checklist.unchecked` | `string` | Unchecked checkbox         | `'text-neutral-400 dark:text-neutral-600'`                                                                            |
|                      | `checklist.label`     | `string` | Checklist label            | `'text-neutral-700 dark:text-neutral-300'`                                                                            |
| **Footnotes**        |                       |          |                            |                                                                                                                       |
|                      | `footnotes.container` | `string` | Footnotes container        | `'mt-6 pt-4 border-t border-neutral-300 dark:border-neutral-600'`                                                     |
|                      | `footnotes.list`      | `string` | Footnotes list             | `''`                                                                                                                  |
|                      | `footnotes.item`      | `string` | Footnote item              | `'flex-row gap-2 mb-1'`                                                                                               |
|                      | `footnotes.ref`       | `string` | Footnote reference         | `'text-neutral-500 dark:text-neutral-400 font-mono text-xs'`                                                          |
|                      | `footnotes.backref`   | `string` | Footnote back reference    | `'text-neutral-500 dark:text-neutral-400 font-mono text-xs'`                                                          |
|                      | `footnotes.content`   | `string` | Footnote content           | `''`                                                                                                                  |
| **Definition Lists** |                       |          |                            |                                                                                                                       |
|                      | `deflist.container`   | `string` | Definition list container  | `'my-3'`                                                                                                              |
|                      | `deflist.row`         | `string` | Definition row             | `'mb-2'`                                                                                                              |
|                      | `deflist.dt`          | `string` | Definition term            | `'font-semibold text-neutral-700 dark:text-neutral-300'`                                                              |
|                      | `deflist.dd`          | `string` | Definition description     | `'pl-4 text-neutral-700 dark:text-neutral-300'`                                                                       |

### Example: Custom Theme

```tsx
const darkTheme = {
  root: 'bg-gray-900 p-4',
  paragraph: 'text-gray-100 mb-3',
  heading: {
    h1: 'text-white text-3xl font-bold mb-4',
    h2: 'text-gray-200 text-2xl font-semibold mb-3',
  },
  link: 'text-blue-400 underline',
  codeBlock: {
    container: 'bg-gray-800 rounded-lg border border-gray-700',
    text: 'text-green-400 font-mono p-3',
  },
};

<MarkdownItRN md={markdown} classes={darkTheme} />;
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
    // Disable a plugin
    md.disable('linkify');

    // Enable typographer
    md.enable('typographer');

    // Add custom plugins
    // md.use(customPlugin);

    return md;
  }}
/>
```

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

GPL-3.0-or-later
