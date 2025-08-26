<template>
  <v-responsive
    class="align-center"
    min-height="118"
  >
    <template v-if="!error1">
      <PromotedBase
        ref="script"
        :class="[
          isDark ? 'theme--dark' : 'theme--light',
        ]"
        max-width="360"
        border
      >
        <PromotedScript
          id="bitterbrainsads-script"
          script-id="_bitterbrainsads_js"
          src="//media.bitterbrains.com/main.js?from=VUETIFY&type=top"
          async
          @script:error="error1 = true"
        />
      </PromotedBase>
    </template>

    <VoPromotionsCardVuetify v-else />
  </v-responsive>
</template>

<script setup lang="ts">
  const error1 = shallowRef(false)
  const script = shallowRef(null)
  let timer = -1 as any

  function checkForElement (id: string, cb?: () => void) {
    return setTimeout(() => {
      if (document.getElementById(id)) return

      clearTimeout(timer)

      cb?.()
    }, 2000)
  }

  onMounted(() => {
    timer = checkForElement('bitterbrainsads', () => {
      error1.value = true
    })
  })

  onBeforeUnmount(() => {
    document.getElementById('bitterbrainsads-script')?.remove()
  })

  onScopeDispose(() => {
    clearTimeout(timer)
  })

  const theme = useTheme()

  const isDark = computed(() => theme.current.value.dark)
</script>

<style lang="sass">
  #bitterbrainsads-script
    width: 100%
</style>
