# Bulbul

A plugin for babel to get a traceable log. Life will still be painful but at least you'll know where it's hurting.

> [!TIP]
> Make sure to clear the babel cache before restarting the server or whatever.
> It depends on what tool you're using, but it should be pretty straightforward on how you can do that.

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
