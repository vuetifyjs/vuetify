<template lang="pug">
  transition(name="modal")
    div(
      class="modal"
      v-bind:class="classes"
      v-bind:id="id"
      v-show="active"
    )
      slot
</template>

<script>
  import Toggleable from '../../mixins/toggleable'

  export default {
    name: 'modal',

    mixins: [ 
      Toggleable 
    ],

    data () {
      return {
        closeOnClick: false,
        overlay: {}
      }
    },

    props: {
      bottom: Boolean,

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
          'modal--bottom': this.bottom
        }
      }
    },

    mounted () {
      this.initOverlay()
    },

    methods: {
      close (e, force = false) {
        if (force) {
          return this.active = false
        }

        if (e.target === this.$el || this.$el.contains(e.target)) {
          return
        }

        if (this.activator === null) {
          return
        }
        
        try {
          if (e.target === this.activator
              || this.activator.contains(e.target)
          ) {
            return
          }
        } catch (e) {}

        this.active = false
      },

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