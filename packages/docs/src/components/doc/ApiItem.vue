<template>
  <v-layout wrap class="api-item grey lighten-2 mb-2">
    <v-flex xs3>
      <span class="mono name" v-text="item.name" />
    </v-flex>
    <v-flex xs2>
        <span class="mono type" :class="[item.example && 'example']" v-text="item.type" @click="expanded = !expanded" />
    </v-flex>
    <v-flex xs5>
      <doc-markdown
          class="pl-3"
          :code="item.description"
        />
    </v-flex>
    <v-flex xs2>
      <doc-inline-markup
          v-if="item.name !== 'custom-sort' && item.default !== 'undefined'"
          class="text-xs-right"
          lang="ts"
          :code="item.type === 'string' ? `'${item.default}'` : item.default"
        />

    </v-flex>
    <!-- <v-flex xs12 class="d-flex">
      <div>
        <span class="mono name" v-text="item.name" /><span class="mono">:&nbsp;</span><span class="mono type" :class="[item.example && 'example']" v-text="item.type" @click="expanded = !expanded" />
      </div>
      <doc-inline-markup
          v-if="item.name !== 'custom-sort' && item.default !== 'undefined'"
          class="text-xs-right"
          lang="ts"
          :code="item.default"
        />
    </v-flex>
    <v-flex xs12 class="grey lighten-4">
      <doc-markdown
          class="pl-3"
          :code="item.description"
        />
    </v-flex>
    <v-flex
      v-if="expanded"
      xs12
      class="grey lighten-4"
    >
      <doc-markup
        class="mb-0 example"
        lang="ts"
        :filename="false"
        hide-copy
      >{{ item.example }}</doc-markup>
    </v-flex> -->


    <!-- <v-flex
      v-for="(header, i) in headers"
      :key="header.value"
      :class="header.class"
    >
      <div
        v-if="!header.hideTitle"
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
    </v-flex> -->
  </v-layout>
</template>

<script>
  export default {
    props: {
      headers: Array,
      item: Object,
    },
    data: () => ({
      expanded: false,
    })
  }
</script>

<style lang="sass">
.mono.type
  cursor: pointer

  &.example
    color: red

  &:hover
    text-decoration: underline

.api-item
  border-radius: 6px
  overflow: hidden

  > .flex
    padding: 0.4rem

.example v-markup pre
  padding: 0.25rem
</style>
