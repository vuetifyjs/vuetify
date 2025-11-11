import { throttle } from '../throttle'

// Utilities
import { wait } from '@test'

describe('throttle', () => {
  it('should execute only the calls right before the interval', { retry: 1 }, async () => {
    const result = [] as number[]
    const pushThrottled = throttle((v: number) => result.push(v), 100, { leading: false, trailing: false })

    let lastId = 0
    const interval = setInterval(() => pushThrottled(++lastId), 30)
    await wait(280)
    clearInterval(interval)

    expect(result).toStrictEqual([5, 9])
  })

  it('should execute only the calls right before the interval + trailing one', { retry: 1 }, async () => {
    const result = [] as number[]
    const pushThrottled = throttle((v: number) => result.push(v), 100, { leading: false, trailing: true })

    let lastId = 0
    const interval = setInterval(() => pushThrottled(++lastId), 30)
    await wait(280)
    clearInterval(interval)
    await wait(100)

    expect(result).toStrictEqual([4, 7, 9])
  })

  it('should keep throttling after executing trailing call', { retry: 1 }, async () => {
    const result = [] as number[]
    const pushThrottled = throttle((v: number) => result.push(v), 100, { leading: false, trailing: true })

    let lastId = 0
    setTimeout(() => pushThrottled(++lastId), 0)
    setTimeout(() => pushThrottled(++lastId), 40)
    setTimeout(() => pushThrottled(++lastId), 180)
    setTimeout(() => pushThrottled(++lastId), 190)
    await wait(280)

    expect(result).toStrictEqual([2, 4])
  })

  it('should execute only the calls right before the interval + leading and trailing', { retry: 1 }, async () => {
    const result = [] as number[]
    const pushThrottled = throttle((v: number) => result.push(v), 100)

    let lastId = 0
    const interval = setInterval(() => pushThrottled(++lastId), 30)
    await wait(280)
    clearInterval(interval)
    await wait(100)

    expect(result).toStrictEqual([1, 4, 7, 9])
  })

  it('should pass calls the same way when resumed', { retry: 1 }, async () => {
    const result = [] as number[]
    const pushThrottled = throttle((v: number) => result.push(v), 100)

    let lastId = 0
    let interval = setInterval(() => pushThrottled(++lastId), 30)
    await wait(280)
    clearInterval(interval)
    await wait(150)

    lastId = 200
    interval = setInterval(() => pushThrottled(++lastId), 30)
    await wait(280)
    clearInterval(interval)
    await wait(100)

    expect(result).toStrictEqual([1, 4, 7, 9, 201, 204, 207, 209])
  }, { retry: 1 })
})
