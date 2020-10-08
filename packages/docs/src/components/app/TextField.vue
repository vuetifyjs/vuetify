<template>
  <v-text-field
    v-model="search"
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
  </v-text-field>
</template>

<script>
  // This behavior should be easier to do with solo fields
  // TODO: Review this for v3
  export default {
    name: 'AppTextField',

    inject: ['theme'],

    props: { icon: String },

    data: () => ({
      isFocused: false,
      search: '',
    }),
  }
</script>
