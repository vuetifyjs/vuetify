<template>
  <div>
    <doc-heading>Generic.Pages.examples</doc-heading>

    <div />

    <template v-for="(example, i) in value">
      <doc-heading :key="`heading-${i}`">
        {{ `${namespace}.${page}.examples.${example}.header` }}
      </doc-heading>

      <doc-text :key="`text-${i}`">
        {{ `${namespace}.${page}.examples.${example}.desc` }}
      </doc-text>

      <doc-example
        :key="i"
        :value="example"
      />
    </template>
  </div>
</template>

<script>

  export default {
    inject: ['namespace', 'page'],

    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    }
  }
</script>
