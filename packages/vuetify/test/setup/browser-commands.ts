/// <reference types="@vitest/browser/providers/webdriverio" />
/// <reference types="./percy.d.ts" />

import type { BrowserCommandContext } from 'vitest/node'
import percy from '@percy/sdk-utils'
import type { PercyOptions } from '@percy/sdk-utils'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import path from 'upath'

const require = createRequire(import.meta.url)

const pkg = JSON.parse(readFileSync('../../package.json', 'utf8'))
const wdioPkg = JSON.parse(readFileSync(path.resolve(require.resolve('webdriverio'), '../../package.json'), 'utf8'))
const CLIENT_INFO = `${pkg.name}/${pkg.version}`
const ENV_INFO = `${wdioPkg.name}/${wdioPkg.version}`

function drag (ctx: BrowserCommandContext, start: [number, number], ...moves: number[][]) {
  const action = ctx.browser.action('pointer', {
    parameters: { pointerType: 'touch' },
  })
  action.move({ x: start[0], y: start[1] })
  action.down()
  for (const move of moves) {
    action.move({ x: move[0], y: move[1], duration: 10 })
  }
  action.up()
  return action.perform()
}

function scroll (ctx: BrowserCommandContext, x: number, y: number) {
  return ctx.browser.scroll(x, y)
}

function isDisplayed (ctx: BrowserCommandContext, selector: string, withinViewport = false) {
  return ctx.browser.$(selector).isDisplayed({ withinViewport })
}

async function percySnapshot (ctx: BrowserCommandContext, name: string, options?: PercyOptions) {
  if (!(await percy.isPercyEnabled())) return

  try {
    const dom = await percy.fetchPercyDOM()
    await ctx.browser.executeScript(dom, [])

    const domSnapshot = await ctx.browser.executeScript('return PercyDOM.serialize(arguments[0])', [options])

    await percy.postSnapshot({
      ...options,
      environmentInfo: ENV_INFO,
      clientInfo: CLIENT_INFO,
      url: await ctx.browser.getUrl(),
      domSnapshot,
      name,
    })
  } catch (err) {
    const log = percy.logger('webdriverio')
    log.error(`Could not take DOM snapshot "${name}"`)
    log.error(err)
  }
}

async function waitStable (ctx: BrowserCommandContext, selector: string) {
  return ctx.browser.$(selector).waitForStable()
}

async function setFocusEmulationEnabled (ctx: BrowserCommandContext) {
  return ctx.browser.sendCommand('Emulation.setFocusEmulationEnabled', { enabled: true })
}

export const commands = { drag, scroll, isDisplayed, percySnapshot, waitStable, setFocusEmulationEnabled }

export type CustomCommands = {
  [k in keyof typeof commands]: typeof commands[k] extends (ctx: any, ...args: infer A) => any
    ? (...args: A) => any
    : 'never'
}
