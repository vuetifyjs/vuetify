<template>
  <component
    :is="component"
    :class="classes"
  >
    <router-link
      v-if="href"
      :to="href"
      aria-hidden="true"
      class="text-decoration-none text-end text-md-start d-none d-sm-inline-block"
      style="user-select: none"
    >
      <span class="text-primary">#</span>
    </router-link>

    <slot>
      {{ content }}
    </slot>
  </component>
</template>

<script setup>
  const HEADING_CLASSES = {
    1: 'text-display-medium text-sm-display-medium',
    2: 'text-headline-large text-sm-headline-large',
    3: 'text-headline-small',
    4: 'text-title-large',
    5: 'text-body-large font-weight-medium',
  }

  const props = defineProps({
    content: String,
    href: String,
    level: String,
  })

  const component = computed(() => `h${props.level}`)
  const classes = computed(() => ['v-heading', 'mt-0', 'mb-2', HEADING_CLASSES[props.level]])
</script>

<style lang="sass">
  .v-heading
    display: inline-block
    position: relative

    > a
      bottom: 0
      font-size: .75em
      left: 0
      margin: 0 -.7em
      position: absolute
      right: 0
      top: 0

      &:not(:hover):not(:focus)
        opacity: 0

    + p
      margin-block-start: 0
</style>
