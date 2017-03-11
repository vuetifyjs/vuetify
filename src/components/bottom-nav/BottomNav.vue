<template lang="pug">
  div( v-bind:class="classes" id="bottom-nav")
    slot
</template>

<script>
  export default {
    name: 'bottom-nav',

    render (h) {
      const data = {
        'class': this.classes,
        style: {
          width: `calc(100% / ${this.$slots.length})`
        },
        attrs: {
          id: 'bottom-nav'
        }
      }

      return h('div', data, this.$slots.default)
    },

    props: {
      value: Number,
      shift: Boolean,
      hidden: Boolean
    },

    data () {
      return {
        currentNav: null,
        children: [],
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
      this.children = this.$slots.default.filter(slot => {
        return slot.elm.nodeName === 'BUTTON'
      })

      for (let i=this.children.length; i--;) {
        if (i === this.value) {
          this.children[i].elm.classList.add('btn--nav-active')
          break
        }
      }
    },

    methods: {
      activateBtn (i) {
        this.children[i].elm.classList.add('btn--nav-active')
      },

      toggleActiveBtn () {
        for (let i=this.children.length; i--;) {
          if (this.children[i].elm.classList.contains('btn--nav-active')) {
            this.children[i].elm.classList.remove('btn--nav-active')
            break
          }
        }
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
        transition: all .4s cubic-bezier(.25,.8,.50,1)
        // background: green

      .btn__content
        font-family: 'Roboto', san-serif
        font-size: 12px
        transform: scale(1) translateY(2px)
        transition: font-size .1s ease-in-out
        transition-property: flex, min-width, max-width
        flex-direction: column-reverse


      &--nav-active
        opacity: 1
        .btn__content
          transform: translateY(1px)
          font-size: 14px
          .icon
            transform: translateY(1px)

    &--shift

      .btn__content
        font-size: 14px
        transform: scale(1) translate3d(0,6px,0);
        .icon
          transform: translate3d(0, 10px, 0);
          opacity: 1

      button.btn
        transition: all .3s
        min-width: 56px
        max-width: 96px

        &--nav-active
          min-width: 96px
          max-width: 168px
          .icon
            transform: scale(1) translateZ(0);
          .btn__content
            transform: scale(1) translate3d(0, 2px, 0);
            opacity: 1


  .bottom-nav--shift
    .btn:not(.btn--nav-active)
      .btn__content
        color: transparent

        .icon
          color: initial
</style>
