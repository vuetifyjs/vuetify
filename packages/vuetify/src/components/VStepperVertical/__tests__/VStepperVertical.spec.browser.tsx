// Components
import { VStepperVertical, VStepperVerticalItem } from '..'
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

describe('VStepperVertical', () => {
  it('should allow title tooltips without making the item editable', async () => {
    const model = shallowRef(1)

    render(() => (
      <VStepperVertical v-model={ model.value }>
        <VStepperVerticalItem value={ 1 }>
          {{
            title: () => (
              <>
                <span>Step 1</span>
                <TooltipIcon />
              </>
            ),
            default: () => 'Step content',
          }}
        </VStepperVerticalItem>
        <VStepperVerticalItem value={ 2 } title="Step 2" />
      </VStepperVertical>
    ))

    await userEvent.hover(screen.getByTestId('title-tooltip'))

    await expect.poll(() => screen.queryByCSS('.v-tooltip .v-overlay__content')).toBeVisible()

    const title = screen.getByText('Step 1').closest('button')!

    expect(getComputedStyle(title).cursor).toBe('default')
    expect(getComputedStyle(title.querySelector('.v-expansion-panel-title__overlay')!).opacity).toBe('0')

    await userEvent.click(screen.getByText('Step 2'))

    expect(model.value).toBe(1)
  })
})
