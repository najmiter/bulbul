/**
 * Log utility for traceable console logging
 *
 * Works in conjunction with the Bulbul Babel plugin to provide
 * file and line number information for each log statement.
 */
export const Log = {
  /**
   * Logs messages with automatic file path and line number tracking.
   *
   * When used with the Bulbul Babel plugin, this method automatically
   * receives the file path and line number as the last two arguments.
   * The output includes color-coded location information.
   *
   * @param {...any} args - Arguments to log. The last two arguments
   *                        (added by the Babel plugin) are the file path
   *                        and line number.
   *
   * @example
   * // In your code:
   * Log.traceable('User logged in', user.id);
   *
   * // Console output:
   * // [src/auth.js:42] User logged in 12345
   *
   * @example
   * // Can also be called manually with location info:
   * Log.traceable('Debug info', 'src/app.js', 100);
   * // [src/app.js:100] Debug info
   */
  traceable(...args: any[]) {
    if (args.length === 0) {
      console.log('[unknown]');
      return;
    }

    if (args.length === 1) {
      console.log('[unknown]', args[0]);
      return;
    }

    const file = args[args.length - 2];
    const line = args[args.length - 1];

    let origin = 'unknown';

    if (typeof file === 'string' && file.length > 0 && typeof line === 'number' && Number.isInteger(line) && line > 0) {
      args.pop(); // remove line
      args.pop(); // remove file

      // file name: #615fff & line number: #ff637e
      origin = `\x1b[38;2;97;95;255m${file}\x1b[0m:\x1b[38;2;255;99;126m${line}\x1b[0m`;
    }

    if (args.length === 0) {
      console.log(`[${origin}]`);
    } else {
      console.log(`[${origin}]`, ...args);
    }
  },
};

/**
 * Type definition for the Log utility
 */
export type LogType = typeof Log;
