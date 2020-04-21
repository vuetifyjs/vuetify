module.exports = {
  apps: [
    {
      name: 'vuetify-dev',
      script: 'yarn.js',
      cwd: './packages/vuetify/',
      args: 'dev',
    },
    {
      name: 'vuetify-build',
      script: 'yarn.js',
      cwd: './packages/vuetify/',
      args: 'watch',
      env: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'vuetify-docs',
      script: 'yarn.js',
      cwd: './packages/docs/',
      args: 'dev',
    },
  ],
}
