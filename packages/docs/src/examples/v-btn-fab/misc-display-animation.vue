<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="6"
        offset-md="3"
      >
        <v-card>
          <v-toolbar extended>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <template v-slot:extension>
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
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
          </v-toolbar>
          <v-card-text
            style="height: 300px;"
            class="grey lighten-5 text-center"
          >
            <v-btn
              color="primary"
              @click="hidden = !hidden"
            >
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
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      hidden: false,
    }),
  }
</script>
