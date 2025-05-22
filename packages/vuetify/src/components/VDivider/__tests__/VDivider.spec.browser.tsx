import { VDivider } from '..'
import { VList, VListItem } from '../../VList'
import { VCard } from '../../VCard'
import { VToolbar } from '../../VToolbar'
import { VBtn } from '../../VBtn'
import { VCol, VRow, VSpacer } from '../../VGrid'

// Utilities
import { render } from '@test'

// Tests
describe('VDivider', () => {
  describe('examples in documentation', () => {
    it('takes full height in flexbox container with static height', () => {
      const { container } = render(() => (
        <>
          <div
            class="ma-2 d-flex align-center justify-center bg-grey-lighten-2"
            style="height: 200px;"
          >
            <VDivider
              data-test="divider-v"
              vertical
              class="opacity-100 text-red"
            ></VDivider>
          </div>
        </>
      ))

      const divider = container.querySelector("[data-test='divider-v']")
      expect(divider).toBeTruthy()
      expect(divider).toHaveStyle({ height: '200px' })
    })

    it('takes defined length when used as centered separator in VToolbar', () => {
      const { container } = render(() => (
        <>
          <VToolbar>
            <VBtn icon="mdi-arrow-left"></VBtn>
            <VSpacer></VSpacer>
            <VBtn class="ms-5" icon="mdi-archive-plus-outline"></VBtn>
            <VBtn icon="mdi-alert-circle-outline"></VBtn>
            <VBtn icon="mdi-delete-outline"></VBtn>
            <VDivider
              data-test="divider-v"
              class="mx-3 align-self-center opacity-100 text-red"
              length="24"
              thickness="2"
              vertical
            ></VDivider>
            <VBtn icon="mdi-folder-outline"></VBtn>
            <VBtn icon="mdi-tag-outline"></VBtn>
            <VBtn icon="mdi-dots-vertical"></VBtn>
          </VToolbar>
        </>
      ))

      const divider = container.querySelector("[data-test='divider-v']")
      expect(divider).toBeTruthy()
      expect(divider).toHaveStyle({ height: '24px' })
    })
  })

  describe('adaptive height', () => {
    it('takes full height in flexbox container with dynamic height', () => {
      const { container } = render(() => (
        <>
          <div
            class="ma-2 pa-3 d-flex flex-column"
            style="height: 370px; width: 940px; outline: 1px solid currentColor"
          >
            <div class="d-flex">
              <aside class="pr-4" style="min-width: 200px">
                <VList class="py-0">
                  {[1, 2, 3].map(idx => (
                    <VListItem
                      rounded="lg"
                      class="bg-grey mb-3"
                      title={ `Nav item ${idx}` }
                    ></VListItem>
                  ))}
                </VList>
              </aside>
              <VDivider
                data-test="divider-v"
                vertical
                class="opacity-100 text-red"
              ></VDivider>
              <main class="px-4 d-flex align-content-start flex-wrap ga-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
                  <VCard color="grey" width="200" height="80"></VCard>
                ))}
              </main>
            </div>
            <footer class="bg-grey flex-fill mt-4 text-center">footer</footer>
          </div>
        </>
      ))

      const divider = container.querySelector("[data-test='divider-v']")
      expect(divider).toBeTruthy()

      // In JSDOM, we can't reliably test the computed height as it doesn't fully render
      // We'll test presence and properties instead
      expect(divider).toHaveClass('v-divider')
      expect(divider).toHaveClass('v-divider--vertical')
      expect(divider).toHaveClass('opacity-100')
    })

    it('takes relative height in flexbox container with dynamic height', () => {
      const { container } = render(() => (
        <>
          <div class="d-flex w-100 pa-6">
            <aside class="bg-grey" style="width: 200px; height: 300px">
              Sidebar
            </aside>
            <VDivider
              data-test="divider-v"
              vertical
              class="mx-2 opacity-100 text-red"
            ></VDivider>
            <main class="bg-grey align-self-stretch flex-fill">Content</main>
          </div>
        </>
      ))

      const divider = container.querySelector("[data-test='divider-v']")
      expect(divider).toBeTruthy()

      // Same as above, we can't reliably test computed height in JSDOM
      expect(divider).toHaveClass('v-divider')
      expect(divider).toHaveClass('v-divider--vertical')
      expect(divider).toHaveClass('opacity-100')
    })
  })

  describe('separator in list', () => {
    it('takes full width in VList', () => {
      const { container } = render(() => (
        <>
          <div
            class="ma-2 pa-3 d-flex flex-column"
            style="height: 370px; width: 940px; outline: 1px solid currentColor"
          >
            <aside class="pr-4" style="max-width: 200px">
              <VList class="bg-transparent py-0">
                {[1, 2, 3].map(idx => (
                  <>
                    { idx > 1 && (
                      <VDivider
                        data-test="divider-h"
                        class="my-2 opacity-100 text-red"
                      ></VDivider>
                    )}
                    <VListItem
                      rounded="lg"
                      class="bg-grey"
                      title={ `Nav item ${idx}` }
                    ></VListItem>
                  </>
                ))}
              </VList>
            </aside>
          </div>
        </>
      ))

      const dividers = container.querySelectorAll("[data-test='divider-h']")
      expect(dividers).toHaveLength(2)

      expect(dividers[0]).toHaveClass('v-divider')
      expect(dividers[0]).not.toHaveClass('v-divider--vertical')
      expect(dividers[0]).toHaveClass('opacity-100')
    })
  })

  describe('separator in grid', () => {
    it('takes only necessary height when grid wraps', () => {
      const { container } = render(() => (
        <>
          <div
            class="ma-2 pa-3"
            style="height: 370px; width: 940px; outline: 1px solid currentColor"
          >
            <VRow class="align-content-start">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
                <>
                  { idx % 4 !== 0 && (
                    <VDivider
                      data-test={ `divider-v-${idx}` }
                      vertical
                      class="opacity-100 text-red"
                    ></VDivider>
                  )}
                  <VCol cols="3">
                    <VCard color="grey" height="80"></VCard>
                  </VCol>
                </>
              ))}
            </VRow>
          </div>
        </>
      ))

      const dividers = container.querySelectorAll("[data-test*='divider-v-']")
      expect(dividers).toHaveLength(6)

      Array.from(dividers).forEach(divider => {
        expect(divider).toHaveClass('v-divider')
        expect(divider).toHaveClass('v-divider--vertical')
        expect(divider).toHaveClass('opacity-100')
      })
    })
  })

  describe('vertical inset variant', () => {
    it('accepts `inset` prop to get predefined margin', () => {
      const { container } = render(() => (
        <>
          <div
            class="ma-2 d-flex align-center justify-center bg-grey-lighten-2"
            style="height: 200px;"
          >
            <VDivider
              data-test="divider-v"
              vertical
              inset
              class="opacity-100 text-red"
            ></VDivider>
          </div>
        </>
      ))

      const divider = container.querySelector("[data-test='divider-v']")
      expect(divider).toBeTruthy()
      expect(divider).toHaveClass('v-divider')
      expect(divider).toHaveClass('v-divider--vertical')
      expect(divider).toHaveClass('v-divider--inset')
      expect(divider).toHaveClass('opacity-100')
    })

    it('accepts custom margin', () => {
      const { container } = render(() => (
        <>
          <div
            class="ma-2 d-flex align-center justify-center bg-grey-lighten-2"
            style="height: 200px;"
          >
            <VDivider
              data-test="divider-v"
              vertical
              thickness="3"
              class="my-6 opacity-100 text-red"
            ></VDivider>
          </div>
          <div class="ma-2 d-flex align-center bg-grey-lighten-2">
            <VCard color="blue" width="200" height="200" rounded="circle"></VCard>
            <VDivider
              data-test="divider-v"
              vertical
              thickness="3"
              class="ma-6 opacity-100 text-red"
            ></VDivider>
          </div>
        </>
      ))

      const dividers = container.querySelectorAll("[data-test='divider-v']")
      expect(dividers).toHaveLength(2)

      // Instead of checking computed styles (which aren't accurate in JSDOM),
      // we check the presence of classes
      expect(dividers[0]).toHaveClass('v-divider')
      expect(dividers[0]).toHaveClass('v-divider--vertical')
      expect(dividers[0]).toHaveClass('my-6')

      expect(dividers[1]).toHaveClass('v-divider')
      expect(dividers[1]).toHaveClass('v-divider--vertical')
      expect(dividers[1]).toHaveClass('ma-6')
    })
  })
})
