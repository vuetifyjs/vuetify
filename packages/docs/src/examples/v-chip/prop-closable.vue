<template>
  <div class="text-center">
    <v-chip
      v-if="chip"
      class="ma-2"
      closable
      @click:close="chip = false"
    >
      Closable
    </v-chip>

    <v-btn
      v-if="!chip"
      close
      color="primary"
      dark
      @click="chip = true"
    >
      Reset Chip
    </v-btn>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chip: true,
      }
    },
  }
</script>
