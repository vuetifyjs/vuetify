<template>
  <v-text-field
    class="mx-auto"
    hide-details="auto"
    label="Search"
    max-width="200"
    variant="outlined"
  >
    <template v-slot:append-inner>
      <v-icon-btn
        :opacity="dialog ? 1 : 0.32"
        icon="mdi-magnify"
        @click.stop
        @mousedown.stop
      >
        <v-icon></v-icon>

        <v-dialog v-model="dialog" activator="parent" width="400">
          <v-card title="Find in page">
            <v-card-text>
              <v-text-field hide-details="auto" label="Search"></v-text-field>
            </v-card-text>

            <template v-slot:actions>
              <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

              <v-btn text="Search" @click="dialog = false"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </v-icon-btn>
    </template>
  </v-text-field>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const dialog = shallowRef(false)
</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
