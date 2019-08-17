<template>
  <v-container>
    <v-layout column>
      <main-header>Toolbars</main-header>

      <core-title>
        Simple usage
      </core-title>
      <core-section>
        <v-toolbar>
          <v-app-bar-nav-icon />
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>
              Link One
            </v-btn>
            <v-btn flat>
              Link Two
            </v-btn>
            <v-btn flat>
              Link Three
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </core-section>

      <core-title>
        Colors
      </core-title>
      <core-section>
        <v-toolbar color="primary lighten-2">
          <v-app-bar-nav-icon />
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>
              Link One
            </v-btn>
            <v-btn flat>
              Link Two
            </v-btn>
            <v-btn flat>
              Link Three
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </core-section>
      <core-section class="mt-12">
        <v-toolbar color="success">
          <v-app-bar-nav-icon />
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>
              Link One
            </v-btn>
            <v-btn flat>
              Link Two
            </v-btn>
            <v-btn flat>
              Link Three
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </core-section>

      <core-title>
        Using with cards
      </core-title>
      <core-section>
        <v-card flat>
          <v-toolbar
            color="primary"
            dark
            extended
            flat
          >
            <v-app-bar-nav-icon />
          </v-toolbar>

          <v-layout
            pb-2
          >
            <v-flex
              xs8
              offset-xs2
            >
              <v-card class="card--flex-toolbar">
                <v-toolbar
                  card
                  prominent
                >
                  <v-toolbar-title class="body-2 grey--text">
                    Title
                  </v-toolbar-title>

                  <v-spacer />

                  <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-apps</v-icon>
                  </v-btn>

                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>

                <v-divider />

                <v-card-text style="height: 200px;" />
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </core-section>

      <core-title>
        Floating
      </core-title>
      <core-section>
        <v-card
          class="pa-4"
          flat
          height="300px"
          img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
        >
          <v-toolbar
            dense
            floating
          >
            <v-text-field
              hide-details
              prepend-icon="mdi-magnify"
              single-line
            />

            <v-btn icon>
              <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </core-section>

      <core-title>
        Themes
      </core-title>
      <core-section>
        <v-layout
          wrap
        >
          <v-flex
            v-for="(bar, i) in bars"
            :key="i"
            xs12
            sm12
            md6
            class="my-4"
          >
            <v-card
              color="grey lighten-4"
              flat
              height="200px"
            >
              <v-toolbar
                :color="bar.class"
                :dark="bar.dark"
              >
                <v-app-bar-nav-icon />
                <v-toolbar-title>Title</v-toolbar-title>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
            </v-card>
          </v-flex>
        </v-layout>
      </core-section>

      <core-title>
        Prominent
      </core-title>
      <core-section>
        <v-toolbar
          prominent
          extended
        >
          <v-app-bar-nav-icon />

          <v-toolbar-title>Title</v-toolbar-title>

          <v-spacer />

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </core-section>

      <core-title>
        Dense (48px)
      </core-title>
      <core-section>
        <v-toolbar dense>
          <v-app-bar-nav-icon />

          <v-toolbar-title>Title</v-toolbar-title>

          <v-spacer />

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </core-section>

      <core-title>
        With menu
      </core-title>
      <core-section>
        <v-toolbar
          color="grey darken-1"
          dark
        >
          <v-app-bar-nav-icon />

          <v-menu :nudge-width="100">
            <template #activator>
              <v-toolbar-title>
                <span>All</span>
                <v-icon dark>
                  mdi-chevron-down
                </v-icon>
              </v-toolbar-title>
            </template>

            <v-list>
              <v-list-item
                v-for="item in items"
                :key="item"
              >
                <v-list-item-title v-text="item" />
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer />

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Toolbars',

    data: () => ({
      bars: [
        { class: '' },
        { class: '', dark: true },
        { class: 'primary', dark: true },
        { class: 'elevation-0' },
      ],
      items: [
        'All', 'Family', 'Friends', 'Coworkers',
      ],
    }),
  }
</script>

<style scoped>
.card--flex-toolbar {
  margin-top: -64px;
}
</style>
