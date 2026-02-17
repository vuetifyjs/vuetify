<template>
  <div class="pa-4 text-center">
    <v-btn
      :disabled="dialog"
      color="primary"
      icon="mdi-refresh"
      text="Start loading"
      @click="dialog = true"
    ></v-btn>

    <v-dialog
      v-model="dialog"
      max-width="320"
      persistent
    >
      <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <v-list-item
          prepend-icon="$vuetify-outline"
          title="Refreshing Application..."
        >
          <template v-slot:prepend>
            <div class="pe-4">
              <v-icon color="primary" size="x-large"></v-icon>
            </div>
          </template>

          <template v-slot:append>
            <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
            ></v-progress-circular>
          </template>
        </v-list-item>
      </v-list>
    </v-dialog>
  </div>
</template>

<script setup>
  import { shallowRef, watch } from 'vue'

  const dialog = shallowRef(false)
  watch(dialog, val => {
    if (!val) return
    setTimeout(() => (dialog.value = false), 4000)
  })
</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },

    watch: {
      dialog (val) {
        if (!val) return

        setTimeout(() => (this.dialog = false), 4000)
      },
    },
  }
</script>
