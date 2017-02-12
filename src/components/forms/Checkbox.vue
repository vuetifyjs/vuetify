<template lang="pug">
  div(class="input-group")
    input(
      type="checkbox"
      v-bind:class="classes"
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:value="valueV"
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
        inputValue: null
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
      },

      valueV: {
        required: false
      },
    },

    watch: {
      inputValue () {
        if ((Array.isArray(this.inputValue) &&
            this.inputValue.includes(this.valueV)) ||
            (!Array.isArray(this.inputValue) &&
              this.inputValue)
        ) {
          this.$refs.input.checked = true
        } else {
          this.$refs.input.checked = false
        }
      },

      value () {
        this.inputValue = this.value
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

      this.inputValue = this.value
      this.$refs.input.indeterminate = this.indeterminate

      this.$refs.input.onchange = function (e) {
        if (!Array.isArray(vm.inputValue)) {
          return vm.$emit('input', e.target.checked)
        }

        const i = vm.inputValue.indexOf(vm.valueV)
        let input = vm.inputValue

        if (i === -1) {
          console.log(vm.valueV)
          input.push(vm.valueV)
        } else {
          input.splice(i, 1)
        }

        vm.$emit('input', input)
      }
    }
  }
</script>