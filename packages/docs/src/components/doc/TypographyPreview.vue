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
    'display-large': { fontSize: '57px', lineHeight: '64px', fontWeight: 400, letterSpacing: '-0.25px' },
    'display-medium': { fontSize: '45px', lineHeight: '52px', fontWeight: 400, letterSpacing: '0px' },
    'display-small': { fontSize: '36px', lineHeight: '44px', fontWeight: 400, letterSpacing: '0px' },
    'headline-large': { fontSize: '32px', lineHeight: '40px', fontWeight: 400, letterSpacing: '0px' },
    'headline-medium': { fontSize: '28px', lineHeight: '36px', fontWeight: 400, letterSpacing: '0px' },
    'headline-small': { fontSize: '24px', lineHeight: '32px', fontWeight: 400, letterSpacing: '0px' },
    'title-large': { fontSize: '22px', lineHeight: '28px', fontWeight: 400, letterSpacing: '0px' },
    'title-medium': { fontSize: '16px', lineHeight: '24px', fontWeight: 500, letterSpacing: '0.15px' },
    'title-small': { fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
    'body-large': { fontSize: '16px', lineHeight: '24px', fontWeight: 400, letterSpacing: '0.5px' },
    'body-medium': { fontSize: '14px', lineHeight: '20px', fontWeight: 400, letterSpacing: '0.25px' },
    'body-small': { fontSize: '12px', lineHeight: '16px', fontWeight: 400, letterSpacing: '0.4px' },
    'label-large': { fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
    'label-medium': { fontSize: '12px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
    'label-small': { fontSize: '11px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
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
