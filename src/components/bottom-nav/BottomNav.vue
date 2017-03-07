<template lang="pug">
  div( v-bind:class="classes" id="bottom-nav")
    slot
</template>

<script>
  export default {
    name: 'bottom-nav',

    props: {
      value: Number,
      shift: Boolean
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
          'bottom-nav--shift': this.shift
        }
      }
    },

    watch: {
      value () {
        this.currentNav = this.value
      },

      currentNav () {
        this.toggleActiveBtn()

        // let n = this.nodes[this.currentNav]
        // n.classList.add('btn--nav-active')

        for (let i=this.nodes.length; i--;) {
          let n = this.nodes[i]
          n.style.opacity = this.currentNav === i? 1 : .5
          if (this.nodes.length > 3) {
            let content = n.getElementsByClassName('btn__content')[0]
            if (i === this.value) {
              n.classList.add('btn--nav-active')
              n.classList.remove('btn--nav-inactive')
            }
            else if (content.childNodes.length > 1) {
              n.classList.add('btn--nav-inactive')
            }
          }
        }
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
  box-shadow: 0px 0px 11px 9px rgba(50, 50, 50, 0.1);
  display: flex
  justify-content: center

  .icon
    transition: all .4s cubic-bezier(.25,.8,.25,1),color .15s linear;
    // background: green
  .btn--nav-text
    font-family: 'Roboto', san-serif
    transform: translateY(2px);

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
    transition: all .1s

    &--nav-active
      opacity: 1
      font-size: 14px
      .btn--nav-text
        transform: translateY(1px);
    &--nav-inactive
      opacity: .5
      font-size: 12px

    .btn__content
      flex-direction: column-reverse
      &:root
        display: none


  &--shift
    .icon
      transform: translate3d(0, 10px, 0);
    button.btn
      transition: all .3s
      &--nav-active
        min-width: 96px
        max-width: 168px
        .icon
          transform: scale(1) translateZ(0);
        .btn--nav-text
          opacity: 1

      &--nav-inactive
        min-width: 56px
        max-width: 96px
        .btn--nav-text
          opacity: 0
          transform: scale(1) translate3d(0,6px,0);

</style>
