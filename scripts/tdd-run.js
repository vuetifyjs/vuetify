import { spawn } from 'cross-spawn'

const args = process.argv.slice(2)
const result = spawn.sync('pnpm', ['exec', 'vizzly', 'tdd', 'run', `pnpm test:browser ${args}`], {
  stdio: 'inherit',
  env: process.env,
})
process.exitCode = result.status
