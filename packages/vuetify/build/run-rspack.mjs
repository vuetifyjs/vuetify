import { rspack } from '@rspack/core'
import configs from './rspack.config.js'

rspack(configs, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({ preset: 'errors-warnings', colors: true }))
  if (stats.hasErrors()) process.exitCode = 1
})
