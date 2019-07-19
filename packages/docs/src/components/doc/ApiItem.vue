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
        v-if="!['example', 'props'].includes(header.value) || item.example || item.props"
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
        style="height: auto;"
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
        v-else-if="header.value === 'description' && item.description"
        :code="item.description"
      />

      <!-- Signature -->
      <doc-markup
        v-else-if="header.value === 'signature' && item.signature"
        :filename="false"
        lang="ts"
        value="example"
      >{{ item.signature }}</doc-markup>

      <!-- Example -->
      <doc-markup
        v-else-if="header.value === 'example' && item.example"
        :filename="false"
        lang="ts"
        value="example"
      >{{ item.example }}</doc-markup>

      <!-- Props -->
      <doc-markup
        v-else-if="header.value === 'props' && item.props"
        :filename="false"
        lang="ts"
        value="example"
      >{{ item.props }}</doc-markup>

      <!-- Value -->
      <doc-markup
        v-else-if="header.value === 'value' && item.value"
        :filename="false"
        lang="ts"
        value="example"
      >{{ item.value }}</doc-markup>
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
