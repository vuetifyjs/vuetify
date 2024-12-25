// Components
import { VBtn } from '@/components/VBtn'
import { VBtnGroup } from '@/components/VBtnGroup'

// Utilities
import { render } from '@testing-library/vue'
import { createVuetify } from '@/framework'

const colors = ['success', 'info', 'warning', 'error', 'invalid'] as const
const vuetify = createVuetify()

describe('VBtnGroup', () => {
  describe('color', () => {
    it('should render set length', () => {
      const { getAllByRole } = render(
        ({ height }: { height: number }) => (
              <VBtnGroup>
            { colors.map(color => (
                <VBtn>{ color } Button 1</VBtn>
            ))}
              </VBtnGroup>
        ),
        {
          global: {
            plugins: [vuetify],
          },
          props: { height: 200 },
        },
      )
      const btnGroups = getAllByRole('button')
      expect(btnGroups).toHaveLength(colors.length)
    })
  })
})
