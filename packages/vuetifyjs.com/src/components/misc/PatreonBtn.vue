<template lang="pug">
  translation-translatable(i18n="Vuetify.AppDrawer.becomeASponsor")
    v-btn(
      dark
      style="background-color: #F96854 !important;"
      active-class=""
      href="https://www.patreon.com/vuetify"
      target="_blank"
      rel="noopener"
      small
    )
      img(src="https://s3.amazonaws.com/vuetify-docs/images/social/patreon-dark.png" width="24px").mr-2
      span(v-text="$t('Vuetify.AppDrawer.becomeASponsor')").caption
</template>

<style lang="stylus" scoped>
  .v-btn span
    font-weight: 900 !important
</style>
