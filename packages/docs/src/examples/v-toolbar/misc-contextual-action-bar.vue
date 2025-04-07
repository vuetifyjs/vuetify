<template>
  <v-card class="mx-auto" max-width="500">
    <v-toolbar :color="selection.length ? 'surface-variant' : 'deep-purple accent-4'">
      <template v-slot:prepend>
        <v-fade-transition hide-on-leave>
          <v-btn
            :key="selection.length > 0"
            :icon="selection.length ? 'mdi-close' : 'mdi-menu'"
            @click="onClick"
          ></v-btn>
        </v-fade-transition>
      </template>

      <v-toolbar-title :text="selection.length ? `${selection.length} selected` : 'Photos'"></v-toolbar-title>

      <template v-slot:append>
        <v-fade-transition hide-on-leave>
          <v-btn
            v-if="selection.length"
            key="export"
            icon="mdi-export-variant"
          ></v-btn>
        </v-fade-transition>

        <v-fade-transition hide-on-leave>
          <v-btn
            v-if="selection.length"
            key="delete"
            icon="mdi-delete"
          ></v-btn>
        </v-fade-transition>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>

    <v-card-text>
      <v-select
        v-model="selection"
        :items="items"
        hint="Make a selection"
        label="Select an option"
        clearable
        multiple
        open-on-clear
        persistent-hint
      ></v-select>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const items = ['Foo', 'Bar', 'Fizz', 'Buzz']

  const selection = shallowRef([])

  function onClick () {
    if (!selection.value.length) return

    selection.value = []
  }
</script>

<script>
  export default {
    data: () => ({
      selection: [],
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),

    methods: {
      onClick () {
        if (!this.selection.length) return

        this.selection = []
      },
    },
  }
</script>
