<template>
  <v-container>
    <v-layout column>
      <main-header>Badges</main-header>

      <core-title>Left</core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-badge left>
            <span slot="badge">
              1
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge left>
            <span slot="badge">
              2
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge left>
            <span slot="badge">
              3
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>
        </v-layout>
      </core-section>

      <core-title>
        Right
      </core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-badge right>
            <span slot="badge">
              1
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge right>
            <span slot="badge">
              2
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge right>
            <span slot="badge">
              3
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>
        </v-layout>
      </core-section>

      <core-title>
        Color
      </core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-badge
            left
            color="red"
          >
            <span slot="badge">
              1
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            left
            color="teal"
          >
            <span slot="badge">
              2
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            left
            color="info darken-2"
          >
            <span slot="badge">
              3
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            right
            color="red"
          >
            <span slot="badge">
              1
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            right
            color="teal"
          >
            <span slot="badge">
              2
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            right
            color="info darken-2"
          >
            <span slot="badge">
              3
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>
        </v-layout>
      </core-section>

      <core-title>
        Overlap
      </core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-badge
            left
            overlap
          >
            <span slot="badge">
              1
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            left
            overlap
          >
            <span slot="badge">
              2
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            left
            overlap
          >
            <span slot="badge">
              3
            </span>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>
        </v-layout>
      </core-section>

      <core-title>
        Visibility control
      </core-title>
      <core-section>
        <v-layout
          flex
          column
          align-center
        >
          <v-flex xs12>
            <v-btn @click="show1 = !show1">
              toggle
            </v-btn>
          </v-flex>

          <v-flex
            xs12
            class="mt-5"
          >
            <v-badge
              :value="show1"
              left
            >
              <span slot="badge">
                1
              </span>
              <v-sheet
                width="32"
                height="32"
                color="grey lighten-1"
              />
            </v-badge>
          </v-flex>

          <v-flex
            xs12
            class="mt-5"
          >
            <v-badge
              :value="show1"
              left
              overlap
            >
              <span slot="badge">
                1
              </span>
              <v-sheet
                width="32"
                height="32"
                color="grey lighten-1"
              />
            </v-badge>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Custom transition
      </core-title>
      <core-section>
        <v-layout
          flex
          column
          align-center
        >
          <v-flex xs12>
            <v-btn @click="show2 = !show2">
              toggle
            </v-btn>
          </v-flex>

          <v-flex
            xs12
            class="mt-5"
          >
            <v-badge
              :value="show2"
              left
              transition="slide-x-reverse-transition"
            >
              <span slot="badge">
                1
              </span>
              <v-sheet
                width="32"
                height="32"
                color="grey lighten-1"
              />
            </v-badge>
          </v-flex>

          <v-flex
            xs12
            class="mt-5"
          >
            <v-badge
              :value="show2"
              left
              transition="slide-x-reverse-transition"
              overlap
            >
              <span slot="badge">
                1
              </span>
              <v-sheet
                width="32"
                height="32"
                color="grey lighten-1"
              />
            </v-badge>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Icons
      </core-title>
      <core-section>
        <v-layout justify-space-around>
          <v-badge
            left
            color="red"
          >
            <v-icon
              slot="badge"
              dark
              small
            >
              mdi-adjust
            </v-icon>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            left
            color="teal"
          >
            <v-icon
              slot="badge"
              dark
              small
            >
              mdi-invert-colors
            </v-icon>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>

          <v-badge
            left
            color="info darken-2"
          >
            <v-icon
              slot="badge"
              dark
              small
            >
              mdi-cloud
            </v-icon>
            <v-sheet
              width="32"
              height="32"
              color="grey lighten-1"
            />
          </v-badge>
        </v-layout>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Badges',

    data: () => ({
      show1: false,
      show2: false
    })
  }
</script>
