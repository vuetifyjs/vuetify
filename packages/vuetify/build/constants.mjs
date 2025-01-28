import packageJson from '../package.json' with { type: 'json' }
import path from 'upath'
import { fileURLToPath } from 'url'

export const banner = `/*!
* Vuetify v${packageJson.version}
* Forged by John Leider
* Released under the MIT License.
*/\n`

export const root = path.resolve(fileURLToPath(import.meta.url), '../..')
export const srcDir = path.resolve(root, 'src')
export const libDir = path.resolve(root, 'lib')
export const unpluginLibDistDir = path.resolve(libDir, 'unplugin')
export const labsDir = path.resolve(srcDir, 'labs')

export const externals = Array.from(Object.keys(packageJson.devDependencies))
