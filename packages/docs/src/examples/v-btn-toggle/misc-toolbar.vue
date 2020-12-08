<template>
  <v-toolbar dense>
    <v-overflow-btn
      :items="dropdown_font"
      label="Select font"
      hide-details
      class="pa-0"
    ></v-overflow-btn>

    <template v-if="$vuetify.breakpoint.mdAndUp">
      <v-divider vertical></v-divider>

      <v-overflow-btn
        :items="dropdown_edit"
        editable
        label="Select size"
        hide-details
        class="pa-0"
        overflow
      ></v-overflow-btn>

      <v-divider vertical></v-divider>

      <v-spacer></v-spacer>

      <v-btn-toggle
        v-model="toggle_multiple"
        color="primary"
        dense
        group
        multiple
      >
        <v-btn
          :value="1"
          text
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn
          :value="2"
          text
        >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
          :value="3"
          text
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn
          :value="4"
          text
        >
          <v-icon>mdi-format-color-fill</v-icon>
        </v-btn>
      </v-btn-toggle>

      <div class="mx-4"></div>

      <v-btn-toggle
        v-model="toggle_exclusive"
        color="primary"
        dense
        group
      >
        <v-btn
          :value="1"
          text
        >
          <v-icon>mdi-format-align-left</v-icon>
        </v-btn>

        <v-btn
          :value="2"
          text
        >
          <v-icon>mdi-format-align-center</v-icon>
        </v-btn>

        <v-btn
          :value="3"
          text
        >
          <v-icon>mdi-format-align-right</v-icon>
        </v-btn>

        <v-btn
          :value="4"
          text
        >
          <v-icon>mdi-format-align-justify</v-icon>
        </v-btn>
      </v-btn-toggle>
    </template>
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
          { text: 'Verdana' },
        ],
        dropdown_edit: [
          { text: '100%' },
          { text: '75%' },
          { text: '50%' },
          { text: '25%' },
          { text: '0%' },
        ],
        toggle_exclusive: 2,
        toggle_multiple: [1, 2, 3],
      }
    },
  }
</script>
