const spawn = require('cross-spawn')

spawn('yarn', ['lerna', 'run', 'watch', '--scope', 'storybook', '--scope', 'vuetify', '--parallel'], { stdio: 'inherit' })
