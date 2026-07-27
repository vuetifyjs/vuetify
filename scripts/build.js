import { spawn } from 'cross-spawn'

let target = process.argv[2]
const alias = {
  api: '@vuetify/api-generator',
  docs: 'vuetifyjs.com',
  dev: 'vuetify',
}
target = alias[target] || target

let result
if (!target) {
  result = spawn.sync('pnpm', ['run', '-r', '--stream', 'build'], { stdio: 'inherit' })
} else {
  result = spawn.sync('pnpm', ['run', '-r', '--filter', target, '--stream', '--reporter-hide-prefix', 'build'], { stdio: 'inherit' })
}

process.exitCode = result.status
