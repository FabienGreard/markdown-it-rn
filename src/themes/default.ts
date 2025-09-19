import type { ClassMap } from '../types';

export const defaultClasses = {
  root: 'p-3 gap-2',

  paragraph: 'text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3',

  break: '',
  strong: 'font-bold text-neutral-700 dark:text-neutral-300',
  em: 'italic text-neutral-700 dark:text-neutral-300',
  strikethrough: 'line-through text-neutral-700 dark:text-dark-neutral-300',

  heading: {
    h1: 'mt-4 mb-2 text-4xl font-extrabold tracking-tight text-neutral-700 dark:text-neutral-300',
    h2: 'mt-3 mb-2 text-3xl font-bold tracking-tight text-neutral-700 dark:text-neutral-300',
    h3: 'mt-3 mb-2 text-2xl font-semibold text-neutral-700 dark:text-neutral-300',
    h4: 'mt-2 mb-1 text-xl font-semibold text-neutral-700 dark:text-neutral-300',
    h5: 'mt-2 mb-1 text-lg font-medium text-neutral-700 dark:text-neutral-300',
    h6: 'mt-1 mb-1 text-sm font-medium uppercase tracking-wide text-neutral-600 dark:text-dark-neutral-400',
  },

  link: 'underline text-neutral-500 dark:text-neutral-400',

  image: 'w-full h-48 my-3 rounded-md',

  codeBlock: {
    container:
      'my-3 bg-neutral-100 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700',
    text: 'font-mono text-sm p-3 text-neutral-700 dark:text-neutral-300',
  },

  codeInline:
    'font-mono text-sm bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-700 dark:text-neutral-300',

  blockquote:
    'border-l-4 pl-3 my-3 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 italic',

  list: {
    ul: 'my-2 ml-5',
    ol: 'my-2 ml-5',
    item: 'flex-row items-start mb-1',
    bullet: 'w-5 text-left text-neutral-700 dark:text-neutral-300',
    content: 'flex-1',
  },

  hr: 'my-4 h-px bg-neutral-300 dark:bg-neutral-600',

  table: {
    container: 'border border-neutral-300 dark:border-neutral-600 my-3 rounded-md overflow-hidden',
    thead: 'bg-neutral-50 dark:bg-neutral-900',
    tbody: '',
    row: 'flex-row',
    th: 'p-3 border border-neutral-300 dark:border-neutral-600 font-semibold text-left',
    td: 'p-3 border border-neutral-200 dark:border-neutral-700 text-left flex-1',
    thText: 'text-neutral-700 dark:text-neutral-300',
    tdText: 'text-neutral-700 dark:text-neutral-300',
  },

  checklist: {
    list: 'my-2',
    item: 'flex-row items-center gap-2 mb-2',
    box: 'w-5 h-5 text-center border border-neutral-400 dark:border-neutral-600 rounded-sm',
    checked: 'bg-neutral-700 dark:bg-neutral-300 text-white dark:text-black',
    unchecked: 'text-neutral-400 dark:text-neutral-600',
    label: 'text-neutral-700 dark:text-neutral-300',
  },

  footnotes: {
    container: 'mt-6 pt-4 border-t border-neutral-300 dark:border-neutral-600',
    item: 'flex-row gap-2 mb-1',
    ref: 'text-neutral-500 dark:text-neutral-400 font-mono text-xs',
    backref: 'text-neutral-500 dark:text-neutral-400 font-mono text-xs',
  },

  deflist: {
    container: 'my-3',
    row: 'mb-2',
    dt: 'font-semibold text-neutral-700 dark:text-neutral-300',
    dd: 'pl-4 text-neutral-700 dark:text-neutral-300',
  },
} satisfies ClassMap;
