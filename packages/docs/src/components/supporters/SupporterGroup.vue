<template>
  <v-row
    align="center"
    justify="center"
    class="ma-0"
    dense
  >
    <v-col
      v-if="title"
      class="font-weight-medium grey--text text--darken-3"
      cols="12"
      tag="h4"
      v-text="title"
    />

    <template v-for="(item, i) in group">
      <v-col
        v-if="i % 4 === 0 && group.length > 1"
        :key="`divider-${i}`"
        cols="12"
      />

      <v-col
        :key="i"
        class="d-flex shrink"
      >
        <supporters-sponsor
          :large="$attrs.large"
          :small="$attrs.small"
          :value="item"
          :x-large="$attrs['x-large']"
        />
      </v-col>
    </template>
  </v-row>
</template>

<script>
  export default {
    name: 'SupportersSupporterGroup',

    inheritAttrs: false,

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
