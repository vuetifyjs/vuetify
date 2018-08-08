// PM2 process file
// http://pm2.keymetrics.io/docs/usage/application-declaration/

module.exports = {
  apps: [{
    name: 'vuetify-docs',
    script: 'yarn.js',
    args: 'dev'
  }]
}
