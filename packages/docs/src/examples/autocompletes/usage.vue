<template>
  <div>
    <v-autocomplete
      label="Components"
      :items="components"
    ></v-autocomplete>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        components: [
          'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
        ],
      }
    },
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
