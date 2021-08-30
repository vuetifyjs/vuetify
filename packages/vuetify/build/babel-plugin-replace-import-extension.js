function transformExtension(filepath, extMapping) {
  if (!filepath.startsWith('./') && !filepath.startsWith('../')) {
    // Package import
    return filepath;
  }

  const idx = filepath.lastIndexOf('.');
  if (idx === -1 || filepath.includes('/', idx)) {
    // No extension
    const newExt = extMapping[''];
    if (newExt) {
      return filepath + newExt;
    }
    return filepath;
  }

  for (const [origExt, newExt] of Object.entries(extMapping).sort(
    (a, b) => b[0].length - a[0].length
  )) {
    if (filepath.endsWith(origExt)) {
      return filepath.slice(0, -origExt.length) + newExt;
    }
  }
  return filepath;
}

function getOption(state, key) {
  const opts = state.opts || {};
  return opts[key];
}


module.exports = function ({types: t}) {
  return {
    visitor: {
      ImportDeclaration(path, state) {
        const extMapping = getOption(state, 'extMapping');
        if (!extMapping) {
          return;
        }
        const source = path.node.source;

        source.value = transformExtension(source.value, extMapping);
      },
      // For re-exporting
      'ExportNamedDeclaration|ExportAllDeclaration'(path, state) {
        const extMapping = getOption(state, 'extMapping');
        if (!extMapping) {
          return;
        }
        const source = path.node.source;
        if (source == null) {
          return;
        }

        source.value = transformExtension(source.value, extMapping);
      },
    },
  };
}
