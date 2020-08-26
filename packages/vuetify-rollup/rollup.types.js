import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import { rewriteSassPaths } from './scripts/rollup-plugins'

const createDts = () => {
  return [
    {
      input: 'src/index.ts',
      output: {
        dir: 'lib',
        format: 'es',
      },
      preserveModules: true,
      plugins: [
        typescript({
          clean: true,
          tsconfig: 'tsconfig.types.json',
        }),
      ],
    },
    {
      input: 'lib/index.d.ts',
      output: {
        file: 'dist/vuetify.d.ts',
        format: 'es',
      },
      plugins: [
        rewriteSassPaths(),
        dts(),
      ],
    },
  ]
}

export default createDts()
