// Components
import { VBottomNavigation } from '../VBottomNavigation'
import { VLayout } from '@/components/VLayout'

// Utilities
import { render, screen } from '@test'
import { ref } from 'vue'

describe('VBottomNavigation', () => {
  it('allows custom height', async () => {
    const height = ref(200)
    render(() => (
      <VLayout>
        <VBottomNavigation height={ height.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    expect.element(navigation).toHaveStyle({ height: '200px' })
    height.value = 150
    expect.element(navigation).toHaveStyle({ height: '150px' })
  })

  it('supports density', async () => {
    const density = ref<any>('default')
    render(() => (
      <VLayout>
        <VBottomNavigation density={ density.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    expect.element(navigation).toHaveStyle({ height: '56px' })
    density.value = 'comfortable'
    expect.element(navigation).toHaveStyle({ height: '48px' })
    density.value = 'comfortable'
    expect.element(navigation).toHaveStyle({ height: '40px' })
  })

  it('is not visible when inactive', async () => {
    const active = ref<boolean>(true)
    render(() => (
      <VLayout>
        <VBottomNavigation active={ active.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    expect.element(navigation).toHaveClass('v-bottom-navigation--active')
    active.value = false
    expect.element(navigation).not.toHaveClass('v-bottom-navigation--active')
  })
})
