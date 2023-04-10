<template>
  <v-virtual-scroll
    :items="items"
    height="400"
  >
    <template v-slot:default="{ item, index }">
      <div
        :class="[
          index % 2 === 0 ? 'py-2' : index % 5 == 0 ? 'py-8' : 'py-4',
          index % 2 === 0 ? 'bg-grey-lighten-2' : index % 5 === 0 ? 'bg-grey-darken-2' : '',
          'px-2'
        ]"
      >
        Dynamic item {{ item }}
      </div>
    </template>
  </v-virtual-scroll>
</template>

<script>
  export default {
    computed: {
      items () {
        return Array.from({ length: 1000 }, (k, v) => v + 1)
      },
    },
  }
</script>
