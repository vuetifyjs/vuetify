<template>
  <div style="min-height: 4px;">
    <v-progress-linear
      v-model="value"
      :active="show"
      :indeterminate="query"
      :query="true"
    ></v-progress-linear>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const value = ref(0)
  const query = ref(false)
  const show = ref(true)

  let interval = -1
  onMounted(() => {
    queryAndIndeterminate()
  })
  onBeforeUnmount(() => {
    clearInterval(interval)
  })

  function queryAndIndeterminate () {
    query.value = true
    show.value = true
    value.value = 0
    setTimeout(() => {
      query.value = false
      interval = setInterval(() => {
        if (value.value === 100) {
          clearInterval(interval)
          show.value = false
          return setTimeout(queryAndIndeterminate, 2000)
        }
        value.value += 25
      }, 1000)
    }, 2500)
  }
</script>

<script>
  export default {
    data () {
      return {
        value: 0,
        query: false,
        show: true,
        interval: 0,
      }
    },

    mounted () {
      this.queryAndIndeterminate()
    },

    beforeUnmount () {
      clearInterval(this.interval)
    },

    methods: {
      queryAndIndeterminate () {
        this.query = true
        this.show = true
        this.value = 0

        setTimeout(() => {
          this.query = false

          this.interval = setInterval(() => {
            if (this.value === 100) {
              clearInterval(this.interval)
              this.show = false
              return setTimeout(this.queryAndIndeterminate, 2000)
            }
            this.value += 25
          }, 1000)
        }, 2500)
      },
    },
  }
</script>
