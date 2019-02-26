<template>
  <v-container>
    <v-layout column>
      <main-header>Tooltips</main-header>

      <core-title>
        Simple
      </core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-tooltip left>
            <template
              slot="activator"
            >
              <v-btn
                color="primary"
                dark
              >
                Left
              </v-btn>
            </template>
            <span>Left tooltip</span>
          </v-tooltip>

          <v-tooltip top>
            <template
              slot="activator"
            >
              <v-btn
                color="primary"
                dark
              >
                Top
              </v-btn>
            </template>
            <span>Top tooltip</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template
              slot="activator"
            >
              <v-btn
                color="primary"
                dark
              >
                Bottom
              </v-btn>
            </template>
            <span>Bottom tooltip</span>
          </v-tooltip>

          <v-tooltip right>
            <template
              slot="activator"
            >
              <v-btn
                color="primary"
                dark
              >
                Right
              </v-btn>
            </template>
            <span>Right tooltip</span>
          </v-tooltip>
        </v-layout>
      </core-section>

      <core-title>
        Programmatic visibility control
      </core-title>
      <core-section>
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
              <template
                slot="activator"
              >
                <v-btn
                  icon
                >
                  <v-icon color="grey lighten-1">
                    mdi-cart
                  </v-icon>
                </v-btn>
              </template>
              <span>Programmatic tooltip</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </core-section>
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
