<template>
  <div>
    <v-video
      :key="resetToPoster"
      :image="posterUrl"
      class="mx-auto mb-3"
      src="https://jsek.work/vt-sunflowers.mp4"
      muted
      @loaded="loaded = true"
    ></v-video>

    <div class="d-flex justify-center ga-3">
      <v-btn text="randomize image" @click="randomizePoster"></v-btn>
      <v-btn text="restore original" @click="posterId = null"></v-btn>
      <v-btn
        :disabled="!loaded"
        prepend-icon="mdi-refresh"
        text="reset"
        @click="resetToPoster++; loaded = false"
      ></v-btn>
    </div>
  </div>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const loaded = shallowRef(false)
  const resetToPoster = shallowRef(0)

  const posterId = shallowRef()
  function randomizePoster () {
    posterId.value = 1 + Math.ceil(Math.random() * 100)
  }

  const posterUrl = toRef(() => {
    return posterId.value
      ? `https://picsum.photos/500/300?image=${posterId.value}`
      : 'https://jsek.work/vt-sunflowers.jpg'
  })
</script>

<script>
  export default {
    data: () => ({
      loaded: false,
      resetToPoster: 0,
      posterId: null,
    }),
    computed: {
      posterUrl () {
        return this.posterId
          ? `https://picsum.photos/500/300?image=${this.posterId}`
          : 'https://jsek.work/vt-sunflowers.jpg'
      },
    },
    methods: {
      randomizePoster () {
        this.posterId = 1 + Math.ceil(Math.random() * 100)
      },
    },
  }
</script>
