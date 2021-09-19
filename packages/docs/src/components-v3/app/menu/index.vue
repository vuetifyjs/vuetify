<template>
  <v-menu
    close-delay="100"
    max-height="500"
    open-delay="60"
    :open-on-hover="false"
    transition="slide-y-transition"
    activator="parent"
    anchor="bottom"
  >
    <app-sheet>
      <slot v-if="$slots.default" />

      <app-list
        v-else
        :items="items"
      >
        <template
          v-if="$slots.item"
          #item="props"
        >
          <slot
            name="item"
            v-bind="props"
          />
        </template>
      </app-list>
    </app-sheet>
  </v-menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  // Components
  export default defineComponent({
    name: 'AppMenu',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  })
</script>
