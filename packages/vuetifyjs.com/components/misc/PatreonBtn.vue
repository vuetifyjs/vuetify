<template lang="pug">
  v-btn(
    dark
    style="background-color: #F96854 !important;"
    active-class=""
    href="https://www.patreon.com/bePatron?u=6223325"
    target="_blank"
    rel="noopener"
  )
    img(src="/static/doc-images/patreon-dark.png" width="24px").mr-2
    span(v-text="$t('Vuetify.AppDrawer.becomeASponsor')").caption
</template>

<style lang="stylus" scoped>
  .btn span
    font-weight: 900 !important
</style>
