<template>
  <v-content>
    <v-slide-y-transition mode="out-in">
      <core-page
        :page="page"
        :namespace="namespace"
        :key="$route.path"
      />
    </v-slide-y-transition>
  </v-content>
</template>

<script>
  export default {
    inject: ['namespace', 'page']
  }
</script>
