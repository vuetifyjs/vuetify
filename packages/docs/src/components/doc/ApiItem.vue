<template>
  <v-layout
    class="api-item pa-2"
    wrap
  >
    <v-flex
      v-for="header in headers"
      :key="header.name"
      :class="header.class"
    >
      <!-- Header -->
      <div
        v-if="header.value !== 'example' || item.example"
        class="text-capitalize overline grey--text text--darken-3"
        v-text="header.value"
      />

      <!-- Name -->
      <v-chip
        v-if="header.value === 'name'"
        class="caption"
        color="primary"
        label
        x-small
      >{{ item.name }}</v-chip>

      <!-- Type -->
      <span
        v-else-if="header.value === 'type'"
        class="mono type"
        v-text="item.type"
      />

      <template v-if="header.value === 'default'">
        <span
          v-if="typeof item.default === 'string'"
          class="mono"
          v-text="item.default"
        />
      </template>

      <!-- Description -->
      <doc-markdown
        v-else-if="header.value === 'description'"
        :code="item.description"
      />

      <doc-markup
        v-if="header.value === 'example' && item.example"
        :filename="false"
        lang="ts"
        value="example"
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
    data: () => ({
      expanded: false,
    }),
  }
</script>

<style lang="sass">
.api-item
  overflow: hidden

  .mono
    // color: #d63200

    // &.example

    // &:hover
    //   text-decoration: underline

    > .flex
      padding: 0.4rem

  .example v-markup pre
    padding: 0.25rem
</style>
