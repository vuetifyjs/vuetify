import { defineComponent } from 'vue'

export default defineComponent({
  name: 'transitionable',

  props: {
    mode: String,
    origin: String,
    transition: String,
  },
})
