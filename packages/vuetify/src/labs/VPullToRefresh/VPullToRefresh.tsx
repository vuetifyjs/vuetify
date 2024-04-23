// Styles
import './VPullToRefresh.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { LoaderSlot } from '@/composables/loader'

// Utilities
import { computed, onMounted, ref, shallowRef } from 'vue'
import { convertToUnit, genericComponent, getScrollParents, useRender } from '@/util'

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

    const touchDiff = shallowRef(0)
    const scrollContainerRef = ref<HTMLElement>()

    const canRefresh = computed(() => touchDiff.value > PULL_DOWN_HEIGHT_PX * 2 / 3)
    const refreshing = shallowRef(false)
    const touching = shallowRef(false)
    let immediateScrollParent: HTMLElement | undefined

    function onTouchstart (e: TouchEvent) {
      if (refreshing.value) {
        e.preventDefault()
        return
      }
      touching.value = true
      lastTouchY = touchstartY = e.touches[0].clientY + immediateScrollParent!.scrollTop
    }

    function onTouchmove (e: TouchEvent) {
      if (refreshing.value) {
        e.preventDefault()
        return
      }
      const touchY = e.touches[0].clientY
      if (
        touchY > lastTouchY &&
        touchDiff.value < PULL_DOWN_HEIGHT_PX &&
        !immediateScrollParent!.scrollTop
      ) {
        touchDiff.value = touchY - touchstartY
      }
      lastTouchY = touchY
    }

    function onTouchend (e: TouchEvent) {
      if (refreshing.value) {
        e.preventDefault()
        return
      }
      touching.value = false
      if (canRefresh.value) {
        function done (status: PullToRefreshStatus) {
          if (status === 'ok') {
            touchDiff.value = 0
            refreshing.value = false
          }
        }
        emit('load', { done })
        refreshing.value = true
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
              top: convertToUnit(-1 * PULL_DOWN_HEIGHT_PX + touchDiff.value),
              height: convertToUnit(PULL_DOWN_HEIGHT_PX),
            }}
          >
            {
              canRefresh.value || refreshing.value ? (
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
            style={{ top: convertToUnit(touchDiff.value) }}
          >
            { slots.default?.() }
          </div>
        </div>
      )
    })
  },
})

export type VPullToRefresh = InstanceType<typeof VPullToRefresh>
