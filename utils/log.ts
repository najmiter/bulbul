export const Log = {
  traceable(...args: any[]) {
    const file = args[args.length - 2];
    const line = args[args.length - 1];

    let origin = 'unknown';

    if (typeof file === 'string' && typeof line === 'number') {
      args.pop(); // remove line
      args.pop(); // remove file

      // frozi rng
      origin = `\x1b[36m${file}:${line}\x1b[0m`;
    }

    console.log(`[${origin}]`, ...args);
  },
};
