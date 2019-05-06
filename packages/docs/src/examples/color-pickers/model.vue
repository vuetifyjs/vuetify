<template>
  <v-container>
    <v-layout row>
      <div class="ma-4 layout column">
        <v-btn v-for="t in types" :key="t" class="ma-2" @click="type = t">{{ t }}</v-btn>
      </div>
      <div>
        <v-color-picker v-model="color"></v-color-picker>
      </div>
      <v-flex>
        <doc-markup class="ma-4">{{ showColor }}</doc-markup>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
      type: 'hex',
      hex: '#FF00FF',
      hexa: '#FF00FFFF',
      rgba: { r: 255, g: 0, b: 255, a: 1 },
      hsla: { h: 300, s: 1, l: 0.5, a: 1 },
      hsva: { h: 300, s: 1, v: 1, a: 1 }
    }),

    computed: {
      color: {
        get () {
          return this[this.type]
        },
        set (v) {
          this[this.type] = v
        }
      },
      showColor () {
        if (typeof this.color === 'string') return this.color

        return JSON.stringify(Object.keys(this.color).reduce((color, key) => {
          color[key] = Number(this.color[key].toFixed(2))
          return color
        }, {}), null, 2)
      }
    }
  }
</script>
