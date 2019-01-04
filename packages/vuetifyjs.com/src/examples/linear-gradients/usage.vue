<template>
  <div v-linear-gradient="gradient" class="demo"></div>
</template>

<script>
  export default {
    data: () => ({
      gradient: {
        angle: 45,
        stops: [
          {
            color: '#42f4e5',
            percent: 20
          },
          {
            color: '#409ced'
          }
        ]
      }
    })
  }
</script>

<style>
.demo {
  width: 300px;
  height: 200px;
}
</style>
