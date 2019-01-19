<template>
  <div class="text-xs-center">
    <div class="text-xs-center">
      <v-btn
        v-if="!chip1 && !chip2 && !chip3 && !chip4"
        color="primary"
        dark
        @click="chip1 = true, chip2 = true, chip3 = true, chip4= true"
      >
        Reset Chips
      </v-btn>
    </div>

    <v-chip
      v-model="chip1"
      close
    >Closable</v-chip>

    <v-chip
      v-model="chip2"
      close
      color="red"
      text-color="white"
    >Remove</v-chip>

    <v-chip
      v-model="chip3"
      close
      color="green"
      outline
    >Success</v-chip>

    <v-chip
      v-model="chip4"
      close
      color="orange"
      label
      outline
    >Complete</v-chip>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        chip1: true,
        chip2: true,
        chip3: true,
        chip4: true
      }
    }
  }
</script>
