<template>
  <v-layout
    align-center
    justify-center
    wrap
  >
    <v-flex
      v-if="title"
      font-weight-medium
      grey--text
      text--darken-3
      tag="h4"
      xs12
      v-text="title"
    />

    <template v-for="(item, i) in group">
      <v-flex
        v-if="i % 4 === 0"
        :key="`divider-${i}`"
        xs12
      />

      <v-flex
        :key="i"
        d-flex
        shrink
      >
        <patron
          :value="item"
          :large="$attrs.large"
          :small="$attrs.small"
        />
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
  export default {
    components: {
      Patron: () => import('@/components/supporters/Patron'),
    },

    props: {
      group: {
        type: Array,
        default: () => ([]),
      },
      title: {
        type: String,
        default: '',
      },
    },
  }
</script>
