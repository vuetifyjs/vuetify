import os from 'node:os'
import { spawn } from 'cross-spawn'

const LOW_MEMORY_THRESHOLD = 16 * 1024 ** 3
const CONSTRAINED_CONCURRENCY = '2'

const args = process.argv.slice(2)

if (process.env.CI || os.freemem() < LOW_MEMORY_THRESHOLD) {
  const index = args.findIndex(arg => arg === '--concurrency' || arg.startsWith('--concurrency='))

  if (index === -1) {
    args.push('--concurrency', CONSTRAINED_CONCURRENCY)
  } else if (args[index] === '--concurrency') {
    args.splice(index, 2, '--concurrency', CONSTRAINED_CONCURRENCY)
  } else {
    args[index] = `--concurrency=${CONSTRAINED_CONCURRENCY}`
  }
}

const result = spawn.sync('pnpm', ['exec', 'eslint', '-f', 'codeframe', '--max-warnings', '0', ...args], {
  stdio: 'inherit',
  env: process.env,
})

process.exit(result.status ?? 1)
