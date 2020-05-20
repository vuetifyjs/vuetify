<template>
  <v-container
    pa-0
    grid-list-xl
    fluid
  >
    <v-layout wrap>
      <v-flex
        v-for="(item, i) in items"
        :key="i"
        xs12
        sm6
        md4
        d-flex
        child-flex
      >
        <categories-item :value="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'
  import kebabCase from 'lodash/kebabCase'

  export default {
    props: {
      value: {
        type: Array,
        default: () => ([]),
      },
    },

    computed: {
      ...mapState('route', ['params']),
      items () {
        return this.value
          ? this.value.map(item => ({
            title: this.$t(`Components.Categories.${item}`),
            text: this.$t(`Components.Categories.${item}Text`),
            to: `/${this.params.lang}/components/categories/${kebabCase(item)}`,
          }))
          : []
      },
    },
  }
</script>
