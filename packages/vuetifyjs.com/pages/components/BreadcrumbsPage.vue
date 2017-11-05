<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'breadcrumbs-page',

    data: () => ({
      plural: true,
      component: 'v-breadcrumbs',
      components: ['v-breadcrumbs', 'v-breadcrumbs-item'],
      usage: { file: 'textDividers' },
      examples: [
        { file: 'iconDividers' }
      ]
    })
  }
</script>
