<template>
  <v-btn
    absolute
    icon
    right
    style="background-color: inherit;"
    top
    @click="copy"
  >
    <v-fade-transition hide-on-leave>
      <v-icon
        :key="String(copied)"
        color="grey"
        v-text="copied ? '$complete' : '$mdiContentCopy'"
      />
    </v-fade-transition>
  </v-btn>
</template>

<script>
  // Utilities
  import { wait } from '@/util/helpers'

  export default {
    name: 'AppCopyBtn',

    props: {
      target: {
        type: Function,
        required: true,
      },
    },

    data: () => ({ copied: false }),

    methods: {
      async copy () {
        const el = this.target()

        el.setAttribute('contenteditable', 'true')
        el.focus()

        document.execCommand('selectAll', false, null)
        document.execCommand('copy')

        el.removeAttribute('contenteditable')

        this.copied = true

        await wait(2000)

        this.copied = false
      },
    },
  }
</script>
