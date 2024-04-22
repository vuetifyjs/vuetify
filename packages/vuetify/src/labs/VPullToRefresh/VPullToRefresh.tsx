// Styles
import './VPullToRefresh.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { LoaderSlot } from '@/composables/loader'

// Utilities
import { computed, onMounted, ref, shallowRef } from 'vue'
import { convertToUnit, genericComponent, useRender } from '@/util'

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

    const touchDiff = shallowRef(0)
    const scrollContainerRef = ref<HTMLElement>()

    const height = shallowRef(0)

    const canRefresh = computed(() => touchDiff.value > PULL_DOWN_HEIGHT_PX * 2 / 3)
    const refreshing = shallowRef(false)
    const touching = shallowRef(false)

    function onTouchstart (e: TouchEvent) {
      if (refreshing.value) {
        e.preventDefault()
        return
      }
      touching.value = true
      touchstartY = e.touches[0].clientY
    }

    function onTouchmove (e: TouchEvent) {
      if (refreshing.value) {
        e.preventDefault()
        return
      }
      const touchY = e.touches[0].clientY
      if (touchDiff.value < PULL_DOWN_HEIGHT_PX && window.scrollY === 0) {
        touchDiff.value = touchY - touchstartY
      }
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
      height.value = scrollContainerRef.value!.offsetHeight
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
          style={{
            height: convertToUnit(height.value),
          }}
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
            style={{ top: convertToUnit(-1 * PULL_DOWN_HEIGHT_PX + touchDiff.value) }}
          >
            { slots.default?.() }
          </div>
        </div>
      )
    })
  },
})

export type VPullToRefresh = InstanceType<typeof VPullToRefresh>
