<template>
  <v-card>
    <v-toolbar
      color="purple"
      card
      dark
      prominent
      tabs
    >
      <v-text-field
        append-icon="mic"
        class="mx-3"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>

      <v-tabs
        slot="extension"
        v-model="tabs"
        centered
        slider-color="white"
      >
        <v-tab
          v-for="n in 3"
          :key="n"
        >
          Item {{ n }}
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item
        v-for="n in 3"
        :key="n"
      >
        <v-card flat>
          <v-card-text>
            {{ text }}
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        tabs: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
