<template>
  <v-container id="dropdown-example" grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 sm4>
        <p>Overflow</p>
        <v-select
          :items="dropdown_font"
          overflow
          label="Select"
          target="#dropdown-example"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4>
        <p>Segmented</p>
        <v-select
          :items="dropdown_icon"
          label="Select"
          segmented
          target="#dropdown-example"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm4>
        <p>Editable</p>
        <v-select
          :items="dropdown_edit"
          label="Select"
          editable
          item-value="text"
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      dropdown_font: ['Arial', 'Calibri', 'Courier', 'Verdana'],
      dropdown_icon: [
        { text: 'list', callback: () => console.log('list') },
        { text: 'favorite', callback: () => console.log('favorite') },
        { text: 'delete', callback: () => console.log('delete') }
      ],
      dropdown_edit: [
        { text: '100%' },
        { text: '75%' },
        { text: '50%' },
        { text: '25%' },
        { text: '0%' }
      ]
    })
  }
</script>
