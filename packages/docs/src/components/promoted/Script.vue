<template>
  <div :id="id" ref="rootEl" />
</template>

<script setup lang="ts">
  // Utilities
  import { IN_BROWSER } from '@/util/globals'
  import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    scriptId: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
  })

  const emit = defineEmits(['script:error', 'script:load'])

  const rootEl = ref<HTMLElement>()
  const scriptEl = ref<HTMLScriptElement>()

  onBeforeMount(async () => {
    if (!IN_BROWSER) return

    const script = document.createElement('script')
    const onError = () => emit('script:error')

    script.type = 'text/javascript'
    script.id = props.scriptId
    script.src = props.src
    script.onload = () => emit('script:load')
    script.onerror = onError

    scriptEl.value = script
  })

  onMounted(() => {
    scriptEl.value && rootEl.value?.appendChild(scriptEl.value)
  })

  onBeforeUnmount(() => {
    scriptEl.value && rootEl.value?.removeChild(scriptEl.value)
  })
</script>
