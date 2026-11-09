// Styles
import './VLoadingIndicator.sass'

// Composables
import { useTextColor } from '@/composables/color'
import { makeComponentProps } from '@/composables/component'
import { useElementIntersection } from '@/composables/intersectionObserver'
import { makeSizeProps, useSize } from '@/composables/size'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { onScopeDispose, shallowRef, toRef } from 'vue'
import { morphPath } from './shapes'
import { convertToUnit, genericComponent, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'

export const makeVLoadingIndicatorProps = propsFactory({
  color: String,
  contained: Boolean,
  shapeSize: [Number, String],

  ...makeComponentProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
}, 'VLoadingIndicator')

export const VLoadingIndicator = genericComponent()({
  name: 'VLoadingIndicator',

  props: makeVLoadingIndicatorProps(),

  setup (props) {
    const root = shallowRef<HTMLElement>()

    const { themeClasses } = provideTheme(props)
    const { sizeClasses, sizeStyles } = useSize(props)
    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)
    const { isIntersecting } = useElementIntersection(root)

    const elapsed = shallowRef(0)
    const path = toRef(() => morphPath(elapsed.value))

    useToggleScope(() => isIntersecting.value && !PREFERS_REDUCED_MOTION(), () => {
      const start = performance.now() - elapsed.value
      let frame = requestAnimationFrame(tick)

      function tick (now: number) {
        // rAF timestamp is the frame start, which can precede the performance.now() taken above
        elapsed.value = Math.max(0, now - start)
        frame = requestAnimationFrame(tick)
      }

      onScopeDispose(() => cancelAnimationFrame(frame))
    })

    useRender(() => (
      <props.tag
        ref={ root }
        class={[
          'v-loading-indicator',
          { 'v-loading-indicator--contained': props.contained },
          themeClasses.value,
          sizeClasses.value,
          textColorClasses.value,
          props.class,
        ]}
        style={[
          sizeStyles.value,
          textColorStyles.value,
          { '--v-loading-indicator-shape-size': convertToUnit(props.shapeSize) },
          props.style,
        ]}
        role="progressbar"
      >
        <svg class="v-loading-indicator__shape" viewBox="-1 -1 2 2">
          <path d={ path.value } />
        </svg>
      </props.tag>
    ))

    return {}
  },
})

export type VLoadingIndicator = InstanceType<typeof VLoadingIndicator>
