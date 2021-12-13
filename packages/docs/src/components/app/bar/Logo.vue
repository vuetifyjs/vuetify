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
  // Utilities
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'Logo',

    props: {
      alt: Boolean,
    },

    setup (props) {
      const { locale, t } = useI18n()

      // data
      const theme = 'light'
      const to = {
        name: locale.value,
      }

      // computed
      const logo = computed(() => {
        return props.alt ? `vuetify-logo-${theme}-text.svg` : `vuetify-logo-${theme}.svg`
      })
      const width = computed(() => {
        return props.alt ? 148 : 34
      })

      return {
        logo,
        t,
        to,
        theme,
        width,
      }
    },

  })
</script>
