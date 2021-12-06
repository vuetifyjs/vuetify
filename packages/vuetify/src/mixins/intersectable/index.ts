// Directives
import Intersect from '../../directives/intersect'

// Utilities
import { consoleWarn } from '../../util/console'

// Types
import Vue from 'vue'

export default function intersectable (options: { onVisible: string[] }) {
  return Vue.extend({
    name: 'intersectable',

    data: () => ({
      isIntersecting: false,
    }),

    mounted () {
      Intersect.inserted(this.$el as HTMLElement, {
        name: 'intersect',
        value: this.onObserve,
      }, this.$vnode)
    },

    destroyed () {
      Intersect.unbind(this.$el as HTMLElement, {
        name: 'intersect',
        value: this.onObserve,
      }, this.$vnode)
    },

    methods: {
      onObserve (entries: IntersectionObserverEntry[], observer: IntersectionObserver, isIntersecting: boolean) {
        this.isIntersecting = isIntersecting

        if (!isIntersecting) return

        for (let i = 0, length = options.onVisible.length; i < length; i++) {
          const callback = (this as any)[options.onVisible[i]]

          if (typeof callback === 'function') {
            callback()
            continue
          }

          consoleWarn(options.onVisible[i] + ' method is not available on the instance but referenced in intersectable mixin options')
        }
      },
    },
  })
}
