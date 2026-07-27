<template>
  <div class="pa-4 text-center">
    <v-btn
      text="Open Dialog 1"
      @click="dialog = true"
    ></v-btn>

    <v-dialog
      v-model="dialog"
      max-width="480"
    >
      <v-card title="Dialog 1">
        <template v-slot:text>
          <v-btn
            class="my-2"
            text="Open Dialog 2"
            @click="dialog2 = true"
          ></v-btn>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="text"
            @click="dialog = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog2"
      max-width="240"
    >
      <v-card title="Dialog 2">
        <template v-slot:text>
          <v-btn
            class="my-2"
            text="Open Dialog 3"
            @click="dialog3 = !dialog3"
          ></v-btn>
        </template>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="text"
            @click="dialog2 = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog3"
      width="auto"
    >
      <v-card title="Dialog 3">
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="text"
            @click="dialog3 = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const dialog = shallowRef(false)
  const dialog2 = shallowRef(false)
  const dialog3 = shallowRef(false)
</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
        dialog2: false,
        dialog3: false,
      }
    },
  }
</script>
