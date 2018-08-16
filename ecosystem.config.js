module.exports = {
  apps: [
    {
      name: 'vuetify',
      script: 'yarn.js',
      args: 'dev',
      env: {
        NODE_ENV: 'development',
        HOST: '0.0.0.0'
      }
    },
    {
      name: 'vuetify-build',
      script: 'yarn.js',
      args: 'watch',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
