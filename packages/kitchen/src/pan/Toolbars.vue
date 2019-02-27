<template>
  <v-container>
    <v-layout column>
      <main-header>Toolbars</main-header>

      <core-title>
        Simple usage
      </core-title>
      <core-section>
        <v-toolbar>
          <v-toolbar-side-icon />
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
          <v-toolbar-side-icon />
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
      <core-section class="mt-5">
        <v-toolbar color="success">
          <v-toolbar-side-icon />
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
        App bar with icons
      </core-title>
      <core-section>
        <v-toolbar
          dark
          color="primary"
        >
          <v-toolbar-side-icon />

          <v-toolbar-title class="white--text">
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
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </core-section>

      <core-title>
        App bar with items
      </core-title>
      <core-section>
        <v-toolbar>
          <v-spacer />

          <v-toolbar-items>
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
        App bar with extension
      </core-title>
      <core-section>
        <v-toolbar
          color="primary"
          dark
          extended
        >
          <v-toolbar-side-icon />

          <template #extension>
            <v-toolbar-title
              class="white--text"
            >
              Title
            </v-toolbar-title>
          </template>

          <v-spacer />

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-apps</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
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
            <v-toolbar-side-icon />
          </v-toolbar>

          <v-layout
            row
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
          class="pa-3"
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
          row
          wrap
        >
          <v-flex
            v-for="(bar, i) in bars"
            :key="i"
            xs12
            sm12
            md6
            class="my-3"
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
                <v-toolbar-side-icon />
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
          <v-toolbar-side-icon />

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
          <v-toolbar-side-icon />

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
          <v-toolbar-side-icon />

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
              <v-list-tile
                v-for="item in items"
                :key="item"
              >
                <v-list-tile-title v-text="item" />
              </v-list-tile>
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

      <core-title>
        System / window bar
      </core-title>
      <core-section>
        <div>
          <v-subheader>Light status bar</v-subheader>
          <v-card
            img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg"
            height="200px"
          >
            <v-system-bar
              status
              color="primary"
            >
              <v-spacer />
              <v-icon>mdi-wifi-strength-4</v-icon>
              <v-icon>mdi-signal-off</v-icon>
              <v-icon>mdi-battery</v-icon>
              <span>12:30</span>
            </v-system-bar>
          </v-card>
          <v-subheader>Lights out</v-subheader>
          <v-card
            img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg"
            height="200px"
          >
            <v-system-bar
              status
              color="primary"
              lights-out
            >
              <v-spacer />
              <v-icon>mdi-wifi-strength-4</v-icon>
              <v-icon>mdi-signal-off</v-icon>
              <v-icon>mdi-battery</v-icon>
              <span>12:30</span>
            </v-system-bar>
          </v-card>
          <v-subheader>Dark status bar</v-subheader>
          <v-card
            img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg"
            height="200px"
          >
            <v-system-bar
              status
              color="primary"
              dark
            >
              <v-spacer />
              <v-icon>mdi-wifi-strength-4</v-icon>
              <v-icon>mdi-signal-off</v-icon>
              <v-icon>mdi-battery</v-icon>
              <span>12:30</span>
            </v-system-bar>
          </v-card>
          <v-subheader>Lights out</v-subheader>
          <v-card
            img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg"
            height="200px"
          >
            <v-system-bar
              status
              color="primary"
              lights-out
              dark
            >
              <v-spacer />
              <v-icon>mdi-wifi-strength-4</v-icon>
              <v-icon>mdi-signal-off</v-icon>
              <v-icon>mdi-battery</v-icon>
              <span>12:30</span>
            </v-system-bar>
          </v-card>
          <v-divider class="my-5" />
          <v-subheader>Window bar</v-subheader>
          <v-system-bar
            window
            dark
          >
            <v-spacer />
            <v-icon>mdi-minus</v-icon>
            <v-icon>mdi-checkbox-blank-outline</v-icon>
            <v-icon>mdi-close</v-icon>
          </v-system-bar>
        </div>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Toolbars',

    data: () => ({
      bars: [
        { 'class': '' },
        { 'class': '', dark: true },
        { 'class': 'primary', dark: true },
        { 'class': 'elevation-0' }
      ],
      items: [
        'All', 'Family', 'Friends', 'Coworkers'
      ]
    })
  }
</script>

<style scoped>
.card--flex-toolbar {
  margin-top: -64px;
}
</style>
