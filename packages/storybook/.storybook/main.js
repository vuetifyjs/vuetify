const path = require('path');

module.exports = {
  stories: [
    '../stories/*.stories.*'
  ],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
    './.storybook/addon-show-vue-markup/register.js',
  ],
};
