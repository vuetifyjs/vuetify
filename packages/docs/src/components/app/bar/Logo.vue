<template>
  <router-link
    class="d-inline-block"
    :to="to"
  >
    <v-img
      :key="logo"
      :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
      :alt="t('logo')"
      class="shrink"
      :width="width"
      transition="scale-transition"
    />
  </router-link>
</template>

<script lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  // Utilities
  import { rpath } from '@/util/routes'
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'Logo',

    props: {
      alt: Boolean,
    },

    setup (props) {
      const { locale, t } = useI18n()
      const theme = useTheme()

      // computed
      const logo = computed(() => {
        return props.alt ? `vuetify-logo-v3-slim-text-${theme.name.value}.svg` : `vuetify-logo-v3-slim-${theme.name.value}.svg`
      })
      const width = computed(() => {
        return props.alt ? 148 : 34
      })

      return {
        logo,
        t,
        to: rpath(locale.value),
        width,
      }
    },

  })
</script>
