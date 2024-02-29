<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="6"
        offset-md="3"
        sm="12"
      >
        <v-card>
          <v-toolbar extended>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <template v-slot:extension>
              <v-fab-transition>
                <v-btn
                  v-show="!hidden"
                  color="pink"
                  location="bottom left"
                  size="small"
                  absolute
                  fab
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </template>
          </v-toolbar>
          <v-card-text
            class="bg-grey-lighten-5 text-center"
            style="height: 300px;"
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
                location="top right"
                absolute
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

<script setup>
  import { ref } from 'vue'

  const hidden = ref(false)
</script>

<script>
  export default {
    data: () => ({
      hidden: false,
    }),
  }
</script>
