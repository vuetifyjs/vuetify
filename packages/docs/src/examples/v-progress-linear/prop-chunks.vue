<template>
  <div>
    <v-progress-linear
      v-model="value"
      chunk-width="4"
      color="purple"
      height="15"
      rounded="lg"
      clickable
    ></v-progress-linear>

    <br>

    <v-progress-linear
      v-model="value"
      chunk-gap="2"
      chunk-width="50"
      color="primary"
      height="10"
      clickable
      rounded
    ></v-progress-linear>

    <br>

    <v-progress-linear
      v-model="value"
      bg-color="#888"
      chunk-count="50"
      chunk-gap="3"
      color="green"
      height="25"
      rounded="sm"
      clickable
    ></v-progress-linear>

    <br>

    <v-progress-linear
      v-model="value"
      bg-color="#888"
      chunk-count="15"
      chunk-gap="6"
      color="pink"
      height="25"
      rounded="sm"
      clickable
    ></v-progress-linear>

    <br>

    <div class="d-flex ga-2 align-center">
      <v-progress-linear
        v-model="value"
        chunk-count="5"
        chunk-gap="9"
        color="indigo"
        height="25"
        rounded="sm"
        clickable
      >
        <small class="text-white">{{ value.toFixed() }}%</small>
      </v-progress-linear>
      <v-btn icon="mdi-skip-previous" size="x-small" @click="value = 0"></v-btn>
      <v-btn icon="$complete" size="x-small" @click="value = 100"></v-btn>
    </div>

  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const value = shallowRef(63)
</script>

<script>
  export default {
    data () {
      return {
        value: 63,
      }
    },
  }
</script>
