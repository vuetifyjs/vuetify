// Styles
import './VPullToRefresh.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { LoaderSlot } from '@/composables/loader'

// Utilities
import { computed, onMounted, ref, shallowRef } from 'vue'
import { clamp, convertToUnit, genericComponent, getScrollParents, useRender } from '@/util'

const PULL_DOWN_HEIGHT_PX = 64

export type PullToRefreshStatus = 'ok' | 'error'

export const VPullToRefresh = genericComponent()({
  name: 'VPullToRefresh',

  props: {
  },

  emits: {
    load: (options: { done: (status: PullToRefreshStatus) => void }) => true,
  },

  setup (props, { slots, emit }) {
    let touchstartY = 0
    let lastTouchY = 0
    let immediateScrollParent: HTMLElement | undefined
    let touchStartTopOffset = 0

    const touchDiff = shallowRef(0)
    const scrollContainerRef = ref<HTMLElement>()

    const refreshing = shallowRef(false)
    const touching = shallowRef(false)
    const canRefresh = shallowRef(false)

    const topOffset = computed(() => clamp(touchStartTopOffset + touchDiff.value, 0, PULL_DOWN_HEIGHT_PX))

    function onTouchstart (e: TouchEvent) {
      touching.value = true
      lastTouchY = touchstartY = e.touches[0].clientY + immediateScrollParent!.scrollTop
      touchStartTopOffset = topOffset.value
    }

    function onTouchmove (e: TouchEvent) {
      if (canRefresh.value) return

      const touchY = e.touches[0].clientY
      // Moving up to cancel existing loading
      if (touchY < lastTouchY && touchstartY - touchY > PULL_DOWN_HEIGHT_PX / 3) {
        refreshing.value = false
      }

      if (!immediateScrollParent!.scrollTop) {
        touchDiff.value = touchY - touchstartY
        canRefresh.value = touchDiff.value >= PULL_DOWN_HEIGHT_PX
      }
      lastTouchY = touchY
    }

    function onTouchend (e: TouchEvent) {
      touching.value = false
      if (canRefresh.value) {
        function done (status: PullToRefreshStatus) {
          if (!refreshing.value) return
          if (status === 'ok') {
            touchDiff.value = 0
            refreshing.value = false
          }
        }
        emit('load', { done })
        refreshing.value = true
        canRefresh.value = false
      }
    }

    onMounted(() => {
      immediateScrollParent = getScrollParents(scrollContainerRef.value)[0]
    })

    useRender(() => {
      return (
        <div
          class={[
            'v-pull-to-refresh',
          ]}
          onTouchstart={ onTouchstart }
          onTouchmove={ onTouchmove }
          onTouchend={ onTouchend }
        >
          <div
            class={[
              'v-pull-to-refresh__pull-down',
              {
                'v-pull-to-refresh__pull-down--touching': touching.value,
              },
            ]}
            style={{
              top: convertToUnit(-1 * PULL_DOWN_HEIGHT_PX + topOffset.value),
              height: convertToUnit(PULL_DOWN_HEIGHT_PX),
            }}
          >
            {
              refreshing.value ? (
                <LoaderSlot
                  name="v-pull-to-refresh"
                  active={ false }
                >
                  <VProgressCircular
                    indeterminate
                    active={ false }
                  />
                </LoaderSlot>
              ) : (
                <VIcon
                  icon="$sortDesc"
                />
              )
            }
          </div>
          <div
            class={[
              'v-pull-to-refresh__scroll-container',
              {
                'v-pull-to-refresh__scroll-container--touching': touching.value,
              },
            ]}
            ref={ scrollContainerRef }
            style={{ top: convertToUnit(topOffset.value) }}
          >
            { slots.default?.() }
          </div>
        </div>
      )
    })
  },
})

export type VPullToRefresh = InstanceType<typeof VPullToRefresh>
