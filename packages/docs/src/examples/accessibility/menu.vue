<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
        >
          Click me
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="onClick">
          <v-list-item-title>Option 1</v-list-item-title>
        </v-list-item>

        <v-list-item disabled>
          <v-list-item-title>Option 2</v-list-item-title>
        </v-list-item>

        <v-list-item @click="onClick">
          <v-list-item-title>Option 3</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  export default {
    methods: {
      onClick () {
        // Perform an action
      },
    },
  }
</script>
