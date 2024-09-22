// Components
import { VConfirmEdit } from '../'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, shallowRef } from 'vue'

describe('VConfirmEdit', () => {
  it('mirrors external updates', async () => {
    const externalModel = shallowRef('foo')

    render(() => (
      <VConfirmEdit modelValue={ externalModel.value }>
        { ({ model }) => (
          <p>{ model.value }</p>
        )}
      </VConfirmEdit>
    ))

    // Verify initial state
    expect(screen.getByText('foo')).toBeInTheDocument()

    // Update external model
    externalModel.value = 'bar'
    await nextTick()

    // Verify updated state
    expect(screen.getByText('bar')).toBeInTheDocument()
  })

  it("doesn't mutate the original value", async () => {
    const externalModel = shallowRef(['foo'])

    render(() => (
      <VConfirmEdit v-model={ externalModel.value } modelValue={ externalModel.value }>
        { ({ model }) => (
          <>
            <p>{ model.value.join(',') }</p>
            <button data-test="push" onClick={ () => model.value.push('bar') }>Push</button>
          </>
        )}
      </VConfirmEdit>
    ))

    expect(screen.getByText('foo')).toBeInTheDocument()
    const element = screen.getByCSS('[data-test="push"]')

    await userEvent.click(element)

    expect(screen.getByText('foo,bar')).toBeInTheDocument()
    expect(externalModel.value).toEqual(['foo'])

    await userEvent.click(screen.getByText('OK'))

    expect(externalModel.value).toEqual(['foo', 'bar'])
  })

  it.skip('hides actions if used from the slot', async () => {
    render(() => <VConfirmEdit />)
    expect(screen.getAllByCSS('button')).toHaveLength(2)

    render(() => (
      <VConfirmEdit>
        { ({ model }) => { void model } }
      </VConfirmEdit>
    ))
    expect(screen.getAllByCSS('button')).toHaveLength(2)

    render(() => (
      <VConfirmEdit>
        { ({ actions }) => { void actions } }
      </VConfirmEdit>
    ))
    expect(screen.getAllByCSS('button')).toHaveLength(0)

    // // Scenario 4: Render actions from the slot
    render(() => (
      <VConfirmEdit>
        { ({ actions }) => actions }
      </VConfirmEdit>
    ))
    expect(screen.getAllByCSS('button')).toHaveLength(2)
  })
})
