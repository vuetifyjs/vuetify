import { VTextarea } from '../VTextarea'

// Utilities
import { render, userEvent } from '@test'

describe('VTextarea', () => {
  it('has affixed icons', async () => {
    const { getByRole } = render(
      <VTextarea
        prependIcon="$vuetify"
        prependInnerIcon="$vuetify"
        appendInnerIcon="$vuetify"
        appendIcon="$vuetify"
      />
    )

    // TODO: update to new testing library utils
    // let el = getByRole('button', { name: 'Prepend icon' })
    // expect(el.attributes('aria-hidden')).toBe('true')

    // el = getByRole('button', { name: 'Prepend inner icon' })
    // expect(el.attributes('aria-hidden')).toBe('true')

    // el = getByRole('button', { name: 'Append inner icon' })
    // expect(el.attributes('aria-hidden')).toBe('true')

    // el = getByRole('button', { name: 'Append icon' })
    // expect(el.attributes('aria-hidden')).toBe('true')
  })

  it('has affixed icons with actions', async () => {
    const onClickPrepend = vi.fn()
    const onClickPrependInner = vi.fn()
    const onClickAppendInner = vi.fn()
    const onClickAppend = vi.fn()

    const { getByRole } = render(
      <VTextarea
        prependIcon="$vuetify"
        prependInnerIcon="$vuetify"
        appendInnerIcon="$vuetify"
        appendIcon="$vuetify"
        onClick:prepend={ onClickPrepend }
        onClick:prependInner={ onClickPrependInner }
        onClick:appendInner={ onClickAppendInner }
        onClick:append={ onClickAppend }
      />
    )

    expect(onClickPrepend).toHaveBeenCalledTimes(0)
    expect(onClickPrependInner).toHaveBeenCalledTimes(0)
    expect(onClickAppendInner).toHaveBeenCalledTimes(0)
    expect(onClickAppend).toHaveBeenCalledTimes(0)

    // TODO: update to new testing library utils
    // let el = getByRole('button', { name: 'Prepend icon' })
    // await userEvent.click(el)
    // expect(onClickPrepend).toHaveBeenCalledTimes(1)

    // el = getByRole('button', { name: 'Prepend inner icon' })
    // await userEvent.click(el)
    // expect(onClickPrependInner).toHaveBeenCalledTimes(1)

    // el = getByRole('button', { name: 'Append inner icon' })
    // await userEvent.click(el)
    // expect(onClickAppendInner).toHaveBeenCalledTimes(1)

    // el = getByRole('button', { name: 'Append icon' })
    // await userEvent.click(el)
    // expect(onClickAppend).toHaveBeenCalledTimes(1)
  })
})
