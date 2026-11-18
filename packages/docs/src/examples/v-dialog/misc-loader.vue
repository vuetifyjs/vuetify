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
        elevation="4"
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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13767-220630"
  }
</example-meta>
