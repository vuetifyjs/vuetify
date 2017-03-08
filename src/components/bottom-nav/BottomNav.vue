<template lang="pug">
  div( v-bind:class="classes" id="bottom-nav")
    slot
</template>

<script>
  export default {
    name: 'bottom-nav',

    props: {
      value: Number,
      shift: Boolean,
      hidden: Boolean
    },

    data () {
      return {
        currentNav: null,
        nodes: [],
        nodesLabel: []
      }
    },

    computed: {
      classes () {
        return {
          'bottom-nav': true, // always on
          'bottom-nav--shift': this.shift,
          'bottom-nav--hidden': this.hidden
        }
      }
    },

    watch: {
      value () {
        this.currentNav = this.value
      },

      currentNav () {
        this.toggleActiveBtn()
        this.activateBtn(this.currentNav)
      }
    },
    mounted () {
        this.nodes = document.getElementById('bottom-nav').getElementsByClassName('btn')
        let count = this.nodes.length
        for (let i=count; i--;) {
          let n = this.nodes[i]
          // n.style.opacity = this.value === i? 1 : .5
          n.style.width = `calc(100% / ${count})`

          // button text
          let content = n.getElementsByClassName('btn__content')[0]

          // create a span with the button text
          let text = document.createElement('span')
          text.classList.add('btn--nav-text')
          text.textContent = content.firstChild.textContent

          // replace text with the span
          content.removeChild(content.firstChild)
          content.insertBefore(text, content.firstChild)

          if (i === this.value)
            n.classList.add('btn--nav-active')
          else
            n.classList.add('btn--nav-inactive')
        }
    },
    methods: {
      activateBtn (i) {
        let n = this.nodes[this.currentNav]
        n.classList.add('btn--nav-active')
        n.classList.remove('btn--nav-inactive')
      },
      toggleActiveBtn () {
        let active = document.getElementsByClassName('btn--nav-active')[0]
        // console.log(active)
        if (active) {
          active.classList.remove('btn--nav-active')
        }
      },
      onclick () {
        console.log('click')
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
  box-shadow: 0 3px 14px 2px rgba(#000, .12)
  display: flex
  justify-content: center
  transition: all .4s cubic-bezier(.25,.8,.50,1)

  &--hidden
    bottom: -60px

  button.btn
    flex: 1;
    height: 100%
    top: 0
    border-radius: 0
    margin: 0
    min-width: 80px
    max-width: 168px
    padding: 0px 12px
    text-transform: capitalize
    opacity: .5

    .icon
      transition: all .4s cubic-bezier(.25,.8,.50,1),color .15s linear;

    .btn--nav-text
      font-family: 'Roboto', san-serif
      font-size: 12px
      transform: scale(1) translateY(2px);
      transition: font-size .1s ease-in-out
      transition-property: flex, min-width, max-width;

    &--nav-active
      opacity: 1
      .btn--nav-text
        transform: translateY(1px);
        font-size: 14px

    .btn__content
      flex-direction: column-reverse
      &:root
        display: none


  &--shift
    .icon
      transform: translate3d(0, 10px, 0);
    .btn--nav-text
      font-size: 14px

    button.btn
      transition: all .3s
      &--nav-active
        min-width: 96px
        max-width: 168px
        .icon
          transform: scale(1) translateZ(0);
        .btn--nav-text
          transform: scale(1) translate3d(0, 2px, 0);
          opacity: 1

      &--nav-inactive
        min-width: 56px
        max-width: 96px
        .btn--nav-text
          opacity: 0
          transform: scale(1) translate3d(0,6px,0);

</style>
