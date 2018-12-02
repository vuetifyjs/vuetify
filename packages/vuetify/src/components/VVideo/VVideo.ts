import Vue from 'vue'

// Types
import { VNode } from 'vue/types/vnode'

/* @vue/component */
export default Vue.extend({
  name: 'VVideo',
  props: {
    src: String,
    autoplay: Boolean,
    loop: Boolean,
    muted: Boolean
  },
  methods: {
    play () {
      (this.$refs.video as HTMLVideoElement).play()
    },
    pause () {
      (this.$refs.video as HTMLVideoElement).pause()
    }
  },
  render (h): VNode {
    return h('div', { staticClass: 'v-video' }, [
      h('video', {
        ref: 'video',
        staticClass: 'v-video-content',
        attrs: {
          autoplay: this.autoplay,
          loop: this.loop,
          muted: this.muted,
          src: this.src
        }
      })
    ])
  }
})
