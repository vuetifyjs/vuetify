<template>
  <v-card class="elevation-0 py-5">
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-layout row wrap>
          <v-flex xs12 sm6 class="py-2">
            <p>Exclusive</p>
            <v-btn-toggle v-bind:items="toggle_options" v-model="toggle_exclusive"></v-btn-toggle>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <p>Multiple</p>
            <v-btn-toggle v-bind:items="toggle_options_multiple" multiple v-model="toggle_multiple"></v-btn-toggle>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <p>No Options Selected</p>
            <v-btn-toggle v-bind:items="toggle_options" v-model="toggle_none"></v-btn-toggle>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <p>Mandatory</p>
            <v-btn-toggle v-bind:items="toggle_options_multiple" mandatory v-model="toggle_one"> </v-btn-toggle>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <p>Text Options</p>
            <v-btn-toggle v-bind:items="toggle_text" v-model="text"></v-btn-toggle>
          </v-flex>
          <v-flex xs12 sm6 class="py-2">
            <p>Text &amp; Icon Options</p>
            <v-btn-toggle v-bind:items="toggle_text_icon" v-model="icon"></v-btn-toggle>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        text: 4,
        icon: null,
        toggle_none: null,
        toggle_one: null,
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3],
        toggle_text_icon: [
          { text: 'Left', icon: 'format_align_left', value: 1 },
          { text: 'Center', icon: 'format_align_center', value: 2 },
          { text: 'Right', icon: 'format_align_right', value: 3 },
          { text: 'Justify', icon: 'format_align_justify', value: 4 }
        ],
        toggle_text: [
          { text: 'Left', value: 1 },
          { text: 'Center', value: 2 },
          { text: 'Right', value: 3 },
          { text: 'Justify', value: 4 }
        ],
        toggle_options: [
          { icon: 'format_align_left', value: 1 },
          { icon: 'format_align_center', value: 2 },
          { icon: 'format_align_right', value: 3 },
          { icon: 'format_align_justify', value: 4 }
        ],
        toggle_options_multiple: [
          { icon: 'format_bold', value: 1 },
          { icon: 'format_italic', value: 2 },
          { icon: 'format_underlined', value: 3 },
          { icon: 'format_color_fill', value: 4 }
        ],
      }
    }
  }

</script>
