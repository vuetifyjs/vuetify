<template lang="pug">
  div(class="btn-dropdown")
    button(ref="btn" v-on:click="active = !active")
      span State 1
      v-icon arrow_drop_down
    transition(name="button")
      ul(v-show="active")
        li(v-for="n in 10") State {{ n }}
</template>

<script>
  export default {
    data () {
      return {
        active: false
      }
    },

    watch: {
      active () {
        // setTimeout(() => this.active = false, 3000)
      }
    }
  }
</script>