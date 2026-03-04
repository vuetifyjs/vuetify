<template>
  <v-file-upload
    v-model="model"
    clearable
    inset-file-list
    multiple
    show-size
  ></v-file-upload>
</template>

<script setup>
  import { onMounted, ref } from 'vue'

  function createImageFile (name, colors) {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 64, 64)
    gradient.addColorStop(0, colors[0])
    gradient.addColorStop(1, colors[1])
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
    return new Promise(resolve => {
      canvas.toBlob(blob => {
        resolve(new File([blob], name, { type: 'image/png' }))
      })
    })
  }

  const model = ref([])

  onMounted(async () => {
    model.value = await Promise.all([
      createImageFile('sunset.png', ['#e91e63', '#4caf50']),
      createImageFile('aurora.png', ['#ff9800', '#9c27b0']),
      createImageFile('horizon.png', ['#2196f3', '#ff5722']),
    ])
  })
</script>

<script>
  export default {
    data: () => ({
      model: [],
    }),
    async mounted () {
      this.model = await Promise.all([
        this.createImageFile('sunset.png', ['#e91e63', '#4caf50']),
        this.createImageFile('aurora.png', ['#ff9800', '#9c27b0']),
        this.createImageFile('horizon.png', ['#2196f3', '#ff5722']),
      ])
    },
    methods: {
      createImageFile (name, colors) {
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 64, 64)
        gradient.addColorStop(0, colors[0])
        gradient.addColorStop(1, colors[1])
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
        return new Promise(resolve => {
          canvas.toBlob(blob => {
            resolve(new File([blob], name, { type: 'image/png' }))
          })
        })
      },
    },
  }
</script>
