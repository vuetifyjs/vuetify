import { spawn } from 'cross-spawn'
import { getVizzlyInfo } from '@vizzly-testing/cli/client'

const args = process.argv.slice(2)

const command = getVizzlyInfo().ready
  ? ['test:browser', ...args]
  : ['exec', 'vizzly', 'tdd', 'run', `pnpm test:browser ${args}`]

process.env.TEST_TDD_ONLY = 1
const result = spawn.sync('pnpm', command, {
  stdio: 'inherit',
  env: process.env,
})
process.exitCode = result.status
