<template>
  <div>
    <v-row

      justify="space-around"
    >
      <v-switch
        v-model="icons"
        class="mx-2"
        label="Text + icons"
      ></v-switch>
      <v-switch
        v-model="centered"
        class="mx-2"
        label="Centered"
        :disabled="vertical"
      ></v-switch>
      <v-switch
        v-model="grow"
        class="mx-2"
        label="Grow"
      ></v-switch>
      <v-switch
        v-model="vertical"
        class="mx-2"
        label="Vertical"
      ></v-switch>
      <v-switch
        v-model="right"
        class="mx-2"
        label="Right"
      ></v-switch>
      <v-col cols="12">
        <v-slider
          v-model="tabs"
          min="0"
          max="10"
          label="Tabs number"
        ></v-slider>
      </v-col>
    </v-row>

    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      class="elevation-2"
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

      <v-tab
        v-for="i in tabs"
        :key="i"
        :href="`#tab-${i}`"
      >
        Tab {{ i }}
        <v-icon v-if="icons">mdi-phone</v-icon>
      </v-tab>

      <v-tab-item
        v-for="i in tabs"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card
          flat
          tile
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        icons: false,
        centered: false,
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
