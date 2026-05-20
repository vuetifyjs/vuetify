/// <reference types="@vitest/browser-playwright" />

import type { BrowserCommandContext } from 'vitest/node'

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

async function waitStable (ctx: BrowserCommandContext, selector: string) {
  const el = ctx.iframe.locator(selector)
  const handles = await el.elementHandles()
  if (handles.length > 1) {
    await Promise.all(
      handles.map(h => Promise.any([
        h.waitForElementState('stable', { timeout: 1000 }),
        h.waitForElementState('hidden', { timeout: 1000 }),
      ]))
    )
  } else {
    await Promise.all(
      handles.map(h =>
        h.waitForElementState('stable', { timeout: 1000 }),
      )
    )
  }
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
