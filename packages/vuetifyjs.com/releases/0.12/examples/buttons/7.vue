<template>
  <v-app-bar>
    <v-btn-dropdown v-bind:options="dropdown_font" max-height="auto" overflow></v-btn-dropdown>
    <v-btn-dropdown v-bind:options="dropdown_edit" max-height="auto" overflow editable></v-btn-dropdown>
    <v-btn-toggle v-bind:options="toggle_options_multiple" v-model="toggle_multiple" multiple class="hidden-md-and-down"></v-btn-toggle>
    <v-btn-toggle v-bind:options="toggle_options" v-model="toggle_exclusive" class="hidden-sm-and-down"></v-btn-toggle>
  </v-app-bar>
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
        toggle_multiple: [1, 2, 3],
        toggle_options: [
          { icon: 'format_align_left', value: 1 },
          { icon: 'format_align_center', value: 2 },
          { icon: 'format_align_right', value: 3 },
          { icon: 'format_align_justify', value: 4 },
        ],
        toggle_options_multiple: [
          { icon: 'format_bold', value: 1 },
          { icon: 'format_italic', value: 2 },
          { icon: 'format_underlined', value: 3 },
          { icon: 'format_color_fill', value: 4 },
        ],
      }
    }
  }
</script>
