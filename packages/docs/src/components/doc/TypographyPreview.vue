<template>
  <v-sheet class="typography-preview" border rounded>
    <v-tabs v-model="tab" color="primary" height="44">
      <v-tab value="md3">MD3 (current)</v-tab>
      <v-tab value="md2">MD2 (legacy)</v-tab>
    </v-tabs>

    <v-divider />

    <div class="typography-preview__content">
      <template v-for="(variant, name, i) in variants" :key="name">
        <details
          :class="['typography-preview__item', { 'border-t' : i > 0 }]"
          :name="`typography-${tab}`"
        >
          <summary class="typography-preview__summary">
            <span
              :style="variant"
              class="typography-preview__text"
            >{{ formatName(name) }}</span>
            <v-code>.text-{{ name }}</v-code>
            <v-icon icon="mdi-chevron-down" size="20" />
          </summary>
          <div class="typography-preview__properties text-mono">
            <div
              v-for="(value, prop) in variant"
              :key="prop"
              class="typography-preview__property"
            >
              <span class="text-medium-emphasis">{{ formatProp(prop) }}</span>
              <span>{{ value }}</span>
            </div>
          </div>
        </details>
      </template>
    </div>
  </v-sheet>
</template>

<script setup lang="ts">
  import type { CSSProperties } from 'vue'
  import { computed, ref } from 'vue'

  const tab = ref('md3')

  const md3Variants: Record<string, CSSProperties> = {
    'display-large': { fontSize: '3.5625rem', lineHeight: 1.1228070175, fontWeight: 400, letterSpacing: '-.0043859649em' },
    'display-medium': { fontSize: '2.8125rem', lineHeight: 1.1555555556, fontWeight: 400, letterSpacing: 'normal' },
    'display-small': { fontSize: '2.25rem', lineHeight: 1.2222222222, fontWeight: 400, letterSpacing: 'normal' },
    'headline-large': { fontSize: '2rem', lineHeight: 1.25, fontWeight: 400, letterSpacing: 'normal' },
    'headline-medium': { fontSize: '1.75rem', lineHeight: 1.2857142857, fontWeight: 400, letterSpacing: 'normal' },
    'headline-small': { fontSize: '1.5rem', lineHeight: 1.3333333333, fontWeight: 400, letterSpacing: 'normal' },
    'title-large': { fontSize: '1.375rem', lineHeight: 1.2727272727, fontWeight: 400, letterSpacing: 'normal' },
    'title-medium': { fontSize: '1rem', lineHeight: 1.5, fontWeight: 500, letterSpacing: '.009375em' },
    'title-small': { fontSize: '.875rem', lineHeight: 1.4285714286, fontWeight: 500, letterSpacing: '.0071428571em' },
    'body-large': { fontSize: '1rem', lineHeight: 1.5, fontWeight: 400, letterSpacing: '.03125em' },
    'body-medium': { fontSize: '.875rem', lineHeight: 1.4285714286, fontWeight: 400, letterSpacing: '.0178571429em' },
    'body-small': { fontSize: '.75rem', lineHeight: 1.3333333333, fontWeight: 400, letterSpacing: '.0333333333em' },
    'label-large': { fontSize: '.875rem', lineHeight: 1.4285714286, fontWeight: 500, letterSpacing: '.0071428571em' },
    'label-medium': { fontSize: '.75rem', lineHeight: 1.3333333333, fontWeight: 500, letterSpacing: '.0416666667em' },
    'label-small': { fontSize: '.6875rem', lineHeight: 1.4545454545, fontWeight: 500, letterSpacing: '.0454545455em' },
  }

  const md2Variants: Record<string, CSSProperties> = {
    h1: { fontSize: '6rem', lineHeight: 1, fontWeight: 300, letterSpacing: '-.015625em' },
    h2: { fontSize: '3.75rem', lineHeight: 1, fontWeight: 300, letterSpacing: '-.0083333333em' },
    h3: { fontSize: '3rem', lineHeight: 1.05, fontWeight: 400, letterSpacing: 'normal' },
    h4: { fontSize: '2.125rem', lineHeight: 1.175, fontWeight: 400, letterSpacing: '.0073529412em' },
    h5: { fontSize: '1.5rem', lineHeight: 1.333, fontWeight: 400, letterSpacing: 'normal' },
    h6: { fontSize: '1.25rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '.0125em' },
    'subtitle-1': { fontSize: '1rem', lineHeight: 1.75, fontWeight: 400, letterSpacing: '.009375em' },
    'subtitle-2': { fontSize: '.875rem', lineHeight: 1.6, fontWeight: 500, letterSpacing: '.0071428571em' },
    'body-1': { fontSize: '1rem', lineHeight: 1.5, fontWeight: 400, letterSpacing: '.03125em' },
    'body-2': { fontSize: '.875rem', lineHeight: 1.425, fontWeight: 400, letterSpacing: '.0178571429em' },
    button: { fontSize: '.875rem', lineHeight: 2.6, fontWeight: 500, letterSpacing: '.0892857143em', textTransform: 'uppercase' },
    caption: { fontSize: '.75rem', lineHeight: 1.667, fontWeight: 400, letterSpacing: '.0333333333em' },
    overline: { fontSize: '.75rem', lineHeight: 2.667, fontWeight: 500, letterSpacing: '.1666666667em', textTransform: 'uppercase' },
  }

  const variants = computed(() => tab.value === 'md3' ? md3Variants : md2Variants)

  function formatName (variant: string) {
    return variant
      .replace('-', ' ')
      .replace(/h(\d)/, 'headline $1')
  }

  function formatProp (propName: string) {
    return propName
      .replace('fontSize', 'size')
      .replace('fontWeight', 'weight')
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase()
      .replace(/^\S/, v => v.toUpperCase())
  }
</script>

<style lang="sass">
.typography-preview
  overflow: hidden

  &__content
    max-height: 550px
    overflow-y: auto

  &__item
    interpolate-size: allow-keywords

    &::details-content
      block-size: 0
      transition: 0.2s ease-in-out
      transition-property: block-size, content-visibility
      transition-behavior: allow-discrete
      overflow: hidden

    &[open]::details-content
      block-size: auto

    &[open] .v-icon
      transform: rotate(180deg)

  &__summary
    display: flex
    align-items: center
    gap: 16px
    padding: 12px 16px
    cursor: pointer
    user-select: none
    list-style: none

    &::marker,
    &::-webkit-details-marker
      display: none

  &__text
    flex: 1
    min-width: 0
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    text-transform: capitalize

  &__properties
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr))
    gap: 8px
    padding: 0 16px 16px
    max-width: 400px
    font-size: 12px

    > div
      display: flex
      flex-direction: column
      gap: 2px
</style>
