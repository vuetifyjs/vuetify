import './VBtnGroup.sass'

import { defineComponent } from '@/util'

export const VBtnGroup = defineComponent({
  name: 'VBtnGroup',

  props: {
    //
  },

  setup (props, { slots }) {
    return () => (
      <div class="v-btn-group">
        { slots.default?.() }
      </div>
    )
  },
})
