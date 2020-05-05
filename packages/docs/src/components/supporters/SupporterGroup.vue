<template>
  <v-row
    :align="$attrs.align || 'center'"
    :justify="$attrs['justify'] || 'center'"
    class="ma-0 supporter-group"
    dense
    v-bind="$attrs"
  >
    <v-col
      v-if="title"
      :class="$vuetify.theme.dark ? undefined : 'grey--text text--darken-3'"
      class="body-1 supporter-group__title"
      cols="12"
      tag="h4"
      v-text="title"
    />

    <template v-for="(item, i) in items">
      <v-col
        v-if="i % 4 === 0 && items.length > 1"
        :key="`divider-${i}`"
        class="pa-0"
        cols="12"
      />

      <v-col
        :key="i"
        class="d-flex shrink justify-center"
        cols="6"
        sm="auto"
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
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'SupportersSupporterGroup',

    inheritAttrs: false,

    props: {
      group: Number,
      title: {
        type: String,
        default: '',
      },
    },

    computed: {
      supporters: get('app/supporters'),
      items () {
        return this.supporters.filter(supporter => supporter.metadata.tier === this.group)
      },
    },
  }
</script>
