<template>
  <div class="text-xs-center">
    <div class="text-xs-center">
      <v-btn
        v-on:click.native="chip1 = true, chip2 = true, chip3 = true, chip4= true"
        v-if="!chip1 && !chip2 && !chip3 && !chip4"
        class="primary white--text"
      >
        Reset Chips
      </v-btn>
    </div>
    <v-chip close v-model="chip1">Closable</v-chip>

    <v-chip close v-model="chip2" class="red white--text">Remove</v-chip>

    <v-chip close v-model="chip3" outline class="green green--text">Success</v-chip>

    <v-chip close v-model="chip4" outline label class="orange orange--text">Complete</v-chip>
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