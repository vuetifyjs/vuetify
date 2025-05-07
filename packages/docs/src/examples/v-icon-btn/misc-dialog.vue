<template>
  <div class="text-center">
    <v-btn>
      Open Dialog

      <v-dialog v-model="dialog" activator="parent" max-width="500" persistent>
        <v-card subtitle="Click the X to close" title="Dialog">
          <template v-slot:append>
            <v-icon-btn icon="$close" @click="dialog = false"></v-icon-btn>
          </template>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
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
