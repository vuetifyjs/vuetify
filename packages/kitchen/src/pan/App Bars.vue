<template>
  <v-container>
    <v-layout column>

      <core-title>
        With icons
      </core-title>
      <core-section>
        <v-app-bar
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
        </v-app-bar>
      </core-section>

      <core-title>
        With items
      </core-title>
      <core-section>
        <v-app-bar>
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
        </v-app-bar>
      </core-section>

      <core-title>
        With extension
      </core-title>
      <core-section>
        <v-app-bar
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
        </v-app-bar>
      </core-section>

      <core-title>
        With extension and background image
      </core-title>
      <core-section>
        <v-app-bar
          color="primary"
          dark
          extended
          src="https://picsum.photos/1920/1080?random"
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
        </v-app-bar>
      </core-section>

      <core-title>
        With extension and background image scoped slot
      </core-title>
      <core-section>
        <v-app-bar
          color="primary"
          dark
          extended
          src="https://picsum.photos/1920/1080?random"
        >
          <template #img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" />
          </template>

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
        </v-app-bar>
      </core-section>

      <core-title>
        With extension and fading background image
      </core-title>
      <core-section>
        <v-app-bar
          color="primary"
          dark
          extended
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scroll-1"
          scroll-threshold="500"
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
        </v-app-bar>

        <v-sheet
          class="scroll-y"
          max-height="100"
          id="scroll-1"
        >
          <v-container style="height: 1500px;"></v-container>
        </v-sheet>
      </core-section>

      <core-title>
        With extension and fading background image scoped slot
      </core-title>
      <core-section>
        <v-app-bar
          color="primary"
          dark
          extended
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scroll-2"
          scroll-threshold="500"
        >
          <template #img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" />
          </template>

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
        </v-app-bar>

        <v-sheet
          class="scroll-y"
          max-height="100"
          id="scroll-2"
        >
          <v-container style="height: 1500px;"></v-container>
        </v-sheet>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'AppBars',

    data: () => ({})
  }
</script>
