<template>
  <div>
    <v-text-field
      v-model="gradient"
      label="Gradient"
    ></v-text-field>

    <v-jumbotron :gradient="gradient" dark>
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h3 class="display-3">Gradient</h3>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </div>
</template>

<script>
  export default {
    data: () => ({
      gradient: 'to top, #7B1FA2, #E1BEE7'
    })
  }
</script>
