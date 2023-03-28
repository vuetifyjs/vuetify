<template>
  <div class="d-flex justify-space-around">
    <v-color-picker
      v-model="color"
      :modes="['rgba']"
    ></v-color-picker>

    <div class="d-flex flex-column">
      <v-color-picker
        v-model="color"
        v-model:mode="mode"
      ></v-color-picker>
      <v-select
        v-model="mode"
        :items="modes"
        style="max-width: 300px"
      ></v-select>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      color: '#ff00ff',
      mode: 'hsla',
      modes: ['hsla', 'rgba', 'hexa'],
    }),
  }
</script>
