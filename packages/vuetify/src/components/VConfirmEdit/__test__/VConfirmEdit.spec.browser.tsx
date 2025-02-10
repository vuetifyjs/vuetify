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

    expect(screen.getByText('foo')).toBeInTheDocument()

    externalModel.value = 'bar'
    await nextTick()
    expect(screen.getByText('bar')).toBeInTheDocument()
  })

  it("doesn't mutate the original value", async () => {
    const externalModel = shallowRef(['foo'])

    render(() => (
      <VConfirmEdit v-model={ externalModel.value } modelValue={ externalModel.value }>
        { ({ model }) => (
          <>
            <p>{ model.value.join(',') }</p>
            <button data-testid="push" onClick={ () => model.value.push('bar') }>Push</button>
          </>
        )}
      </VConfirmEdit>
    ))

    expect(screen.getByText('foo')).toBeInTheDocument()

    await userEvent.click(screen.getByTestId('push'))
    expect(screen.getByText('foo,bar')).toBeInTheDocument()
    expect(externalModel.value).toEqual(['foo'])

    await userEvent.click(screen.getByText('OK'))
    expect(externalModel.value).toEqual(['foo', 'bar'])
  })

  describe('hides actions if used from the slot', () => {
    it('nothing', () => {
      render(() => <VConfirmEdit />)
      expect(screen.getAllByCSS('button')).toHaveLength(2)
    })

    it('consume model', () => {
      render(() => (
        <VConfirmEdit>
          { ({ model }) => {
            void model
          }}
        </VConfirmEdit>
      ))
      expect(screen.getAllByCSS('button')).toHaveLength(2)
    })

    it('consume actions', () => {
      render(() => (
        <VConfirmEdit>
          { ({ actions }) => {
            void actions
          }}
        </VConfirmEdit>
      ))
      expect(screen.queryAllByCSS('button')).toHaveLength(0)
    })

    it('render actions', () => {
      render(() => (
        <VConfirmEdit>
          { ({ actions }) => actions() }
        </VConfirmEdit>
      ))
      expect(screen.getAllByCSS('button')).toHaveLength(2)
    })
  })
})
