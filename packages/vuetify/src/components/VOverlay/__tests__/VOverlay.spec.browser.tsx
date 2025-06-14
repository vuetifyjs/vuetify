// Components
import { VOverlay } from '../VOverlay'
import { VApp } from '@/components/VApp'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { VNavigationDrawer } from '@/components/VNavigationDrawer'

// Utilities
import { render, userEvent } from '@test'
import { nextTick, ref } from 'vue'

describe('VOverlay', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it.todo('without activator')

  it.todo('should use activator')

  it.todo('should render overlay on top of layout')

  it.todo('should render nested overlays')
})
