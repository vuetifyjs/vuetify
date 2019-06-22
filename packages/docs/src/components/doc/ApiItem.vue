<template>
  <v-layout wrap class="api-item grey lighten-2 mb-2">
    <v-flex
      v-for="(header, i) in headers"
      :key="header.value"
      :class="header.class"
    >
      <div
        class="header grey--text text--darken-2"
        v-text="$t(`Generic.Pages.${header.value}`)"
      />
      <div :class="header.value">
        <doc-inline-markup
          v-if="header.type === 'inline-markup'"
          lang="ts"
          :code="item[header.value]"
        />
        <doc-markup
          v-else-if="header.type === 'markup'"
          lang="ts"
          :filename="false"
          hide-copy
        >{{ item[header.value] }}</doc-markup>
        <doc-markdown
          v-else-if="header.type === 'markdown'"
          :code="item[header.value]"
        />
        <span v-else class="mono" v-text="item[header.value]" />
        <template v-if="i === 0">
          <v-chip
            v-if="item.newIn"
            x-small
            label
            text-color="white"
            color="primary"
          >
            New in — v{{ item.newIn }}
          </v-chip>
          <v-chip
            v-else-if="item.deprecatedIn"
            x-small
            label
            color="red lighten-3"
          >
            Deprecated in — v{{ item.deprecatedIn }}
          </v-chip>
        </template>
      </div>
    </v-flex>
    <v-flex v-if="item.example" xs12>
      <doc-markup
        class="mb-0"
        lang="ts"
        :filename="false"
        hide-copy
      >{{ item.example }}</doc-markup>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: {
      headers: Array,
      item: Object,
    },
  }
</script>

<style lang="sass">
.api-item
  border-radius: 6px
  overflow: hidden

  > .flex
    padding: 0.4rem
</style>
