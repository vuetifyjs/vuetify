<template>
  <v-card
    v-click-outside="{
      handler: onClickOutside,
      include
    }"
    :color="active ? 'primary' : undefined"
    :dark="active"
    class="mx-auto"
    height="256"
    rounded="xl"
    width="256"
    @click="active = true"
  >
    <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
      {{ active ? 'Click Outside' : 'Click Me' }}
    </div>
  </v-card>

  <div class="d-flex justify-center">
    <v-card
      rounded="lg"
      class="ma-2 included"
    >
      <v-card-text class="text-h6">
        This element is included
      </v-card-text>
    </v-card>

    <v-card
      rounded="lg"
      class="ma-2"
    >
      <v-card-text class="text-h6">
        This element is not included
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      active: false,
    }),
    methods: {
      onClickOutside () {
        this.active = false
      },
      include () {
        return [document.querySelector('.included')]
      },
    },
  }
</script>
