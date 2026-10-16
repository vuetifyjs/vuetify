// Components
import { VDataTable } from '..'
import { VExpandTransition } from '@/components/transitions'
import { VRating } from '@/components/VRating'

// Utilities
import { render, screen, userEvent, wait } from '@test'
import { page } from 'vitest/browser'

const HEADERS = [
  { title: 'Name', key: 'name' },
  { title: 'Calories', key: 'calories' },
]

const ITEMS = [
  { name: 'Frozen Yogurt', calories: 159 },
  { name: 'Ice cream sandwich', calories: 237 },
  { name: 'Eclair', calories: 262 },
]

describe('VDataTable - expanded slot', () => {
  it('does not trigger body scroll during accordion swap', async () => {
    await page.viewport(1024, 800)

    render(() => (
      <div>
        <div data-testid="dummy-bar" style="height: 40px; background: lime;" />
        <div style="width: 700px; border: 2px dashed red;">
          <VDataTable
            items={ ITEMS }
            headers={ HEADERS }
            itemValue="name"
            expandStrategy="single"
            expandTransition={{ component: VExpandTransition, disabled: false } as any}
            showExpand
            hideDefaultFooter
          >
            {{
              expanded: () => (
                <div class="pa-3">
                  <table class="w-100">
                    <tbody>
                      { Array.from({ length: 5 }).map((_, i) => (
                        <tr key={ i }>
                          <td class="pa-2">Rating:</td>
                          { /*
                            not sure why VRating specifically, no time to investigate,
                            it has to fail when `contain: layout` is missing in VDataTable.sass
                          */ }
                          <td class="pa-2 text-right"><VRating /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ),
            }}
          </VDataTable>
        </div>
      </div>
    ))

    const resizeSpy = vi.fn()
    new ResizeObserver(resizeSpy).observe(screen.getByTestId('dummy-bar'))

    await wait(50)
    resizeSpy.mockClear()

    const buttons = await screen.findAllByCSS('.v-btn--icon')

    await userEvent.click(buttons[1])
    await wait(50)
    await userEvent.click(buttons[0])

    expect(resizeSpy).not.toHaveBeenCalled()
  })
})
