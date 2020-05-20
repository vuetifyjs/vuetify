<template>
  <v-container
    fluid
    grid-list-xl
    pa-0
  >
    <v-layout
      align-center
      fill-height
      justify-center
      wrap
    >
      <v-flex
        v-for="(layout, i) in layouts"
        :key="i"
        xs12
        sm6
        md4
      >

        <doc-pre-made-card :layout="layout" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      layouts: [
        {
          name: 'Baseline',
          href: '/layouts/layouts/demos/baseline',
          filename: 'baseline',
        },
        {
          name: 'Baseline Flipped',
          href: '/layouts/layouts/demos/baseline-flipped',
          filename: 'baseline-flipped',
        },
        {
          name: 'Centered',
          href: '/layouts/layouts/demos/centered',
          filename: 'centered',
        },
        {
          name: 'Complex',
          href: '/layouts/layouts/demos/complex',
          filename: 'complex',
        },
        {
          name: 'Dark',
          href: '/layouts/layouts/demos/dark',
          filename: 'dark',
        },
        {
          name: 'Google Contacts',
          href: '/layouts/layouts/demos/google-contacts',
          filename: 'google-contacts',
        },
        {
          name: 'Google Keep',
          href: '/layouts/layouts/demos/google-keep',
          filename: 'google-keep',
        },
        {
          name: 'Google Youtube',
          href: '/layouts/layouts/demos/google-youtube',
          filename: 'google-youtube',
        },
        {
          name: 'Sandbox',
          href: '/layouts/layouts/demos/sandbox',
          filename: 'sandbox',
        },
      ],
    }),
  }
</script>
