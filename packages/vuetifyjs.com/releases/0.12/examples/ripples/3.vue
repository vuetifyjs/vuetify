<template>
  <v-tabs grow light>
    <v-tabs-bar slot="activators">
      <v-tabs-item 
        v-for="i in 3" 
        :key="i"
        :href="'#mobile-tabs-1-' + i" ripple
      >
          Item {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-content 
      v-for="i in 3"
      :key="i"
      :id="'mobile-tabs-1-' + i"
    >
      ...
    </v-tabs-content>
  </v-tabs>
</template>