module.exports = {
  apps: [
    {
      name: 'vuetify-build',
      script: 'yarn.js',
      cwd: './packages/vuetify/',
      args: 'watch',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'vuetify-docs',
      script: 'yarn.js',
      cwd: './packages/docs/',
      args: 'dev'
    },
    {
      name: 'vuetify-kitchen',
      script: 'yarn.js',
      cwd: './packages/kitchen/',
      args: 'serve'
    },
    {
      name: 'vuetify-playground',
      script: 'yarn.js',
      cwd: './packages/playground/',
      args: 'serve'
    }
  ]
}
