import { spawn } from 'cross-spawn'

let target = process.argv[2]
const alias = {
  docs: 'vuetifyjs.com',
}
target = alias[target] || target || 'vuetify'

spawn('pnpm', ['run', '--filter', target, '--stream', 'dev'], { stdio: 'inherit' })
