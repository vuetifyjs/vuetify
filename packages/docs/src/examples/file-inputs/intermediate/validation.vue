<template>
  <v-file-input :rules="rules" label="File input"></v-file-input>
</template>

<script>
export default {
  data: () => ({
    rules: [
      value => value[0].size < 2000000
    ]
  })
}
</script>
