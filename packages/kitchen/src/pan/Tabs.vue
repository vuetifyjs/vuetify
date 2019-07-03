<template>
  <v-container>
    <v-layout column>
      <main-header>Tabs</main-header>

      <core-title>Simple</core-title>
      <core-section>
        <v-tabs
          v-model="active1"
        >
          <v-tab
            v-for="n in 3"
            :key="n"
            ripple
          >
            Item {{ n }}

          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </core-section>

      <core-title>Colors & slider colors</core-title>
      <core-section>
        <v-tabs
          v-model="active2"
          background-color="cyan"
          dark
          slider-color="yellow"
        >
          <v-tab
            v-for="n in 3"
            :key="n"
            ripple
          >
            Item {{ n }}

          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <v-tabs
          v-model="active3"
          background-color="success"
          dark
          slider-color="error"
        >
          <v-tab
            v-for="n in 3"
            :key="n"
            ripple
          >
            Item {{ n }}

          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <v-tabs
          v-model="active4"
          background-color="cyan lighten-2"
          dark
          slider-color="orange"
        >
          <v-tab
            v-for="n in 3"
            :key="n"
            ripple
          >
            Item {{ n }}

          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </core-section>

      <core-title>Programmatic control</core-title>
      <core-section>
        <v-tabs
          v-model="active5"
        >
          <v-tab
            v-for="n in 3"
            :key="n"
            ripple
          >
            Item {{ n }}

          </v-tab>
          <v-tab-item
            v-for="n in 3"
            :key="n"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>

        <div class="text-xs-center mt-3">
          <v-btn @click="next">next tab</v-btn>
        </div>
      </core-section>

      <core-title>Fixed</core-title>
      <core-section>
        <v-tabs fixed-tabs>
          <v-tab
            v-for="n in 3"
            :key="n"
          >
            Item {{ n }}
          </v-tab>
        </v-tabs>
      </core-section>

      <core-title>Right aligned</core-title>
      <core-section>
        <v-tabs right>
          <v-tab>
            <v-icon>mdi-face</v-icon>
            Profile
          </v-tab>
        </v-tabs>
      </core-section>

      <core-title>Centered active tab</core-title>
      <core-section>
        <v-tabs center-active>
          <v-tab
            v-for="i in 30"
            :key="i"
          >Item {{ i }}</v-tab>
        </v-tabs>
      </core-section>

      <core-title>Icons and text</core-title>
      <core-section>
        <v-tabs
          centered
          background-color="cyan"
          dark
          icons-and-text
        >
          <v-tabs-slider color="yellow" />

          <v-tab href="#tab-1">
            Recents
            <v-icon>mdi-phone</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Favorites
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Nearby
            <v-icon>mdi-account-box</v-icon>
          </v-tab>

          <v-tab-item
            v-for="i in 3"
            :key="i"
            :value="'tab-' + i"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </core-section>

      <core-title>Grow</core-title>
      <core-section>
        <v-tabs
          centered
          background-color="cyan"
          dark
          icons-and-text
          grow
        >
          <v-tabs-slider color="yellow" />

          <v-tab href="#tab-1">
            Recents
            <v-icon>mdi-phone</v-icon>
          </v-tab>

          <v-tab href="#tab-2">
            Favorites
            <v-icon>mdi-heart</v-icon>
          </v-tab>

          <v-tab href="#tab-3">
            Nearby
            <v-icon>mdi-account-box</v-icon>
          </v-tab>

          <v-tab-item
            v-for="i in 3"
            :key="i"
            :value="'tab-' + i"
          >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </core-section>

      <core-title>Pagination</core-title>
      <core-section>
        <v-tabs
          dark
          background-color="cyan"
          show-arrows
        >
          <v-tabs-slider color="yellow" />

          <v-tab
            v-for="i in 30"
            :key="i"
            :href="'#tab-' + i"
          >
            Item {{ i }}
          </v-tab>

          <v-tabs-items>
            <v-tab-item
              v-for="i in 30"
              :key="i"
              :value="'tab-' + i"
            >
              <v-card flat>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </core-section>

      <core-title>Custom icons</core-title>
      <core-section>
        <v-tabs
          background-color="cyan"
          dark
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tabs-slider color="yellow" />
          <v-tab
            v-for="i in 30"
            :key="i"
            :href="'#tab-' + i"
          >
            Item {{ i }}
          </v-tab>

          <v-tabs-items>
            <v-tab-item
              v-for="i in 30"
              :key="i"
              :value="'tab-' + i"
            >
              <v-card flat>
                <v-card-text>{{ text }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Tabs',

    data: () => ({
      active1: null,
      active2: null,
      active3: null,
      active4: null,
      active5: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),

    methods: {
      next () {
        const active = parseInt(this.active5)
        this.active5 = (active < 2 ? active + 1 : 0)
      },
    },
  }
</script>
