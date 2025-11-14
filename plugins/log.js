const pathModule = require('path');

module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path, state) {
        const callee = path.get('callee');

        if (
          callee.isMemberExpression() &&
          callee.get('object').isIdentifier({ name: 'Log' }) &&
          callee.get('property').isIdentifier({ name: 'traceable' })
        ) {
          const loc = path.node.loc;

          if (!loc) return;

          const args = path.node.arguments;

          if (
            args.length >= 2 &&
            t.isStringLiteral(args[args.length - 2]) &&
            t.isNumericLiteral(args[args.length - 1])
          ) {
            return;
          }

          const file = state.file.opts.filename || '';
          const line = loc.start.line;
          const cwd = state.cwd || process.cwd();
          const relativeFile = pathModule.relative(cwd, file);

          path.node.arguments.push(t.stringLiteral(relativeFile), t.numericLiteral(line));
        }
      },
    },
  };
};
