<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-chip-group
      active-class="primary--text"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-chip
        v-for="tag in tags"
        :key="tag"
      >
        {{ tag }}
      </v-chip>
    </v-chip-group>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],

      defaults: {
        'center-active': false,
        column: false,
        mandatory: false,
        multiple: false,
        'show-arrows': false,
      },
      options: {
        booleans: [
          'center-active',
          'mandatory',
          'multiple',
          'show-arrows',
        ],
      },
      tabs: ['column'],
    }),
  }
</script>
