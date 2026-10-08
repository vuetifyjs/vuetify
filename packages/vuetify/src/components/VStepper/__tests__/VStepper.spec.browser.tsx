// Components
import { VStepper } from '..'
import { VIcon } from '@/components/VIcon'

// Directives
import vTooltip from '@/directives/tooltip'

// Utilities
import { render, screen, userEvent } from '@test'
import { defineComponent, shallowRef } from 'vue'

const TooltipIcon = defineComponent({
  directives: { vTooltip: vTooltip as any },

  setup () {
    return () => (
      <VIcon
        v-tooltip="'Title tooltip'"
        data-testid="title-tooltip"
        icon="$info"
      />
    )
  },
})

describe('VStepper', () => {
  it('should allow title tooltips without making the item editable', async () => {
    const model = shallowRef(1)

    render(() => (
      <VStepper
        v-model={ model.value }
        hideActions
        items={[
          { title: 'Step 1', value: 1 },
          { title: 'Step 2', value: 2 },
        ]}
      >
        {{
          title: ({ step }) => step === 1 ? (
            <>
              <span>Step 1</span>
              <TooltipIcon />
            </>
          ) : <span>Step 2</span>,
        }}
      </VStepper>
    ))

    await userEvent.hover(screen.getByTestId('title-tooltip'))

    await expect.poll(() => screen.queryByCSS('.v-tooltip .v-overlay__content')).toBeVisible()

    const title = screen.getByText('Step 1').closest('button')!

    expect(getComputedStyle(title).cursor).toBe('default')

    await userEvent.click(screen.getByText('Step 2'))

    expect(model.value).toBe(1)
  })

  it('should keep disabled items disabled', () => {
    render(() => (
      <VStepper
        editable
        hideActions
        items={[
          { title: 'Step 1', value: 1 },
          { title: 'Disabled step', value: 2, props: { disabled: true } },
        ]}
      />
    ))

    const item = screen.getByText('Disabled step').closest('button')!

    expect(item).toBeDisabled()
    expect(getComputedStyle(item).pointerEvents).toBe('none')
  })
})
