/// <reference types="../../../../types/cypress" />

import { VLayout } from '@/components/VLayout'
import { VSystemBar } from '..'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: (
    <VLayout>
      <VSystemBar />
    </VLayout>
  ),
}
// Tests
describe('VSystemBar', () => {
  generate({ stories, props, component: VSystemBar })
})
