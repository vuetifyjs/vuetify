/// <reference types="@vitest/browser-playwright" />
/// <reference types="./percy.d.ts" />

import type { BrowserCommandContext } from 'vitest/node'
import percy from '@percy/sdk-utils'
import type { PercyOptions } from '@percy/sdk-utils'
import { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import path from 'upath'

const require = createRequire(import.meta.url)

const pkg = JSON.parse(readFileSync('../../package.json', 'utf8'))
const pwkg = JSON.parse(readFileSync(path.resolve(require.resolve('playwright'), '../package.json'), 'utf8'))
const CLIENT_INFO = `${pkg.name}/${pkg.version}`
const ENV_INFO = `${pwkg.name}/${pwkg.version}`

async function drag (ctx: BrowserCommandContext, start: [number, number], ...moves: number[][]) {
  const cdp = await ctx.provider.getCDPSession!(ctx.sessionId)
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: start[0], y: start[1] }],
  })
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: start[0], y: start[1] }],
  })
  for (const move of moves) {
    await cdp.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: move[0], y: move[1] }],
    })
  }
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [{ x: moves.at(-1)![0], y: moves.at(-1)![1] }],
  })
}

async function click (ctx: BrowserCommandContext, ...args: [string] | [number, number]) {
  if (args.length === 1) {
    const el = await ctx.page.$(args[0])
    await el?.click()
  } else {
    await ctx.page.mouse.click(...args)
  }
}

async function percySnapshot (ctx: BrowserCommandContext, name: string, options?: PercyOptions) {
  if (!(await percy.isPercyEnabled())) return

  const frame = await ctx.frame()
  try {
    const dom = await percy.fetchPercyDOM()
    await frame.addScriptTag({ content: dom })

    const domSnapshot = await frame.evaluate(opt => (window as any).PercyDOM.serialize(opt), options)

    await percy.postSnapshot({
      ...options,
      environmentInfo: ENV_INFO,
      clientInfo: CLIENT_INFO,
      url: ctx.page.url(),
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
  const el = ctx.iframe.locator(selector)
  await el.waitFor()
  await el.elementHandle().then(e => e?.waitForElementState('stable'))
}

async function waitForClickable (ctx: BrowserCommandContext, selector: string) {
  (await ctx.page.$(selector))?.click({ trial: true })
}

async function setFocusEmulationEnabled (ctx: BrowserCommandContext) {
  const cdp = await ctx.provider.getCDPSession!(ctx.sessionId)
  await cdp.send('Emulation.setFocusEmulationEnabled', { enabled: true })
}

async function setReduceMotionEnabled (ctx: BrowserCommandContext) {
  await ctx.page.emulateMedia({
    reducedMotion: 'reduce',
  })
}

/**
 * Use this to run some async code in only one test at a time
 *
 * ```js
 * const lock = await commands.getLock()
 * // no other code using getLock can run until this is done
 * await a()
 * await b()
 * await commands.releaseLock(lock)
 * ```
 */
async function getLock () {
  const _lastLock = getLock.lastLock

  const lock = Promise.withResolvers<void>()
  const id = getLock.lockCount++
  getLock.locks.set(id, lock)
  getLock.lastLock = lock.promise
  await _lastLock

  return id
}
getLock.lockCount = 0
getLock.locks = new Map<number, PromiseWithResolvers<void>>()
getLock.lastLock = Promise.resolve()

async function releaseLock (ctx: BrowserCommandContext, lock: number) {
  getLock.locks.get(lock)!.resolve()
}

let abortTimeout: ReturnType<typeof setTimeout>
function abortAfter (ctx: BrowserCommandContext, delay: number, name: string) {
  abortTimeout = setTimeout(async () => {
    // eslint-disable-next-line no-console
    console.error(`[Error] Test timeout: Aborting after ${delay}ms for ${name} in ${ctx.testPath}`)
    // eslint-disable-next-line no-console
    console.error('[Warning] "chrome" process might still be running and require manual shutdown.')
    process.exitCode = 1
    await ctx.project.vitest.exit(true)
  }, delay)
}

function clearAbortTimeout (ctx: BrowserCommandContext) {
  clearTimeout(abortTimeout)
}

export const commands = {
  drag,
  click,
  percySnapshot,
  waitStable,
  waitForClickable,
  setFocusEmulationEnabled,
  setReduceMotionEnabled,
  abortAfter,
  clearAbortTimeout,
  getLock,
  releaseLock,
}

export type CustomCommands = {
  [k in keyof typeof commands]: typeof commands[k] extends (ctx: any, ...args: infer A) => any
    ? (...args: A) => any
    : 'never'
}
