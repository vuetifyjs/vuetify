<template>
  <v-layout ref="app" class="rounded rounded-md">
    <v-app-bar color="grey-lighten-2" name="app-bar">
      <v-btn class="mx-auto" @click="print('app-bar')">Get data</v-btn>
    </v-app-bar>

    <v-navigation-drawer
      color="grey-darken-2"
      location="end"
      name="drawer"
      permanent
    >
      <div class="d-flex justify-center align-center h-100">
        <v-btn @click="print('drawer')">Get data</v-btn>
      </div>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>

    <v-footer
      name="footer"
      app
    >
      <v-btn
        class="mx-auto"
        variant="text"
        @click="print('footer')"
      >
        Get data
      </v-btn>
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
