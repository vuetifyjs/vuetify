// Styles
import './VParallax.sass'

// Components
import { VImg } from '@/components/VImg'

// Composables
import { useDisplay } from '@/composables'
import { makeComponentProps } from '@/composables/component'
import { useIntersectionObserver } from '@/composables/intersectionObserver'
import { useResizeObserver } from '@/composables/resizeObserver'

// Utilities
import { computed, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { clamp, genericComponent, getScrollParent, propsFactory, useRender } from '@/util'

// Types
import type { VImgSlots } from '@/components/VImg/VImg'

function floor (val: number) {
  return Math.floor(Math.abs(val)) * Math.sign(val)
}

export const makeVParallaxProps = propsFactory({
  scale: {
    type: [Number, String],
    default: 0.5,
  },

  ...makeComponentProps(),
}, 'VParallax')

export const VParallax = genericComponent<VImgSlots>()({
  name: 'VParallax',

  props: makeVParallaxProps(),

  setup (props, { slots }) {
    const { intersectionRef, isIntersecting } = useIntersectionObserver()
    const { resizeRef, contentRect } = useResizeObserver()
    const { height: displayHeight } = useDisplay()

    const root = ref<VImg>()

    watchEffect(() => {
      intersectionRef.value = resizeRef.value = root.value?.$el
    })

    let scrollParent: Element | Document
    watch(isIntersecting, val => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value)
        scrollParent = scrollParent === document.scrollingElement ? document : scrollParent
        scrollParent.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      } else {
        scrollParent.removeEventListener('scroll', onScroll)
      }
    })

    onBeforeUnmount(() => {
      scrollParent?.removeEventListener('scroll', onScroll)
    })

    watch(displayHeight, onScroll)
    watch(() => contentRect.value?.height, onScroll)

    const scale = computed(() => {
      return 1 - clamp(Number(props.scale))
    })

    let frame = -1
    function onScroll () {
      if (!isIntersecting.value) return

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el: HTMLElement | null = (root.value?.$el as Element).querySelector('.v-img__img')
        if (!el) return

        const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight
        const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop
        const top = intersectionRef.value!.getBoundingClientRect().top + scrollPos
        const height = contentRect.value!.height

        const center = top + (height - scrollHeight) / 2
        const translate = floor((scrollPos - center) * scale.value)
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - height) + height) / height)

        el.style.setProperty('transform', `translateY(${translate}px) scale(${sizeScale})`)
      })
    }

    useRender(() => (
      <VImg
        class={[
          'v-parallax',
          { 'v-parallax--active': isIntersecting.value },
          props.class,
        ]}
        style={ props.style }
        ref={ root }
        cover
        onLoadstart={ onScroll }
        onLoad={ onScroll }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VParallax = InstanceType<typeof VParallax>
