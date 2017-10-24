<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'alerts-page',

    data: () => ({
      header: "alerts.header",
      headerText: "alerts.headerText",
      examples: [
        { header: 'Contextual', file: 'alerts/contextual', desc: `The <code>v-alert</code> component comes in 4 variations, <strong>success</strong>, <strong>info</strong>, <strong>warning</strong> and <strong>error</strong>. These have default icons assigned which can be changed and represent different actions.` },
        { header: 'Closable', file: 'alerts/closable', desc: `Using <code>v-model</code> you can control the state of the Alert. If you don't want to assign a v-model and just display the alert, you can simply assign the prop <code>value</code>.` },
        { header: 'Custom Icon / No Icon', file: 'alerts/icon', desc: `You can easily assign a custom icon or remove it all together.` },
        { header: 'Display transition', file: 'alerts/transition', desc: `You can apply a custom transition to the show/hide of the alert.`}
      ]
    })
  }
</script>