/**
 * Type definitions for @najmiter/bulbul
 */

/**
 * Log utility for traceable console logging
 */
export declare const Log: {
  /**
   * Logs messages with automatic file path and line number tracking.
   *
   * When used with the Bulbul Babel plugin, this method automatically
   * receives the file path and line number as the last two arguments.
   * The output includes color-coded location information.
   *
   * @param args - Arguments to log. The last two arguments
   *               (added by the Babel plugin) are the file path
   *               and line number.
   *
   * @example
   * ```typescript
   * // In your code:
   * Log.traceable('User logged in', user.id);
   *
   * // Console output:
   * // [src/auth.js:42] User logged in 12345
   * ```
   *
   * @example
   * ```typescript
   * // Can also be called manually with location info:
   * Log.traceable('Debug info', 'src/app.js', 100);
   * // [src/app.js:100] Debug info
   * ```
   */
  traceable(...args: any[]): void;
};

/**
 * Type definition for the Log utility
 */
export type LogType = typeof Log;

/**
 * Babel plugin options for bulbul
 */
export interface BulbulPluginOptions {
  /**
   * Custom current working directory for calculating relative paths
   */
  cwd?: string;
}

declare const plugin: {
  (babel: any, options?: BulbulPluginOptions): {
    name: string;
    visitor: any;
  };
};

export default plugin;
