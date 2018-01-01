<template>
  <v-tabs right>
    <v-tab v-for="n in 3" :key="n">
      Item {{ n }}
    </v-tab>
  </v-tabs>
</template>
