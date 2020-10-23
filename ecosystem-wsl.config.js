// PM2 process file
// http://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [
    {
      name: 'vuetify-dev',
      script: 'yarn',
      cwd: './packages/vuetify/',
      args: 'dev',
      interpreter: '/bin/bash',
    },
    {
      name: 'vuetify-build',
      script: 'yarn',
      cwd: './packages/vuetify/',
      args: 'watch',
      env: {
        NODE_ENV: 'production',
      },
      interpreter: '/bin/bash',
    },
    {
      name: 'vuetify-docs',
      script: 'yarn',
      cwd: './packages/docs/',
      args: 'dev',
      interpreter: '/bin/bash',
    },
  ],
}
