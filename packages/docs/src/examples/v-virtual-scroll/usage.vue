<template>
  <usage-example
    model-value=""
    :options="options"
    name="v-virtual-scroll"
  >
    <v-defaults-provider
      :defaults="{
        VAlert: {
          border: model === 'border',
          variant: model === 'elevated' ? 'elevated' : undefined,
        }
      }"
    >
      <v-virtual-scroll
        height="400"
        :items="items"
        item-height="32"
      >
        <template v-slot:default="{ item, index }">
          <div :class="['pa-1', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
            Item number #{{ item }}
          </div>
        </template>
      </v-virtual-scroll>
    </v-defaults-provider>
  </usage-example>
</template>

<script>
  export default {
    name: 'VVirtualScrollerUsageExample',

    data: () => ({
      count: 10000,
      options: [],
    }),
    computed: {
      items () {
        return Array.from({ length: this.count }, (k, v) => v + 1)
      },
    },
  }
</script>
