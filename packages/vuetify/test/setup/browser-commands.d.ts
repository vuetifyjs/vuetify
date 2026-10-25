import type { BrowserCommandContext } from 'vitest/node';
declare function drag(ctx: BrowserCommandContext, start: [number, number], ...moves: number[][]): Promise<void>;
declare function click(ctx: BrowserCommandContext, ...args: [string] | [number, number]): Promise<void>;
declare function waitStable(ctx: BrowserCommandContext, selector: string): Promise<void>;
declare function waitForClickable(ctx: BrowserCommandContext, selector: string): Promise<void>;
declare function isClickable(ctx: BrowserCommandContext, selector: string, timeout?: number): Promise<boolean>;
declare function setFocusEmulationEnabled(ctx: BrowserCommandContext): Promise<void>;
declare function setFocusEmulationDisabled(ctx: BrowserCommandContext): Promise<void>;
declare function setReduceMotionEnabled(ctx: BrowserCommandContext): Promise<void>;
declare function setReduceMotionDisabled(ctx: BrowserCommandContext): Promise<void>;
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
declare function getLock(): Promise<number>;
declare namespace getLock {
    var lockCount: number;
    var locks: Map<number, PromiseWithResolvers<void>>;
    var lastLock: Promise<void>;
}
declare function releaseLock(ctx: BrowserCommandContext, lock: number): Promise<void>;
declare function abortAfter(ctx: BrowserCommandContext, delay: number, name: string): void;
declare function clearAbortTimeout(ctx: BrowserCommandContext): void;
export declare const commands: {
    drag: typeof drag;
    click: typeof click;
    waitStable: typeof waitStable;
    waitForClickable: typeof waitForClickable;
    isClickable: typeof isClickable;
    setFocusEmulationEnabled: typeof setFocusEmulationEnabled;
    setFocusEmulationDisabled: typeof setFocusEmulationDisabled;
    setReduceMotionEnabled: typeof setReduceMotionEnabled;
    setReduceMotionDisabled: typeof setReduceMotionDisabled;
    abortAfter: typeof abortAfter;
    clearAbortTimeout: typeof clearAbortTimeout;
    getLock: typeof getLock;
    releaseLock: typeof releaseLock;
};
export type CustomCommands = {
    [k in keyof typeof commands]: typeof commands[k] extends (ctx: any, ...args: infer A) => any ? (...args: A) => any : 'never';
};
export {};
