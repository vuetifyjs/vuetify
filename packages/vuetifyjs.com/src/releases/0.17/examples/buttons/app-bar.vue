<template>
  <v-toolbar>
    <v-select v-bind:items="dropdown_font" overflow label="Select font" hide-details></v-select>
    <v-select v-bind:items="dropdown_edit" overflow label="Select size" hide-details editable></v-select>
    <v-btn-toggle v-model="toggle_multiple" multiple>
      <v-btn icon :value="1">
        <v-icon>format_bold</v-icon>
      </v-btn>
      <v-btn icon :value="2">
        <v-icon>format_italic</v-icon>
      </v-btn>
      <v-btn icon :value="3">
        <v-icon>format_underlined</v-icon>
      </v-btn>
      <v-btn icon :value="4">
        <v-icon>format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn-toggle v-model="toggle_exclusive">
      <v-btn icon :value="1">
        <v-icon>format_align_left</v-icon>
      </v-btn>
      <v-btn icon :value="2">
        <v-icon>format_align_center</v-icon>
      </v-btn>
      <v-btn icon :value="3">
        <v-icon>format_align_right</v-icon>
      </v-btn>
      <v-btn icon :value="4">
        <v-icon>format_align_justify</v-icon>
      </v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        dropdown_font: [
          { text: 'Arial' },
          { text: 'Calibri' },
          { text: 'Courier' },
          { text: 'Verdana' }
        ],
        dropdown_edit: [
          { text: '100%' },
          { text: '75%' },
          { text: '50%' },
          { text: '25%' },
          { text: '0%' }
        ],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3]
      }
    }
  }
</script>
