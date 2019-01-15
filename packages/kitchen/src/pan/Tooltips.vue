<template>
  <v-container>
    <v-layout column>
      <h3 class="title grey--text mb-4 mt-5 center">
        Simple
      </h3>
      <v-flex>
        <v-layout justify-space-around>
          <v-tooltip left>
            <v-btn
              slot="activator"
              color="primary"
              dark
            >
              Left
            </v-btn>
            <span>Left tooltip</span>
          </v-tooltip>

          <v-tooltip top>
            <v-btn
              slot="activator"
              color="primary"
              dark
            >
              Top
            </v-btn>
            <span>Top tooltip</span>
          </v-tooltip>

          <v-tooltip bottom>
            <v-btn
              slot="activator"
              color="primary"
              dark
            >
              Bottom
            </v-btn>
            <span>Bottom tooltip</span>
          </v-tooltip>

          <v-tooltip right>
            <v-btn
              slot="activator"
              color="primary"
              dark
            >
              Right
            </v-btn>
            <span>Right tooltip</span>
          </v-tooltip>
        </v-layout>
      </v-flex>

      <h3 class="title grey--text mb-4 mt-5 center">
        Programmatic visibility control
      </h3>
      <v-flex>
        <v-layout
          flex
          column
          align-center
        >
          <v-flex xs12>
            <v-btn @click="show = !show">
              toggle
            </v-btn>
          </v-flex>

          <v-flex
            xs12
            class="mt-5"
          >
            <v-tooltip
              v-model="show"
              top
            >
              <v-btn
                slot="activator"
                icon
              >
                <v-icon color="grey lighten-1">
                  mdi-cart
                </v-icon>
              </v-btn>
              <span>Programmatic tooltip</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Tooltips',

  data: () => ({
    show: false
  })
}
</script>

<style scoped>
.center {
  align-self: center;
}
</style>
