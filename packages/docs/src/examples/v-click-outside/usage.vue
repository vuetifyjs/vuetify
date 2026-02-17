<template>
  <v-card
    :color="active ? 'primary' : undefined"
    :dark="active"
    class="mx-auto"
    height="256"
    rounded="xl"
    width="256"
    v-click-outside="onClickOutside"
    @click="active = true"
  >
    <div class="text-h6 text-md-h4 fill-height d-flex align-center justify-center">
      {{ active ? 'Click Outside' : 'Click Me' }}
    </div>
  </v-card>
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
    },
  }
</script>
