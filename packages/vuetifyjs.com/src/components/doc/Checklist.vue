<template>
  <v-list class="checklist">
    <v-list-tile v-for="(item, index) in items" :key="index">
      <v-list-tile-content>
        <v-list-tile-title>
          <doc-markdown :code="item" />
        </v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-icon color="success">check</v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'Checklist',

    inject: {
      namespace: {
        default: undefined
      },
      page: {
        default: undefined
      }
    },

    props: {
      value: {
        type: String,
        default: ''
      }
    },

    computed: {
      items () {
        return this.$t(
          `${this.namespace}.${this.page}.${this.value}`
        )
      }
    }
  }
</script>

<style lang="stylus">
  .checklist
    max-width: 600px

    > :nth-child(odd)
      background: #eee
</style>
