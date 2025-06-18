// Components
import { VItem, VItemGroup } from '../'
import { VCard } from '../../VCard'

// Utilities
import { render, userEvent } from '@test'

describe('VItemGroup', () => {
  // https://github.com/vuetifyjs/vuetify/issues/14754
  it('should apply selected-class from both group and item', async () => {
    const { container } = render(() => (
      <VItemGroup selectedClass="font-weight-bold" class="d-flex text-center justify-center">
        <VItem value="foo" selectedClass="bg-blue">
          {{
            default: props => <VCard width="100" class={ props.selectedClass || '' } onClick={ props.toggle }>Foo</VCard>,
          }}
        </VItem>
        <VItem value="bar" selectedClass="bg-orange">
          {{
            default: props => <VCard width="100" class={ props.selectedClass || '' } onClick={ props.toggle }>Bar</VCard>,
          }}
        </VItem>
      </VItemGroup>
    ))

    // Get the cards
    const cards = container.querySelectorAll('.v-card')

    // Click the first card and check classes
    await userEvent.click(cards[0])
    expect(cards[0]).toHaveClass('bg-blue')
    expect(cards[0]).toHaveClass('font-weight-bold')

    // Click the second card and check classes
    await userEvent.click(cards[1])
    expect(cards[1]).toHaveClass('bg-orange')
    expect(cards[1]).toHaveClass('font-weight-bold')
  })
})
