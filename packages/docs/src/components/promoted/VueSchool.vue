<template>
  <a v-bind="$attrs" :href="fullLink" target="_blank">
  <promoted-base
    class="v-vuetify"
    comfortable
    border
  >
    <v-list-item
      class="rounded px-2 vue-school-link"
      style="min-height: inherit; width: 90%"
      :prepend-avatar="logo"
      :title="title || 'Vue School - Industry Leading Video Training'"
    >
      <template #subtitle>
        <div class="text-caption text--secondary">
          <slot></slot>
        </div>
      </template>
    </v-list-item>
  </promoted-base>
  </a>
</template>

<script lang="ts" setup>
  import { computed } from "vue"
  import logo from "../../assets/vue-school-logo.png"
  import PromotedBase from './Base.vue'
  const props = defineProps<{
    title?: string,
    href: string,
  }>()
  const fullLink = computed(() : string =>{
    return `${props.href}?utm_source=Vuetify&utm_medium=banner&utm_campaign=sponsorship&friend=s-vuetify`
  })
</script>

<style lang="sass">
  .vue-school-link .v-avatar 
    border-radius: 0
  .v-vuetify
    .powered-by
      color: rgba(0, 0, 0, .6)
      font-size: 0.625rem
      font-weight: 400
      letter-spacing: 0.09375rem
      text-transform: uppercase

    &.theme--dark .powered-by
      color: inherit
</style>
