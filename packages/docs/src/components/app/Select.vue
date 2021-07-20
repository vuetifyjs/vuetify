<template>
  <v-select
    :background-color="(!theme.isDark && !isFocused) ? 'grey lighten-3' : undefined"
    :flat="!isFocused"
    class="rounded-lg"
    dense
    hide-details
    solo
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-if="$slots.icon || icon"
      #prepend-inner
    >
      <v-icon
        :color="!isFocused ? 'grey' : undefined"
        class="mr-2"
      >
        <slot
          v-if="$slots.icon"
          name="icon"
        />

        <template v-else>
          {{ icon }}
        </template>
      </v-icon>
    </template>
  </v-select>
</template>

<script>
  // This behavior should be easier to do with solo fields
  // TODO: Review this for v3
  export default {
    name: 'AppSelect',

    inject: ['theme'],

    props: { icon: String },

    data: () => ({
      isFocused: false,
    }),
  }
</script>
