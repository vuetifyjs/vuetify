<template>
  <v-app>
    <v-container>
      <v-main>

        <div>VChip bug reproduction</div>
        <p>Click on a chip with a `to` prop should not cause a full page reload.</p>

        <!-- Causes full page reload -->
        <v-chip :to="{ name: 'page1' }">page1</v-chip>

        <!-- Router works -->
        <router-link :to="{ name: 'page1' }">page1</router-link>

        <!-- Causes full page reload -->
        <v-chip :to="{ name: 'page2' }">page2</v-chip>

        <!-- Router works -->
        <router-link :to="{ name: 'page2' }">page2</router-link>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
  export default {
    name: 'Playground',
    setup () {
      return {
        //
      }
    },
  }
</script>
