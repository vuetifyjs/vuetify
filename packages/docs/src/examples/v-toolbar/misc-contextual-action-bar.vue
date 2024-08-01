<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      :color="selection.length ? 'grey darken-4' : 'deep-purple accent-4'"
      dark
    >
      <v-app-bar-nav-icon v-if="!selection.length"></v-app-bar-nav-icon>
      <v-btn
        v-else
        icon
        @click="selection = []"
      >
        <v-icon icon="i-mdi:close"></v-icon>
      </v-btn>

      <v-toolbar-title>
        {{ selection.length ? `${selection.length} selected` : 'Photos' }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-scale-transition>
        <v-btn
          v-if="selection.length"
          key="export"
          icon
        >
          <v-icon icon="i-mdi:export-variant"></v-icon>
        </v-btn>
      </v-scale-transition>
      <v-scale-transition>
        <v-btn
          v-if="selection.length"
          key="delete"
          icon
        >
          <v-icon icon="i-mdi:delete"></v-icon>
        </v-btn>
      </v-scale-transition>

      <v-btn icon>
        <v-icon icon="i-mdi:dots-vertical"></v-icon>
      </v-btn>
    </v-toolbar>

    <v-card-text>
      <v-select
        v-model="selection"
        :items="items"
        label="Select an option"
        multiple
      ></v-select>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ['Foo', 'Bar', 'Fizz', 'Buzz']

  const selection = ref([])
</script>

<script>
  export default {
    data: () => ({
      selection: [],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
  }
</script>
