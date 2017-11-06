<template>
  <v-card flat class="py-5" color="grey lighten-3">
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm4>
            <p>Overflow</p>
            <v-select v-bind:items="dropdown_font" overflow label="Select"></v-select>
          </v-flex>
          <v-flex xs12 sm4>
            <p>Segmented</p>
            <v-select v-bind:items="dropdown_icon" label="Select" segmented></v-select>
          </v-flex>
          <v-flex xs12 sm4>
            <p>Editable</p>
            <v-select v-bind:items="dropdown_edit" label="Select" editable item-value="text"></v-select>
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
        dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
        dropdown_icon: [
          { text: 'list', callback: () => console.log('list')},
          { text: 'favorite', callback: () => console.log('favorite')},
          { text: 'delete', callback: () => console.log('delete')}
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
