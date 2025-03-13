import spawn from 'cross-spawn'

const args = process.argv.slice(2)

let child

if (process.platform === 'win32') {
  // pnpm test -i
  child = spawn('pnpm.cmd', ['test:win32', ...args], { stdio: 'inherit' })
} else {
  // pnpm test
  child = spawn('pnpm', ['test:unix', ...args], { stdio: 'inherit' })
}

child.on('exit', process.exit)
