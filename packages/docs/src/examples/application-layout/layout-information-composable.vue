<template>
  <v-layout ref="app" class="rounded rounded-md border">
    <v-app-bar color="surface-variant" name="app-bar">
      <child v-slot="{ print }">
        <v-btn class="mx-auto" @click="print('app-bar')">Get data</v-btn>
      </child>
    </v-app-bar>

    <v-navigation-drawer
      color="surface-light"
      name="drawer"
      permanent
    >
      <div class="d-flex justify-center align-center h-100">
        <child v-slot="{ print }">
          <v-btn variant="text" @click="print('drawer')">Get data</v-btn>
        </child>
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
  import { useLayout } from 'vuetify'

  const Child = {
    setup (props, ctx) {
      const { getLayoutItem } = useLayout()

      function print (key) {
        alert(JSON.stringify(getLayoutItem(key), null, 2))
      }

      return () => ctx.slots.default({ print })
    },
  }
</script>

<script>
  import { useLayout } from 'vuetify'

  const Child = {
    setup (props, ctx) {
      const { getLayoutItem } = useLayout()

      function print (key) {
        alert(JSON.stringify(getLayoutItem(key), null, 2))
      }

      return () => ctx.slots.default({ print })
    },
  }

  export default {
    components: { Child },
  }
</script>
