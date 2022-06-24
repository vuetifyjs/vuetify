/// <reference types="../../../../types/cypress" />

import { VFooter } from '..'
import { VLayout } from '@/components/VLayout'
import { generate } from '@/../cypress/templates'

const props = {}

const stories = {
  Default: (
    <VLayout>
      <VFooter />
    </VLayout>
  ),
}
// Tests
describe('VFooter', () => {
  generate({ stories, props, component: VFooter })
})
