<template>
  <v-breadcrumbs
    :items="items"
    class="px-0 py-5"
  />
</template>
<script>
  export default {
    name: 'DocumentationBreadcrumbs',

    data: () => ({
      items: [
        {
          text: 'Documentation',
          disabled: true,
        },
        {
          text: 'Getting started',
          disabled: true,
        },
        {
          text: 'Quick start',
          href: '#',
        },
      ],
    }),
  }
</script>
