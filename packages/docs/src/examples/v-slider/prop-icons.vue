<template>
  <div>
    <div class="text-caption">Media volume</div>

    <v-slider
      v-model="media"
      prepend-icon="mdi-volume-high"
    ></v-slider>

    <div class="text-caption">Alarm volume</div>

    <v-slider
      v-model="alarm"
      append-icon="mdi-alarm"
    ></v-slider>

    <div class="text-caption">Icon click callback</div>

    <v-slider
      v-model="zoom"
      append-icon="mdi-magnify-plus-outline"
      prepend-icon="mdi-magnify-minus-outline"
      @click:append="zoomIn"
      @click:prepend="zoomOut"
    ></v-slider>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const media = ref(0)
  const alarm = ref(0)
  const zoom = ref(0)

  function zoomOut () {
    zoom.value = (zoom.value - 10) || 0
  }
  function zoomIn () {
    zoom.value = (zoom.value + 10) || 100
  }
</script>

<script>
  export default {
    data () {
      return {
        media: 0,
        alarm: 0,
        zoom: 0,
      }
    },

    methods: {
      zoomOut () {
        this.zoom = (this.zoom - 10) || 0
      },
      zoomIn () {
        this.zoom = (this.zoom + 10) || 100
      },
    },
  }
</script>
