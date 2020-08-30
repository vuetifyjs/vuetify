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
    <transition-icon
      :wait="wait"
      from="$mdiContentCopy"
      to="$complete"
    />
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
      copied: false,
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

        this.copied = true

        await wait(this.wait)

        this.copied = false
      },
    },
  }
</script>
