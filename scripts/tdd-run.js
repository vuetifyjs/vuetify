import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { spawn } from 'cross-spawn'
import { getVizzlyInfo } from '@vizzly-testing/cli/client'

async function main () {
  const args = process.argv.slice(2)

  const ready = getVizzlyInfo().ready

  if (!ready) {
    spawn.sync('pnpm', ['exec', 'vizzly', 'tdd', 'start'], {
      stdio: 'inherit',
      env: process.env,
    })
    process.once('exit', () => {
      spawn.sync('pnpm', ['exec', 'vizzly', 'tdd', 'stop'], {
        stdio: 'inherit',
        env: process.env,
      })
    })
  }

  process.env.TEST_TDD_ONLY = 1
  const result = spawn.sync('pnpm', ['test:browser', ...args], {
    stdio: 'inherit',
    env: process.env,
  })

  if (!ready && result.status !== 0) {
    const rl = readline.createInterface({ input, output })
    rl.setPrompt('Press any key to continue...')
    rl.prompt()
    await new Promise(resolve => {
      rl.input.on('keypress', (str, key) => {
        rl.close()
        resolve()
      })
    })
  }

  process.exit(result.status)
}
void main()
