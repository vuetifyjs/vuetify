<template>
  <component
    :is="component"
    :class="classes"
  >
    <router-link
      v-if="href"
      :to="href"
      class="text-decoration-none text-end text-md-start"
      style="user-select: none"
      aria-hidden="true"
    >
      <span class="text-primary">#</span>
    </router-link>

    <slot>
      {{ content }}
    </slot>
  </component>
</template>

<script setup>
  // Utilities
  import { computed } from 'vue'

  const HEADING_CLASSES = {
    1: 'text-h3 text-sm-h3',
    2: 'text-h4 text-sm-h4',
    3: 'text-h5',
    4: 'text-h6',
    5: 'text-subtitle-1 font-weight-medium',
  }

  const props = defineProps({
    content: String,
    href: String,
    level: String,
  })

  const component = computed(() => `h${props.level}`)
  const classes = computed(() => ['v-heading', 'mb-2', HEADING_CLASSES[props.level]])
</script>

<style lang="sass">
  .v-heading
    display: inline-block
    position: relative

    > a
      bottom: 0
      display: inline-block
      left: 0
      margin: 0 -.7em
      position: absolute
      right: 0
      top: 0

      &:not(:hover):not(:focus)
        opacity: 0
</style>
