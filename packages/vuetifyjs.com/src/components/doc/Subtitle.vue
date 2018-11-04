<template functional>
  <v-headline>
    <v-layout align-center>
      <core-goto
        v-if="props.goto"
        :href="props.goto"
      />
      <doc-markdown tag="h4"><slot /></doc-markdown>
    </v-layout>
  </v-headline>
</template>

<script>
  export default {
    props: {
      goto: {
        type: String,
        default: ''
      }
    }
  }
</script>
