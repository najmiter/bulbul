const pathModule = require('path');

/**
 * Bulbul - Babel plugin for traceable logging
 *
 * Automatically injects file path and line number information into Log.traceable() calls.
 * This helps track the origin of console logs without manually adding location info.
 *
 * @example
 * // Before transformation:
 * Log.traceable('User logged in');
 *
 * // After transformation:
 * Log.traceable('User logged in', 'src/auth.js', 42);
 *
 * @param {Object} babel - Babel instance
 * @param {Object} babel.types - Babel types utility
 * @returns {Object} Babel plugin object
 */
module.exports = function ({ types: t }) {
  return {
    name: 'bulbul',
    visitor: {
      CallExpression(path, state) {
        const callee = path.get('callee');

        // Check if this is a Log.traceable() call
        if (
          callee.isMemberExpression() &&
          callee.get('object').isIdentifier({ name: 'Log' }) &&
          callee.get('property').isIdentifier({ name: 'traceable' })
        ) {
          const loc = path.node.loc;

          // Skip if no location information is available
          if (!loc) return;

          const args = path.node.arguments;

          // Skip if already transformed (has file path and line number at the end)
          if (
            args.length >= 2 &&
            t.isStringLiteral(args[args.length - 2]) &&
            t.isNumericLiteral(args[args.length - 1])
          ) {
            return;
          }

          // Get file information
          const file = state.file.opts.filename || state.filename || 'unknown';
          const line = loc.start.line;
          const cwd = state.cwd || state.opts?.cwd || process.cwd();

          // Calculate relative path from cwd
          let relativeFile;
          try {
            relativeFile = pathModule.relative(cwd, file);
          } catch (error) {
            // Fallback to absolute path if relative fails
            relativeFile = file;
          }

          // Inject file path and line number as last two arguments
          path.node.arguments.push(t.stringLiteral(relativeFile), t.numericLiteral(line));
        }
      },
    },
  };
};
