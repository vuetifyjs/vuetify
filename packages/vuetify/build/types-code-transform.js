/**
 * @param code {string}
 * @returns {string}
 */
export function codeTransform (code) {
  return code
    // ignore missing vue-router
    .replaceAll(/import([^;])*?from 'vue-router'/gm, '// @ts-ignore\n$&')
    // tsc adds extra export statements to namespaces that break module augmentation
    .replaceAll(/^\s*export \{\s*\};?$/gm, '')
}
