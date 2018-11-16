<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6 offset-md3>
        <v-card>
          <v-toolbar extended>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-fab-transition>
              <v-btn
                v-show="!hidden"
                color="pink"
                fab
                dark
                small
                absolute
                bottom
                left
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-toolbar>
          <v-card-text style="height: 300px;" class="grey lighten-5 text-xs-center">
            <v-btn color="primary" @click="hidden = !hidden">
              {{ hidden ? 'Show' : 'Hide' }}
            </v-btn>
          </v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-fab-transition>
              <v-btn
                v-show="!hidden"
                color="pink"
                dark
                absolute
                top
                right
                fab
              >
                <v-icon>add</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      hidden: false
    })
  }
</script>
