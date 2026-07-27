<template>
  <div>
    <v-mask-input
      v-model="model"
      :rules="[
        v => !!v || 'IP address is required',
        v => validateIP(v) || 'Invalid IP address'
      ]"
      hint="Enter a valid IP address"
      label="IP Address"
      mask="###.###.###.###"
      placeholder="192.168.001.001"
      persistent-hint
      return-masked-value
    ></v-mask-input>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef(null)

  const validateIP = ip => {
    if (!ip) return false
    const parts = ip.split('.')
    return parts.length === 4 && parts.every(part => {
      const num = parseInt(part)
      return num >= 0 && num <= 255
    })
  }
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
    methods: {
      validateIP (ip) {
        if (!ip) return false
        const parts = ip.split('.')
        return parts.length === 4 && parts.every(part => {
          const num = parseInt(part)
          return num >= 0 && num <= 255
        })
      },
    },
  }
</script>
