<template lang="pug">
  div.text-xs-center
    div
      em(v-text="caption")
    v-btn(
      outline
      color="success"
      round
      v-bind="bind"
    ) {{ text }}
</template>

<script>
  export default {
    props: {
      caption: {
        type: String,
        default: undefined
      },
      text: {
        type: String,
        default: undefined
      },
      href: {
        type: String,
        default: undefined
      },
      target: {
        type: String,
        default: '_blank'
      },
      to: {
        type: String,
        default: undefined
      }
    },

    computed: {
      bind () {
        const bind = {
          [this.to ? 'to' : 'href']: this.to || this.href
        }

        if (this.target) {
          bind.target = this.target
          bind.rel = 'noopener'
        }

        return bind
      }
    }
  }
</script>
