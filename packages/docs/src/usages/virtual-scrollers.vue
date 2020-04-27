<template>
  <div class="py-6 grow">
    <div class="text-center font-weight-bold">{{ items.length }} Total Items</div>

    <v-card outlined>
      <v-virtual-scroll
        :height="attrs.height"
        :items="items"
        item-height="25"
      >
        <template v-slot="{ item }">
          <div class="pa-4">
            I'm item number {{ item }}
          </div>
        </template>
      </v-virtual-scroll>
    </v-card>
  </div>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],

    inheritAttrs: false,

    computed: {
      items () {
        return Array.from({ length: this.length }, (k, v) => v + 1)
      },
      length () {
        return this.attrs.count
      },
    },
  }
</script>
