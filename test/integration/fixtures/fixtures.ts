import { readFile as _readFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

import { compileToFunctions } from 'vue-template-compiler'
import parse from 'posthtml-parser'
import render from 'posthtml-render'

import { pascalizeTree } from './transformTree'

const readFile = promisify(_readFile)

const kitchensink = readFile(resolve(__dirname, './kitchensink.html'), 'utf8')

export const pascalSink = kitchensink
  .then(text => {
    const ast = parse(text)
    const newAst = pascalizeTree(ast)
    const output = render(newAst)
    return output
  })
  .then(compileToFunctions)

export const kebabSink = kitchensink.then(compileToFunctions)
