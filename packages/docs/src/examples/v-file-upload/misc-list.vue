<template>
  <v-file-upload v-model="model" clearable multiple show-size>
    <template v-slot:default>
      <v-file-upload-dropzone density="comfortable"></v-file-upload-dropzone>

      <v-file-upload-list class="upload-list">
        <template v-slot:default="{ files, onClickRemove }">
          <v-file-upload-item
            v-for="(file, index) in files"
            :key="file"
            :file="file"
            clearable
            show-size
            @click:remove="onClickRemove(index)"
          >
            <template v-slot:prepend>
              <VAvatar rounded="circle"></VAvatar>
              <v-progress-linear
                v-if="uploads.has(file)"
                :buffer-value="uploads.get(file).buffer"
                :color="uploads.get(file).progress >= 100 ? 'success' : 'primary'"
                :model-value="uploads.get(file).progress"
                location="bottom"
                absolute
              ></v-progress-linear>
            </template>
          </v-file-upload-item>
        </template>
      </v-file-upload-list>
    </template>
  </v-file-upload>
</template>

<script setup>
  import { onMounted, ref, shallowReactive, watch } from 'vue'

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
  const uploads = shallowReactive(new Map())
  const queue = []
  let activeCount = 0
  const maxConcurrent = 2

  function enqueueFiles (files) {
    for (const file of files) {
      if (uploads.has(file)) continue
      uploads.set(file, { progress: 0, buffer: 0 })
      queue.push(file)
    }
    drainQueue()
  }

  function drainQueue () {
    while (activeCount < maxConcurrent && queue.length) {
      const file = queue.shift()
      if (!uploads.has(file)) continue
      activeCount++
      simulateOne(file, () => {
        activeCount--
        drainQueue()
      })
    }
  }

  function simulateOne (file, onComplete) {
    const speed = 200 + Math.random() * 300
    let progress = 0

    const interval = setInterval(() => {
      if (!uploads.has(file)) {
        clearInterval(interval)
        onComplete()
        return
      }
      const increment = 2 + Math.random() * 5
      progress = Math.min(progress + increment, 100)
      const buffer = Math.min(progress + 10 + Math.random() * 15, 100)
      uploads.set(file, { progress, buffer })

      if (progress >= 100) {
        clearInterval(interval)
        onComplete()
      }
    }, speed)
  }

  watch(model, (val, oldVal) => {
    const oldSet = new Set(oldVal)
    const newFiles = val.filter(f => !oldSet.has(f))

    // clean up removed files
    for (const file of oldSet) {
      if (!val.includes(file)) {
        uploads.delete(file)
      }
    }

    if (newFiles.length) {
      enqueueFiles(newFiles)
    }
  })

  onMounted(async () => {
    model.value = await Promise.all([
      createImageFile('sunset.png', ['#e91e63', '#4caf50']),
      createImageFile('aurora.png', ['#ff9800', '#9c27b0']),
      createImageFile('horizon.png', ['#2196f3', '#ff5722']),
      createImageFile('tropical.png', ['#00bcd4', '#ffc107']),
      createImageFile('neon.png', ['#673ab7', '#00e676']),
      createImageFile('twilight.png', ['#f44336', '#3f51b5']),
    ])
  })
</script>

<script>
  export default {
    data: () => ({
      model: [],
      uploads: new Map(),
      queue: [],
      activeCount: 0,
      maxConcurrent: 2,
    }),
    watch: {
      model (val, oldVal) {
        const oldSet = new Set(oldVal)
        const newFiles = val.filter(f => !oldSet.has(f))

        for (const file of oldSet) {
          if (!val.includes(file)) {
            this.uploads.delete(file)
          }
        }

        if (newFiles.length) {
          this.enqueueFiles(newFiles)
        }
      },
    },
    async mounted () {
      this.model = await Promise.all([
        this.createImageFile('sunset.png', ['#e91e63', '#4caf50']),
        this.createImageFile('aurora.png', ['#ff9800', '#9c27b0']),
        this.createImageFile('horizon.png', ['#2196f3', '#ff5722']),
        this.createImageFile('tropical.png', ['#00bcd4', '#ffc107']),
        this.createImageFile('neon.png', ['#673ab7', '#00e676']),
        this.createImageFile('twilight.png', ['#f44336', '#3f51b5']),
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
      enqueueFiles (files) {
        for (const file of files) {
          if (this.uploads.has(file)) continue
          this.uploads.set(file, { progress: 0, buffer: 0 })
          this.queue.push(file)
        }
        this.drainQueue()
      },
      drainQueue () {
        while (this.activeCount < this.maxConcurrent && this.queue.length) {
          const file = this.queue.shift()
          if (!this.uploads.has(file)) continue
          this.activeCount++
          this.simulateOne(file, () => {
            this.activeCount--
            this.drainQueue()
          })
        }
      },
      simulateOne (file, onComplete) {
        const speed = 200 + Math.random() * 300
        let progress = 0

        const interval = setInterval(() => {
          if (!this.uploads.has(file)) {
            clearInterval(interval)
            onComplete()
            return
          }
          const increment = 2 + Math.random() * 5
          progress = Math.min(progress + increment, 100)
          const buffer = Math.min(progress + 10 + Math.random() * 15, 100)
          this.uploads.set(file, { progress, buffer })

          if (progress >= 100) {
            clearInterval(interval)
            onComplete()
          }
        }, speed)
      },
    },
  }
</script>

<style scoped>
.upload-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 0;

  > * {
    margin: 0;
  }
}
</style>
