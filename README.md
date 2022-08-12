# esbuild-plugin-replace-regex

[![npm](https://img.shields.io/npm/v/esbuild-plugin-replace-regex.svg)](https://www.npmjs.com/package/esbuild-plugin-replace-regex)

Simple esbuild plugin for replacing file content while bundling.

## Installation

```console
npm i esbuild-plugin-replace-regex --save-dev
```

## Usage

```js
const replacePlugin = require('esbuild-plugin-replace-regex');

...
plugins: [
  replacePlugin({
    filter: /myfile/,
    patterns: [
      ['VERSION', 'v7.7.7'],
      [/myfunc\((.+?)\)/g, (m, arg) => `replaced(123, ${arg})`],
    ]
  })
]
...
```

## Options

```js
{
  filter = /.*/,
  loader = "tsx",
  encoding = "utf-8",
  patterns = []
}
```
