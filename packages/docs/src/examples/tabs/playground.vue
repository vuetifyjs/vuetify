<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="icons" class="mx-2" label="Text + icons"></v-switch>
      <v-switch v-model="centered" class="mx-2" label="Centered"></v-switch>
      <v-switch v-model="grow" class="mx-2" label="Grow"></v-switch>
      <v-switch v-model="vertical" class="mx-2" label="Vertical"></v-switch>
      <v-switch v-model="prevIcon" class="mx-2" label="Custom prev-icon"></v-switch>
      <v-switch v-model="nextIcon" class="mx-2" label="Custom next-icon"></v-switch>
      <v-switch v-model="right" class="mx-2" label="Right"></v-switch>
      <v-flex xs12>
        <v-slider v-model="tabs" min="0" max="10" label="Tabs number"></v-slider>
      </v-flex>
    </v-layout>

    <v-card>
      <v-tabs
        v-model="tab"
        background-color="deep-purple accent-4"
        dark
        :centered="centered"
        :grow="grow"
        :vertical="vertical"
        :right="right"
        :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
        :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
        :icons-and-text="icons"
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`">
          Tab {{ i }}
          <v-icon v-if="icons">phone</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="i in tabs"
          :key="i"
          :value="'tab-' + i"
        >
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: true,
        centered: true,
        grow: false,
        vertical: false,
        prevIcon: false,
        nextIcon: false,
        right: false,
        tabs: 3,
      }
    },
  }
</script>
