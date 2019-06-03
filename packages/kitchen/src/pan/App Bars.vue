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
          <v-app-bar-nav-icon />

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
        Dense
      </core-title>
      <core-section>
        <v-app-bar
          dark
          dense
          color="primary"
        >
          <v-app-bar-nav-icon />

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
            <v-btn text>
              Link One
            </v-btn>
            <v-btn text>
              Link Two
            </v-btn>
            <v-btn text>
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
          <v-app-bar-nav-icon />

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
          <v-app-bar-nav-icon />

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

          <v-app-bar-nav-icon />

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
          <v-app-bar-nav-icon />

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
          id="scroll-1"
          class="scroll-y"
          max-height="100"
        >
          <v-container style="height: 1500px;" />
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

          <v-app-bar-nav-icon />

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
          id="scroll-2"
          class="scroll-y"
          max-height="100"
        >
          <v-container style="height: 1500px;" />
        </v-sheet>
      </core-section>

      <core-title>
        Shrink on scroll
      </core-title>
      <core-section>
        <v-app-bar
          color="primary"
          dark
          src="https://picsum.photos/1920/1080?random"
          shrink-on-scroll
          scroll-target="#scroll-3"
          scroll-threshold="500"
          extended
        >
          <template #img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" />
          </template>

          <v-app-bar-nav-icon />

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
          id="scroll-3"
          class="scroll-y"
          max-height="100"
        >
          <v-container style="height: 1500px;" />
        </v-sheet>
      </core-section>

      <core-title>
        Collapsing on scroll
      </core-title>
      <core-section>
        <v-app-bar
          color="primary"
          dark
          src="https://picsum.photos/1920/1080?random"
          collapse-on-scroll
          scroll-target="#scroll-4"
          scroll-threshold="500"
        >
          <template #img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)" />
          </template>

          <v-toolbar-title
            class="white--text"
          >
            Title
          </v-toolbar-title>

          <v-app-bar-nav-icon />

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
          id="scroll-4"
          class="scroll-y"
          max-height="100"
        >
          <v-container style="height: 1500px;" />
        </v-sheet>
      </core-section>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'AppBars',

    data: () => ({}),
  }
</script>
