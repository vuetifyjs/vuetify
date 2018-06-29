<template>
  <form>
    <v-text-field
      v-model="name"
      label="Name"
      :counter="10"
      :error-messages="errors.collect('name')"
      v-validate="'required|max:10'"
      data-vv-name="name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      label="E-mail"
      :error-messages="errors.collect('email')"
      v-validate="'required|email'"
      data-vv-name="email"
      required
    ></v-text-field>
    <v-select
      v-bind:items="items"
      v-model="select"
      label="Select"
      :error-messages="errors.collect('select')"
      v-validate="'required'"
      data-vv-name="select"
      required
    ></v-select>
    <v-checkbox
      v-model="checkbox"
      value="1"
      label="Option"
      :error-messages="errors.collect('checkbox')"
      v-validate="'required'"
      data-vv-name="checkbox"
      type="checkbox"
      required
    ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
  export default {
    $validates: true,
    data () {
      return {
        name: '',
        email: '',
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        checkbox: null
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll()
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$validator.clean()
      }
    }

  }
</script>
