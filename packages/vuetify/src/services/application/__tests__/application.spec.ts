// Services
import { Application } from '../index'

describe('Application.ts', () => {
  let app: Application

  beforeEach(() => {
    app = new Application()
  })

  it('should register/unregister value on application section', () => {
    app.register(0, 'bar', 56)

    expect(app.bar).toBe(56)

    app.unregister(0, 'bar')

    expect(app.bar).toBe(0)
  })

  it(`should not update if value doesn't exist in application`, () => {
    const spy = jest.spyOn(app, 'update')

    app.register(0, 'top', 24)
    app.unregister(1, 'top')

    expect(spy).toHaveBeenCalledTimes(1)
  })
})
