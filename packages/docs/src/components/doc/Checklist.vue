<template>
  <v-list class="checklist">
    <v-list-item v-for="(item, index) in items" :key="index">
      <v-list-item-content>
        <v-list-item-title>
          <doc-markdown :code="item" />
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon color="success">check</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
  // Utilities
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Checklist',

    props: {
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page'
      ]),
      items () {
        return this.$t(
          `${this.namespace}.${this.page}.${this.value}`
        )
      }
    }
  }
</script>

<style lang="sass">
.checklist
  max-width: 600px

  > :nth-child(odd)
    background: #eee
</style>
