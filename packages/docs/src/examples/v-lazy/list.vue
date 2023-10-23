<template>
  <h4 class="ma-2">
    {{ mountedElements }} out of {{ apiTracks.length }} elements created
  </h4>
  <v-list id="container" class="py-0" @scroll="onScroll">
    <v-lazy v-for="(track, index) in apiTracks" :key="track.name" min-height="50">
      <v-list-item ref="trackElements">
        <template v-slot:prepend>
          <p class="mr-4">{{ index + 1 }}</p>
        </template>
        <v-list-item-title>{{ track.name }}</v-list-item-title>
        {{ track.artist }}
      </v-list-item>
    </v-lazy>
  </v-list>
</template>

<script setup>
  import { ref } from 'vue'
  import apiTracks from './tracks.json'

  const mountedElements = ref(9)
  const trackElements = ref([])

  const onScroll = () => {
    mountedElements.value = trackElements.value.length
  }
</script>

<script>
  import apiTracks from './tracks.json'

  export default {
    data () {
      return {
        mountedElements: 9,
        apiTracks,
      }
    },
    methods: {
      onScroll () {
        this.mountedElements = this.$refs.trackElements.length
      },
    },
  }
</script>

<style scoped>
#container {
  border-width: 3px;
  border-radius: 15px;
  height: 400px;
  margin: 5px;
}

.v-list-item {
  border-width: thin;
}

.v-list-item-title {
  font-weight: 600;
}
</style>
