<template>
  <v-layout ref="app" class="rounded rounded-md border">
    <v-app-bar color="surface-light" name="app-bar">
      <v-btn class="mx-auto" @click="print('app-bar')">Get data</v-btn>
    </v-app-bar>

    <v-navigation-drawer
      color="surface-variant"
      location="end"
      name="drawer"
      permanent
    >
      <div class="d-flex justify-center align-center h-100">
        <v-btn variant="text" @click="print('drawer')">Get data</v-btn>
      </div>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <v-sheet
          border="dashed md"
          color="surface-light"
          height="150"
          rounded="lg"
          width="100%"
        ></v-sheet>
      </v-container>
    </v-main>

    <v-footer color="surface-light" name="footer" app>
      <v-btn
        class="mx-auto"
        text="Get data"
        variant="text"
        @click="print('footer')"
      ></v-btn>
    </v-footer>
  </v-layout>
</template>

<script setup>
  import { ref } from 'vue'

  const app = ref()

  function print (key) {
    alert(JSON.stringify(app.value.getLayoutItem(key), null, 2))
  }
</script>

<script>
  export default {
    methods: {
      print (key) {
        alert(JSON.stringify(this.$refs.app.getLayoutItem(key), null, 2))
      },
    },
  }
</script>
