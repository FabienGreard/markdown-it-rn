# markdown-it-rn Example

Demonstrates all features with NativeWind integration.

## Prerequisites

- Node.js 20+

## Quick Start

```bash
npm install
npm start
# Then: npm run ios/android/web
```

## Features

```tsx
// Basic
<MarkdownItRN md="# Hello" />

// Custom styles
<MarkdownItRN md="# Styled" styles={{ h1: { fontSize: 24 } }} />

// NativeWind
<NativewindMarkdownItRN h1ClassName="text-4xl font-bold" />

// Plugins
<MarkdownItRN configure={(md) => md.use(emojiPlugin)} />

// Links
<MarkdownItRN onLinkPress={(href) => Linking.openURL(href)} />
```
