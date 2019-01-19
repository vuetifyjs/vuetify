<template>
  <v-toolbar dense>
    <v-overflow-btn
      :items="dropdown_font"
      label="Select font"
      hide-details
      class="pa-0"
    ></v-overflow-btn>

    <v-divider vertical></v-divider>

    <v-overflow-btn
      :items="dropdown_edit"
      editable
      label="Select size"
      hide-details
      class="pa-0"
      overflow
    ></v-overflow-btn>

    <v-divider
      class="mr-2"
      vertical
    ></v-divider>

    <v-btn-toggle
      v-model="toggle_multiple"
      class="transparent"
      multiple
    >
      <v-btn :value="1" flat>
        <v-icon>format_bold</v-icon>
      </v-btn>

      <v-btn :value="2" flat>
        <v-icon>format_italic</v-icon>
      </v-btn>

      <v-btn :value="3" flat>
        <v-icon>format_underlined</v-icon>
      </v-btn>

      <v-btn :value="4" flat>
        <v-icon>format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-divider
      class="mx-2"
      vertical
    ></v-divider>

    <v-btn-toggle
      v-model="toggle_exclusive"
      class="transparent"
    >
      <v-btn :value="1" flat>
        <v-icon>format_align_left</v-icon>
      </v-btn>

      <v-btn :value="2" flat>
        <v-icon>format_align_center</v-icon>
      </v-btn>

      <v-btn :value="3" flat>
        <v-icon>format_align_right</v-icon>
      </v-btn>

      <v-btn :value="4" flat>
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
