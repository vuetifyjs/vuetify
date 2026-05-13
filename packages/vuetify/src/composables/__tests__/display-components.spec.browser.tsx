/* eslint-disable max-len */

// Components
import { VBanner } from '@/components/VBanner/VBanner'
import { VLayout } from '@/components/VLayout/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer/VNavigationDrawer'
import { VSlideGroup } from '@/components/VSlideGroup/VSlideGroup'

// Utilities
import { page, render, screen } from '@test'
import { ref } from 'vue'

// Types
import type { DisplayBreakpoint } from '@/composables/display'

describe('display-components', () => {
  it('should render items', async () => {
    await page.viewport(960, 800)

    const mobileBreakpoint = ref<number | DisplayBreakpoint>('lg')
    render(() => (
      <VLayout>
        <VNavigationDrawer mobileBreakpoint={ mobileBreakpoint.value } />
        <VMain>
          <VBanner mobileBreakpoint={ mobileBreakpoint.value }>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quaerat fugit ratione totam magnam, beatae consequuntur qui quam enim et sapiente autem accusantium id nesciunt maiores obcaecati minus molestiae! Ipsa.
          </VBanner>
          <VSlideGroup mobileBreakpoint={ mobileBreakpoint.value } />
        </VMain>
      </VLayout>
    ))

    const navigationDrawer = screen.getByCSS('.v-navigation-drawer')
    const banner = screen.getByCSS('.v-banner')
    const slideGroup = screen.getByCSS('.v-slide-group')

    expect(navigationDrawer).toHaveClass('v-navigation-drawer--mobile')
    expect(banner).toHaveClass('v-banner--mobile')
    expect(slideGroup).toHaveClass('v-slide-group--mobile')

    mobileBreakpoint.value = 959

    await expect.poll(() => navigationDrawer).not.toHaveClass('v-navigation-drawer--mobile')
    await expect.poll(() => banner).not.toHaveClass('v-banner--mobile')
    await expect.poll(() => slideGroup).not.toHaveClass('v-slide-group--mobile')
  })
})
