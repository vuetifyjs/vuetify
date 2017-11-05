<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'data-tables-page',

    data: () => ({
      namespace: 'DataTables',
      folder: 'tables',
      usage: { file: 'standard' },
      examples: [
        { file: 'noData' },
        { file: 'headers' },
        { file: 'headerCell' },
        { file: 'footer' },
        { file: 'expand' },
        { file: 'select' },
        { file: 'search' },
        { file: 'paginate' },
        { file: 'sort' },
        { file: 'server' },
        { file: 'theme' },
        { file: 'headerless' }
      ]
    })
  }
</script>
