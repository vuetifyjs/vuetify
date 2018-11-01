<template functional>
  <v-headline>
    <v-layout align-center>
      <core-goto
        v-if="props.goto"
        :href="props.goto"
      />
      <core-markdown tag="h4"><slot /></core-markdown>
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
