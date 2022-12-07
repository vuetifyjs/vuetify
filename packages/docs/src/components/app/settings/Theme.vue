<template>
  <app-settings-group
    ref="group"
    v-model="model"
    :items="items"
    multiple
    title="theme"
  />
</template>

<script setup lang="ts">
  // Components
  import AppSettingsGroup from './Group.vue'

  // Composables
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, getCurrentInstance, nextTick, ref } from 'vue'

  const group = ref<InstanceType<typeof AppSettingsGroup>>()
  const user = useUserStore()

  const items = [
    {
      text: 'light',
      icon: 'mdi-white-balance-sunny',
    },
    {
      text: 'dark',
      icon: 'mdi-weather-night',
    },
    {
      text: 'system',
      icon: 'mdi-desktop-tower-monitor',
    },
    {
      text: 'mixed',
      icon: 'mdi-theme-light-dark',
    },
  ]

  const model = computed({
    get () {
      return [user.theme].concat(user.mixedTheme ? 'mixed' : [])
    },
    set (val: string[]) {
      const theme = user.theme
      {
        const idx = val.indexOf('mixed')
        user.mixedTheme = !!~idx
        if (~idx) {
          val.splice(idx, 1)
        }
      }
      {
        const idx = val.indexOf(user.theme)
        if (~idx) {
          val.splice(idx, 1)
        }
        if (val.length) {
          user.theme = val[0]
        }
      }
      if (user.theme !== theme) {
        startTransition(user.theme)
      }
    },
  })

  const vm = getCurrentInstance()!

  function startTransition (val: string) {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.domLoading

    if (!loadTime || loadTime > 2000) return

    const el: HTMLElement = vm.root.proxy!.$el
    const children = el.querySelectorAll('*') as NodeListOf<HTMLElement>

    if (children.length > 2000) return

    children.forEach(el => {
      if (hasScrollbar(el)) {
        el.dataset.scrollX = String(el.scrollLeft)
        el.dataset.scrollY = String(el.scrollTop)
      }
    })

    const copy = el.cloneNode(true) as HTMLElement
    copy.classList.add('app-copy')
    const rect = el.getBoundingClientRect()
    copy.style.top = rect.top + 'px'
    copy.style.left = rect.left + 'px'
    copy.style.width = rect.width + 'px'
    copy.style.height = rect.height + 'px'

    const targetEl = (group.value!.$refs as any)['item-' + val][0].$el
    const targetRect = targetEl.getBoundingClientRect()
    const left = targetRect.left + targetRect.width / 2 + window.scrollX
    const top = targetRect.top + targetRect.height / 2 + window.scrollY
    el.style.setProperty('--clip-pos', `${left}px ${top}px`)
    el.style.removeProperty('--clip-size')

    nextTick(() => {
      el.classList.add('app-transition')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.setProperty('--clip-size', Math.hypot(window.innerWidth, window.innerHeight) + 'px')
        })
      })
    })

    document.body.append(copy)

    ;(copy.querySelectorAll('[data-scroll-x], [data-scroll-y]') as NodeListOf<HTMLElement>).forEach(el => {
      el.scrollLeft = +el.dataset.scrollX!
      el.scrollTop = +el.dataset.scrollY!
    })

    function onTransitionend (e: TransitionEvent) {
      if (e.target === e.currentTarget) {
        copy.remove()
        el.removeEventListener('transitionend', onTransitionend)
        el.removeEventListener('transitioncancel', onTransitionend)
        el.classList.remove('app-transition')
        el.style.removeProperty('--clip-size')
        el.style.removeProperty('--clip-pos')
      }
    }
    el.addEventListener('transitionend', onTransitionend)
    el.addEventListener('transitioncancel', onTransitionend)
  }

  function hasScrollbar (el?: Element | null) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

    const style = window.getComputedStyle(el)
    return style.overflowY === 'scroll' || (style.overflowY === 'auto' && el.scrollHeight > el.clientHeight)
  }
</script>

<style lang="sass">
.app-copy
  position: fixed !important
  z-index: -1 !important
  pointer-events: none !important
  contain: size style !important
  overflow: clip !important

.app-transition
  --clip-size: 0
  --clip-pos: 0 0
  clip-path: circle(var(--clip-size) at var(--clip-pos))
  transition: clip-path .35s ease-out
</style>
