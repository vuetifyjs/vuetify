<template>
  <v-card class="elevation-0 py-5">
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-layout row wrap>
          <v-flex xs12 sm4 class="py-2">
            <p>Overflow</p>
            <v-btn-dropdown v-bind:options="dropdown_font" max-height="auto" overflow="overflow"></v-btn-dropdown>
          </v-flex>
          <v-flex xs12 sm4 class="py-2">
            <p>Segmented</p>
            <v-btn-dropdown v-bind:options="dropdown_icon" segmented="segmented"></v-btn-dropdown>
          </v-flex>
          <v-flex xs12 sm4 class="py-2">
            <p>Editable</p>
            <v-btn-dropdown v-bind:options="dropdown_edit" max-height="auto" editable="editable"></v-btn-dropdown>
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
        dropdown_font: [
          { text: 'Arial' },
          { text: 'Calibri' },
          { text: 'Courier' },
          { text: 'Verdana' }
        ],
        dropdown_icon: [
          { action: 'list' },
          { action: 'favorite' },
          { action: 'delete' },
        ],
        dropdown_edit: [
          { text: '100%' },
          { text: '75%' },
          { text: '50%' },
          { text: '25%' },
          { text: '0%' }
        ],
      }
    }
  }
</script>
