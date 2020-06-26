<template>
  <v-fade-transition hide-on-leave>
    <v-icon
      :key="String(clicked)"
      color="grey"
      @click="onClick"
      v-text="icon || clicked ? to : from"
    />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { wait } from '@/util/helpers'

  export default {
    name: 'TransitionIcon',

    props: {
      icon: String,
      from: String,
      to: String,
      wait: [Number, String],
    },

    data: () => ({ clicked: false }),

    methods: {
      async onClick (e) {
        this.$emit('click', e)

        this.clicked = !this.clicked

        if (!this.wait) return

        await wait(this.wait)

        this.clicked = false
      },
    },
  }
</script>
