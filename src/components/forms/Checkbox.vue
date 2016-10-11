<template lang="pug">
  div(
    class="form-input"
  )
    input(
      type="checkbox"
      v-bind:class="classes"
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:value="value"
      ref="input"
    )
    label(
      v-bind:for="id"
      v-html="label"
    )
</template>

<script>
  export default {
    name: 'checkbox',
    
    data () {
      return {
        model: null
      }
    },

    props: {
      disabled: Boolean,

      filled: Boolean,

      gap: Boolean,

      id: {
        type: String,
        default: ''
      },

      indeterminate: Boolean,
      
      label: {
        type: String,
        default: ''
      },

      name: {
        type: String,
        default: ''
      },

      value: {
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'filled': this.filled
        }
      }
    },

    mounted () {
      const vm = this
      this.model = this.$el._value

      this.$refs.input.indeterminate = this.indeterminate

      this.state()

      this.$refs.input.onchange = function () {
        const c = this.checked,
              v = this.value

        if (!vm.model
            || typeof vm.model === 'string'
        ) {
          return vm.$emit('input', c ? v || true : null)
        }

        const i = vm.model.indexOf(v)

        if (c) {
          vm.model.push(v)
        } else {
          vm.model.splice(i, 1)
        }

        vm.$emit('input', vm.model)
      }
    },

    methods: {
      state () {
        if (!this.model) {
          return
        }

        if (typeof this.model === 'string' 
            && this.model === this.value
            || this.model.includes(this.value)
        ) {
          this.$refs.input.checked = true
        }
      }
    }
  }
</script>