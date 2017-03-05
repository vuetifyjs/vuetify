<template lang="pug">
  div( class="bottom-nav" id="bottom-nav")
    slot
</template>

<script>
  export default {
    name: 'bottom-nav',

    mounted () {
      let nodes = document.getElementById('bottom-nav').getElementsByClassName('btn')
      let count = nodes.length
      for (let i=count; i--;) {
        nodes[i].style.width = `calc(100% / ${count})`
      }
    },

    data () {
      return {
        activeBtn: null
      }
    }
  }
</script>

<style lang="stylus">
  .bottom-nav
    bottom: 0
    position: fixed
    width: 100%
    height: 56px
    box-shadow: 0px 0px 11px 9px rgba(50, 50, 50, 0.1);
    display: flex
    justify-content: center

    button.btn
      height: 100%
      top: 0
      border-radius: 0
      margin: 0
      min-width: 80px
      max-width: 168px
      text-transform: capitalize

      .btn__content
        flex-direction: column-reverse
</style>
