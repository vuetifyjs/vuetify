/*
Produces production builds and stitches together d.ts files.

Shamelessly stolen from vue-next

# specify the format to output
yarn build --formats cjs
```
*/

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
// const { gzipSync } = require('zlib')
// const { compress } = require('brotli')
// const { targets: allTargets, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const prodOnly = !devOnly && (args.prodOnly || args.p)
const sourceMap = args.sourcemap || args.s
const isRelease = args.release
const buildTypes = args.t || args.types || isRelease
const watch = args.watch || args.w
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

run()

async function run () {
  // if (!targets.length) {
  //   await buildAll(allTargets)
  //   checkAllSizes(allTargets)
  // } else {
  //   await buildAll(fuzzyMatchTarget(targets, buildAllMatching))
  //   checkAllSizes(fuzzyMatchTarget(targets, buildAllMatching))
  // }
  build()
}

async function build () {
  const pkgDir = path.resolve()
  const pkg = require(`${pkgDir}/package.json`)

  // only build published packages for release
  if (isRelease && pkg.private) {
    return
  }

  // if building a specific format, do not remove dist.
  if (!formats) {
    await fs.remove('./dist')
    await fs.remove('./lib')
  }

  const env =
    (pkg.buildOptions && pkg.buildOptions.env) ||
    (devOnly ? 'development' : 'production')

  if (buildTypes && pkg.types) {
    console.log()
    console.log(
      chalk.bold(chalk.yellow('Rolling up type definitions...')),
    )

    await execa(
      'rollup',
      [
        '-c',
        'rollup.types.js',
      ],
      { stdio: 'inherit' },
    )
  }

  await execa(
    'rollup',
    [
      '-c',
      watch ? '-w' : '',
      '--environment',
      [
        `COMMIT:${commit}`,
        `NODE_ENV:${env}`,
        formats ? `FORMATS:${formats}` : ``,
        prodOnly ? `PROD_ONLY:true` : ``,
        sourceMap ? `SOURCE_MAP:true` : ``,
      ]
        .filter(Boolean)
        .join(','),
    ].filter(Boolean),
    { stdio: 'inherit' },
  )
}

// function checkAllSizes (targets) {
//   if (devOnly) {
//     return
//   }
//   console.log()
//   for (const target of targets) {
//     checkSize(target)
//   }
//   console.log()
// }

// function checkSize (target) {
//   const pkgDir = path.resolve(`packages/${target}`)
//   checkFileSize(`${pkgDir}/dist/${target}.global.prod.js`)
// }

// function checkFileSize (filePath) {
//   if (!fs.existsSync(filePath)) {
//     return
//   }
//   const file = fs.readFileSync(filePath)
//   const minSize = (file.length / 1024).toFixed(2) + 'kb'
//   const gzipped = gzipSync(file)
//   const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
//   const compressed = compress(file)
//   const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
//   console.log(
//     `${chalk.gray(
//       chalk.bold(path.basename(filePath)),
//     )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`,
//   )
// }
