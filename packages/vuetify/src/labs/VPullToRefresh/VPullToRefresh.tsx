// Styles
import './VPullToRefresh.sass'

// Components
import { VIcon } from '@/components/VIcon'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { LoaderSlot } from '@/composables/loader'

// Utilities
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { clamp, convertToUnit, genericComponent, getScrollParents, useRender } from '@/util'

const PULL_DOWN_HEIGHT_PX = 64

export const VPullToRefresh = genericComponent()({
  name: 'VPullToRefresh',

  props: {
  },

  emits: {
    load: (options: { done: () => void }) => true,
  },

  setup (props, { slots, emit }) {
    let touchstartY = 0
    let immediateScrollParent: HTMLElement | undefined

    const touchDiff = shallowRef(0)
    const containerRef = ref<HTMLElement>()

    const refreshing = shallowRef(false)
    const touching = shallowRef(false)

    const topOffset = computed(() => clamp(touchDiff.value, 0, PULL_DOWN_HEIGHT_PX))

    function onTouchstart (e: TouchEvent) {
      if (refreshing.value) return
      touching.value = true
      touchstartY = e.touches[0].clientY + immediateScrollParent!.scrollTop
    }

    function onTouchmove (e: TouchEvent) {
      if (refreshing.value) return

      const touchY = e.touches[0].clientY

      if (!immediateScrollParent!.scrollTop) {
        touchDiff.value = touchY - touchstartY
      }
    }

    function onTouchend (e: TouchEvent) {
      if (refreshing.value) return
      touching.value = false
      if (touchDiff.value >= PULL_DOWN_HEIGHT_PX) {
        function done () {
          if (!refreshing.value) return
          touchDiff.value = 0
          refreshing.value = false
        }
        emit('load', { done })
        refreshing.value = true
      } else {
        touchDiff.value = 0
      }
    }

    onMounted(() => {
      immediateScrollParent = getScrollParents(containerRef.value)[0]
    })

    watch([topOffset, refreshing], () => {
      if (immediateScrollParent) {
        immediateScrollParent.style.overflow = topOffset.value && !refreshing.value ? 'hidden' : 'auto'
      }
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
          ref={ containerRef }
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
