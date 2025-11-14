# Bulbul

A plugin for babel to get a traceable log. Life will still be painful but at you'll know where it's hurting.

## Setup

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    // everything else
    plugins: ['./plugins/log.js' /* everything else */],
    // everything else
  };
};
```

## Example

```ts
Log.traceable('nice'); // [another-ai-startup/dashboard.tsx:1045] nice
```
