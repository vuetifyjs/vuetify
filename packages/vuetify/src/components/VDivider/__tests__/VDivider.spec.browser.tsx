import { VDivider } from '../VDivider'

// Components
import { VBtn } from '@/components/VBtn'
import { VCard } from '@/components/VCard'
import { VCol, VRow, VSpacer } from '@/components/VGrid'
import { VList, VListItem } from '@/components/VList'
import { VToolbar } from '@/components/VToolbar'

// Utilities
import { render, screen } from '@test'

describe('VDivider', () => {
  describe('examples in documentation', () => {
    it('takes full height in flexbox container with static height', () => {
      render(() => (
        <div
          class="ma-2 d-flex align-center justify-center bg-grey-lighten-2"
          style="height: 200px;"
        >
          <VDivider vertical class="opacity-100 text-red" />
        </div>
      ))

      expect(screen.getByCSS('.v-divider')).toHaveStyle({ height: '200px' })
    })

    it('takes defined length when used as centered separator in VToolbar', () => {
      render(() => (
        <>
          <VToolbar>
            <VBtn icon="mdi-arrow-left"></VBtn>
            <VSpacer></VSpacer>
            <VBtn class="ms-5" icon="mdi-archive-plus-outline"></VBtn>
            <VBtn icon="mdi-alert-circle-outline"></VBtn>
            <VBtn icon="mdi-delete-outline"></VBtn>
            <VDivider
              class="mx-3 align-self-center opacity-100 text-red"
              length="24"
              thickness="2"
              vertical
            />
            <VBtn icon="mdi-folder-outline"></VBtn>
            <VBtn icon="mdi-tag-outline"></VBtn>
            <VBtn icon="mdi-dots-vertical"></VBtn>
          </VToolbar>
        </>
      ))
      expect(screen.getByCSS('.v-divider')).toHaveStyle({ height: '24px' })
    })
  })

  describe('adaptive height', () => {
    it('takes full height in flexbox container with dynamic height', () => {
      render(() => (
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

      // 272 = 3 * 80px (card height) + 2 * 16px (ga-4)
      expect(screen.getByCSS('.v-divider')).toHaveStyle({ height: '272px' })
    })

    it('takes relative height in flexbox container with dynamic height', () => {
      render(() => (
        <>
          <div class="d-flex w-100 pa-6">
            <aside class="bg-grey" style="width: 200px; height: 300px">
              Sidebar
            </aside>
            <VDivider
              vertical
              class="mx-2 opacity-100 text-red"
            ></VDivider>
            <main class="bg-grey align-self-stretch flex-fill">Content</main>
          </div>
        </>
      ))

      expect(screen.getByCSS('.v-divider')).toHaveStyle({ height: '300px' })
    })
  })

  describe('separator in list', () => {
    it('takes full width in VList', () => {
      render(() => (
        <div
          class="ma-2 pa-3 d-flex flex-column"
          style="height: 370px; width: 940px; outline: 1px solid currentColor"
        >
          <aside class="pr-4" style="max-width: 200px">
            <VList class="bg-transparent py-0">
              {[1, 2, 3].map(idx => (
                <>
                  { idx > 1 && (
                    <VDivider class="my-2 opacity-100 text-red"></VDivider>
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
      ))
      expect(screen.getAllByCSS('.v-divider')).toHaveLength(2)
      for (const item of screen.getAllByCSS('.v-divider')) {
        expect(item).toHaveStyle({ width: '184px' })
      }
    })
  })

  describe('separator in grid', () => {
    it('takes only necessary height when grid wraps', () => {
      render(() => (
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
      expect(screen.getAllByCSS('.v-divider')).toHaveLength(6)
      // 80px + 2 * 12px (v-col)
      for (const item of screen.getAllByCSS('.v-divider')) {
        expect(item).toHaveStyle({ height: '104px' })
      }
    })
  })

  describe('vertical inset variant', () => {
    it('accepts `inset` prop to get predefined margin', () => {
      render(() => (
        <>
          <div
            class="ma-2 d-flex align-center justify-center bg-grey-lighten-2"
            style="height: 200px;"
          >
            <VDivider
              vertical
              inset
              class="opacity-100 text-red"
            ></VDivider>
          </div>
        </>
      ))

      // 200px - 2 * 8px (inset margin)
      expect(screen.getByCSS('.v-divider')).toHaveStyle({ height: '184px' })
    })

    it('accepts custom margin', () => {
      render(() => (
        <>
          <div
            class="ma-2 d-flex align-center justify-center bg-grey-lighten-2"
            style="height: 200px;"
          >
            <VDivider
              vertical
              thickness="3"
              class="my-6 opacity-100 text-red"
            ></VDivider>
          </div>
          <div class="ma-2 d-flex align-center bg-grey-lighten-2">
            <VCard color="blue" width="200" height="200" rounded="circle"></VCard>
            <VDivider
              vertical
              thickness="3"
              class="ma-6 opacity-100 text-red"
            ></VDivider>
          </div>
        </>
      ))

      expect(screen.getAllByCSS('.v-divider')).toHaveLength(2)
      // 200px - 2 * 24px (margin)
      for (const item of screen.getAllByCSS('.v-divider')) {
        expect(item).toHaveStyle({ height: '152px' })
      }
    })
  })
})
