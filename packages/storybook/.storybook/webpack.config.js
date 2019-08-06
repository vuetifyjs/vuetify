const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias['~storybook'] = path.resolve(__dirname)

  config.module.rules.push({
    resourceQuery: /blockType=story/,
    loader: 'vue-storybook'
  })

  return config;
};
