<template>
  <div class="py-6 grow">
    <v-slider
      v-model="count"
      hide-details
      min="7000"
      max="15000"
    ></v-slider>
    <div class="text-center font-weight-bold">
      {{ items.length }} Total Items
    </div>

    <v-card outlined>
      <v-virtual-scroll
        :items="items"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template v-slot="{ item }">
          <div class="px-2">
            I'm item number {{ item }}
          </div>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      count: 10000,
      defaults: {
        height: 100,
        'item-height': 20,
      },
      options: {
        sliders: {
          height: [100, 175],
          'item-height': [20, 50],
        },
      },
      tabs: [],
    }),

    computed: {
      items () {
        return Array.from({ length: this.count }, (k, v) => v + 1)
      },
    },
  }
</script>
