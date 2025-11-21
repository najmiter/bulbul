# 🐦 Bulbul

A Babel plugin for traceable logging that automatically injects file path and line number information into your logs. Life will still be painful, but at least you'll know where it's hurting.

[![npm version](https://badge.fury.io/js/@najmiter%2Fbulbul.svg)](https://www.npmjs.com/package/@najmiter/bulbul)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Automatic Location Tracking** - No more manual file/line annotations
- 🎨 **Color-Coded Output** - Easy-to-spot location info in cyan
- 🔧 **Zero Runtime Config** - Set it up once in Babel and forget about it
- 📦 **Tiny Footprint** - Minimal overhead, maximum utility
- 💪 **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install --save-dev @najmiter/bulbul
```

or

```bash
yarn add -D @najmiter/bulbul
```

## Setup

### 1. Configure Babel

Add the plugin to your Babel configuration:

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // your presets
    ],
    plugins: [
      '@najmiter/bulbul',
      // other plugins
    ],
  };
};
```

Or in `.babelrc`:

```json
{
  "plugins": ["@najmiter/bulbul"]
}
```

### 2. Import the Log Utility

```typescript
// For TypeScript/ES6
import { Log } from '@najmiter/bulbul/utils';

// For CommonJS
const { Log } = require('@najmiter/bulbul/utils');
```

### 3. Use It!

```typescript
Log.traceable('User logged in', userId);
// Output: [src/auth/login.ts:42] User logged in 12345

Log.traceable('Processing payment', { amount: 100, currency: 'USD' });
// Output: [src/payments/processor.ts:156] Processing payment { amount: 100, currency: 'USD' }
```

## How It Works

The Babel plugin automatically transforms your code at build time:

**Before transformation:**

```typescript
Log.traceable('Something happened', data);
```

**After transformation:**

```typescript
Log.traceable('Something happened', data, 'src/app.ts', 42);
```

The `Log.traceable()` method then extracts the file path and line number, displays them in a color-coded format, and logs your message.

## API

### `Log.traceable(...args: any[]): void`

Logs messages with automatic file path and line number tracking.

**Parameters:**

- `...args` - Any number of arguments to log (the plugin automatically appends file path and line number)

**Example:**

```typescript
Log.traceable('Debug message');
// [src/index.ts:10] Debug message

Log.traceable('User data:', { name: 'John', age: 30 });
// [src/users.ts:25] User data: { name: 'John', age: 30 }

Log.traceable('Error occurred:', error);
// [src/api.ts:101] Error occurred: [Error object]
```

## Configuration

### Custom Working Directory

You can specify a custom working directory for relative path calculation:

```js
// babel.config.js
module.exports = {
  plugins: [['@najmiter/bulbul', { cwd: '/custom/path' }]],
};
```

## Important Notes

> [!TIP] > **Clear Babel Cache:** Make sure to clear the Babel cache when you first add the plugin or make configuration changes. The method depends on your build tool:
>
> - **Metro (React Native):** `npm start -- --reset-cache` or `bun start --reset-cache`
> - **Next.js:** Delete `.next` folder
> - **General:** Delete `node_modules/.cache/babel-loader`

> [!WARNING]
> This plugin is designed for **development use only**. Consider removing it in production builds to avoid exposing file paths and to reduce bundle size.

## Usage with Popular Frameworks

### React / Next.js

```js
// next.config.js
module.exports = {
  // ... other config
  babel: {
    plugins: ['@najmiter/bulbul'],
  },
};
```

### React Native

```js
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['@najmiter/bulbul'],
};
```

### Node.js with Babel

```js
// babel.config.js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
  plugins: ['@najmiter/bulbul'],
};
```

## TypeScript Support

Full TypeScript definitions are included. The plugin works seamlessly with TypeScript when using Babel for transpilation (e.g., with `@babel/preset-typescript`).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [najmiter](https://github.com/najmiter)

## Repository

[https://github.com/najmiter/bulbul](https://github.com/najmiter/bulbul)

---

**Made with 💜 for developers who are tired of `console.log` hide and seek**
