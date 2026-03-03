// Styles
import './VParallax.sass'

// Components
import { VImg } from '@/components/VImg'

// Composables
import { useElementIntersection, useElementSize } from '@vuetify/v0'
import { useDisplay } from '@/composables'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { computed, onBeforeUnmount, ref, shallowRef, watch, watchEffect } from 'vue'
import { clamp, genericComponent, getScrollParent, PREFERS_REDUCED_MOTION, propsFactory, useRender } from '@/util'

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
    const { height: displayHeight } = useDisplay()

    const root = ref<VImg>()
    const el = shallowRef<HTMLElement | null>(null)
    const { height } = useElementSize(el)
    const { isIntersecting } = useElementIntersection(el)

    watchEffect(() => {
      el.value = (root.value?.$el as HTMLElement) ?? null
    })

    let scrollParent: Element | Document
    watch(isIntersecting, val => {
      if (val) {
        scrollParent = getScrollParent(el.value ?? undefined)
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
    watch(height, onScroll)

    const scale = computed(() => {
      return 1 - clamp(Number(props.scale))
    })

    let frame = -1
    function onScroll () {
      if (!isIntersecting.value || PREFERS_REDUCED_MOTION()) return

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const img: HTMLElement | null = (root.value?.$el as Element).querySelector('.v-img__img')
        if (!img) return

        const scrollHeight = scrollParent instanceof Document ? document.documentElement.clientHeight : scrollParent.clientHeight
        const scrollPos = scrollParent instanceof Document ? window.scrollY : scrollParent.scrollTop
        const top = el.value!.getBoundingClientRect().top + scrollPos
        const h = height.value

        const center = top + (h - scrollHeight) / 2
        const translate = floor((scrollPos - center) * scale.value)
        const sizeScale = Math.max(1, (scale.value * (scrollHeight - h) + h) / h)

        img.style.setProperty('transform', `translateY(${translate}px) scale(${sizeScale})`)
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
