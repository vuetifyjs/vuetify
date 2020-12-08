<template>
  <v-menu
    bottom
    close-delay="100"
    content-class="rounded"
    left
    max-height="500"
    offset-y
    open-delay="60"
    open-on-hover
    transition="slide-y-transition"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template #activator="props">
      <slot
        name="activator"
        v-bind="{ ...props }"
      />
    </template>

    <app-sheet :outlined="false">
      <slot v-if="$slots.default" />

      <default-list
        v-else
        :items="items"
      >
        <template
          v-if="$scopedSlots.item"
          #item="props"
        >
          <slot
            name="item"
            v-bind="{ ...props }"
          />
        </template>
      </default-list>
    </app-sheet>
  </v-menu>
</template>

<script>
  // Components
  import DefaultList from '@/layouts/default/List'

  export default {
    name: 'AppMenu',

    components: { DefaultList },

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
