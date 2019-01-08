<template>
  <v-card
    :href="value.href"
    :width="small ? 130 : large ? 195 : 160"
    flat
    tile
    color="transparent"
    class="d-inline-flex mx-2"
    target="_blank"
    rel="noopener"
  >
    <div>
      <v-img
        :alt="`Supporter ${value.name}`"
        :class="value.dark ? 'black' : ''"
        :height="small ? 40 : 70"
        :src="`https://cdn.vuetifyjs.com/images/${value.logo}`"
        contain
      />
    </div>
  </v-card>
</template>

<script>
  export default {
    props: {
      large: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        required: true
      }
    }
  }
</script>
