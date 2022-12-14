<template>
  <v-virtual-scroll
    :items="items"
    height="400"
    item-key="id"
  >
    <template v-slot:default="{ item, index }">
      <div
        :class="[
          index % 2 === 0 ? 'py-2' : index % 5 == 0 ? 'py-8' : 'py-4',
          index % 2 === 0 ? 'bg-grey-lighten-2' : index % 5 === 0 ? 'bg-grey-darken-2' : '',
          'px-2'
        ]"
      >
        {{ item.title }}
      </div>
    </template>
  </v-virtual-scroll>
</template>

<script>
  export default {
    computed: {
      items () {
        return Array.from({ length: 10000 }, (k, v) => ({
          id: v + 1,
          title: `Dynamic item ${v + 1}`,
        }))
      },
    },
  }
</script>
