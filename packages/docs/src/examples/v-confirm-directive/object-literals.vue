<template>
  <div class="text-center py-10">
    <v-btn text="Confirm" v-confirm="confirm"></v-btn>
  </div>
</template>

<script setup>
  const confirm = {
    text: 'Are you sure?',
    onSubmit () {
      alert('Confirmed!')
    },
  }
</script>

<script>
  export default {
    data: () => ({
      text: 'Are you sure?',
      scrollStrategy: 'block',
    }),
    methods: {
      onSubmit () {
        alert('Confirmed!')
      },
    },
  }
</script>
