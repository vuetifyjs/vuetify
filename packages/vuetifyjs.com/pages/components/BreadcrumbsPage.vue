<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'breadcrumbs-page',

    data: () => ({
      namespace: 'Breadcrumbs',
      folder: 'breadcrumbs',
      usage: { file: 'textDividers' },
      examples: [
        { file: 'iconDividers' }
      ]
    })
  }
</script>
