// Styles
import './VParallax.sass'

// Components
import { VImg } from '@/components/VImg'

// Composables
import { useIntersectionObserver } from '@/composables/intersectionObserver'

// Utilities
import { onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { defineComponent, getScrollParent } from '@/util'

function floor (val: number) {
  return Math.floor(Math.abs(val)) * Math.sign(val)
}

export const VParallax = defineComponent({
  name: 'VParallax',

  props: {
    scale: {
      type: [Number, String],
      default: 1.3,
    },
  },

  setup (props, { attrs, slots }) {
    const root = ref<VImg>()
    const { intersectionRef, isIntersecting } = useIntersectionObserver()

    watchEffect(() => {
      intersectionRef.value = root.value?.$el
    })

    let scrollParent: Element
    watch(isIntersecting, val => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value)
        scrollParent = scrollParent === document.scrollingElement ? document as any : scrollParent
        scrollParent.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
      } else {
        scrollParent.removeEventListener('scroll', onScroll)
      }
    })

    onBeforeUnmount(() => {
      scrollParent?.removeEventListener('scroll', onScroll)
    })

    let frame = -1
    function onScroll () {
      if (!isIntersecting.value) return

      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el: HTMLElement | null = (root.value?.$el as Element).querySelector('.v-img__img')
        if (!el) return

        const rect = intersectionRef.value!.getBoundingClientRect()
        const scrollHeight = scrollParent.clientHeight ?? window.innerHeight
        const scrollPos = scrollParent.scrollTop ?? window.scrollY
        const top = rect.top + scrollPos
        const progress = (scrollPos + scrollHeight - top) / (rect.height + scrollHeight)
        const translate = floor((rect.height * +props.scale - rect.height) * (-progress + 0.5))

        el.style.setProperty('transform', `translateY(${translate}px) scale(${props.scale})`)
      })
    }

    return () => (
      <VImg
        class={[
          'v-parallax',
          { 'v-parallax--active': isIntersecting.value },
        ]}
        ref={ root }
        cover
        onLoadstart={ onScroll }
        onLoad={ onScroll }
        v-slots={ slots }
      />
    )
  },
})

export type VParallax = InstanceType<typeof VParallax>
