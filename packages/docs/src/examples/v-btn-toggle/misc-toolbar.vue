<template>
  <v-toolbar>
    <!-- <v-overflow-btn
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

    <v-divider vertical></v-divider> -->

    <v-spacer></v-spacer>

    <v-btn-toggle
      v-model="toggle_multiple"
      variant="plain"
      color="primary"
      multiple
    >
      <v-btn
        :value="1"
        icon="mdi-format-bold"
      ></v-btn>

      <v-btn
        :value="2"
        icon="mdi-format-italic"
      ></v-btn>

      <v-btn
        :value="3"
        icon="mdi-format-underline"
      ></v-btn>

      <v-btn
        :value="4"
        icon="mdi-format-color-fill"
      ></v-btn>
    </v-btn-toggle>

    <div class="mx-4"></div>

    <v-btn-toggle
      v-model="toggle_exclusive"
      variant="plain"
      color="primary"
      dense
      group
    >
      <v-btn
        :value="1"
        icon="mdi-format-align-left"
      ></v-btn>

      <v-btn
        :value="2"
        icon="mdi-format-align-center"
      ></v-btn>

      <v-btn
        :value="3"
        icon="mdi-format-align-right"
      ></v-btn>

      <v-btn
        :value="4"
        icon="mdi-format-align-justify"
      ></v-btn>
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
