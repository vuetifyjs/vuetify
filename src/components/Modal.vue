<template lang="pug">
  div(
    v-bind:class="classes"
    v-bind:id="id"
  )
    slot
</template>

<script>
  import Toggleable from '../mixins/toggleable'

  export default {
    name: 'modal',

    mixins: [ 
      Toggleable 
    ],

    data () {
      return {
        overlay: {}
      }
    },

    props: {
      bottom: {
        type: Boolean,
        default: false
      },

      id: {
        type: String,
        required: true
      }
    },

    watch: {
      active (bool) {
        if (bool) {
          this.openOverlay()
        } else {
          this.closeOverlay()
        }
      }
    },

    computed: {
      classes () {
        return {
          'modal': true,
          'modal--open': this.active,
          'modal--bottom': this.bottom
        }
      }
    },

    mounted () {
      this.initOverlay()
    },

    methods: {      
      initOverlay() {
        const overlay = document.getElementById('modal-overlay')
        
        if (overlay) {
          return this.overlay = overlay
        }

        this.appendOverlay()
      },

      openOverlay () {
        this.overlay.classList.add('modal-overlay--open')
      },

      closeOverlay () {
        this.overlay.classList.remove('modal-overlay--open')
      },

      appendOverlay () {
        this.overlay = document.createElement('div')
        this.overlay.id = 'modal-overlay'
        this.overlay.classList.add('modal-overlay')
        
        document.body.appendChild(this.overlay)
      }
    }
  }
</script>