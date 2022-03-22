<template>
  <div :id="id" ref="rootEl" />
</template>

<script lang="ts">
  // Utilities
  import { wait } from '@/util/helpers'
  import { IN_BROWSER } from '@/util/globals'
  import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'

  export default defineComponent({
    name: 'PromotedScript',

    props: {
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
    },

    emits: ['script:error', 'script:load'],

    setup (props, { emit }) {
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

        await wait(1000)

        // If script fails or is blocked
        // will only contain script el
        if ((rootEl.value?.children?.length ?? 0) <= 1) onError()
      })

      onMounted(() => {
        scriptEl.value && rootEl.value?.appendChild(scriptEl.value)
      })

      onBeforeUnmount(() => {
        scriptEl.value && rootEl.value?.removeChild(scriptEl.value)
      })

      return { rootEl }
    },
  })
</script>
