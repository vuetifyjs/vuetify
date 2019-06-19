<template>
  <div class="text-xs-center">
    <v-container>
      <v-layout justify-center>
        <v-flex xs8>
          <v-container max-width="300">
            <v-pagination
              v-model="page"
              class="my-3"
              :length="15"
            ></v-pagination>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>
