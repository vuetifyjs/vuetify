// Components
import { VBottomNavigation } from '../VBottomNavigation'
import { VLayout } from '@/components/VLayout'

// Utilities
import { render, screen } from '@test'
import { ref, shallowRef } from 'vue'

describe('VBottomNavigation', () => {
  it('allows custom height', async () => {
    const height = ref(200)
    render(() => (
      <VLayout>
        <VBottomNavigation height={ height.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    await expect.element(navigation).toHaveStyle({ height: '200px' })
    height.value = 150
    await expect.element(navigation).toHaveStyle({ height: '150px' })
  })

  it('supports density', async () => {
    const density = ref<any>('default')
    render(() => (
      <VLayout>
        <VBottomNavigation density={ density.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    await expect.element(navigation).toHaveStyle({ height: '56px' })
    density.value = 'comfortable'
    await expect.element(navigation).toHaveStyle({ height: '48px' })
    density.value = 'compact'
    await expect.element(navigation).toHaveStyle({ height: '40px' })
  })

  it('is not visible when inactive', async () => {
    const active = ref<boolean>(true)
    render(() => (
      <VLayout>
        <VBottomNavigation active={ active.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    await expect.element(navigation).toHaveClass('v-bottom-navigation--active')
    active.value = false
    await expect.element(navigation).not.toHaveClass('v-bottom-navigation--active')
  })

  it('allows overriding the layout-calculated z-index', async () => {
    const zIndex = shallowRef<number>()
    render(() => (
      <VLayout>
        <VBottomNavigation zIndex={ zIndex.value } />
      </VLayout>
    ))
    const navigation = screen.getByCSS('.v-bottom-navigation')
    await expect.element(navigation).toHaveStyle({ zIndex: '1004' })
    zIndex.value = 2500
    await expect.element(navigation).toHaveStyle({ zIndex: '2500' })
    zIndex.value = undefined
    await expect.element(navigation).toHaveStyle({ zIndex: '1004' })
  })

  it('lets style take precedence over zIndex', async () => {
    render(() => (
      <VLayout>
        <VBottomNavigation zIndex={ 2500 } style={{ zIndex: 3000 }} />
      </VLayout>
    ))
    await expect.element(screen.getByCSS('.v-bottom-navigation')).toHaveStyle({ zIndex: '3000' })
  })
})
