<template>
  <v-btn
    absolute
    class="v-btn--copy"
    icon
    right
    style="background-color: inherit;"
    top
    @click="copy"
  >
    <v-fade-transition hide-on-leave>
      <v-icon
        :key="String(clicked)"
        color="grey"
        v-text="clicked ? '$complete' : '$mdiContentCopy'"
      />
    </v-fade-transition>
  </v-btn>
</template>

<script>
  // Utilities
  import { wait } from '@/util/helpers'
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'AppCopyBtn',

    props: {
      target: {
        type: Function,
        required: true,
      },
    },

    data: () => ({
      clicked: false,
      wait: 2000,
    }),

    methods: {
      async copy () {
        if (!IN_BROWSER) return

        const el = this.target()

        el.setAttribute('contenteditable', 'true')
        el.focus()

        document.execCommand('selectAll', false, null)
        document.execCommand('copy')

        el.removeAttribute('contenteditable')

        this.clicked = true

        await wait(this.wait)

        this.clicked = false
      },
    },
  }
</script>
