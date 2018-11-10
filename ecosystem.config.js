module.exports = {
  apps: [
    {
      name: 'vuetify',
      script: 'yarn.js',
      args: 'dev',
      cwd: './packages/vuetify/',
      env: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0'
      }
    },
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
      cwd: './packages/vuetify/',
      args: 'dev'
    }
  ]
}
