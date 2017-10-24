<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'alerts-page',

    data: () => ({
      namespace: 'Alerts',
      usage: { file: 'contextual' },
      examples: [
        { file: 'closable' },
        { file: 'icon' },
        { file: 'transition' }
      ]
    })
  }
</script>