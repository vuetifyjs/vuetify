<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'alerts-page',

    data: () => ({
      namespace: 'Alerts',
      folder: 'alerts',
      usage: { file: 'contextual' },
      examples: [
        { file: 'closable' },
        { file: 'icon' },
        { file: 'transition' }
      ],
      props: {
        'v-alert': {
          shared: ['colorable', 'transitionable'],
          model: {
            type: ['Boolean'],
            default: 'False'
          },
          params: [
            [
              'dismissible',
              'Boolean',
              'False',
              'Specifies that the Alert can be closed'
            ],
            [
              'icon',
              'String',
              '-',
              'Designates a specific icon'
            ]
          ]
        }
      },
      slots: {
        'v-alert': {
          shared: ['default']
        }
      }
    })
  }
</script>
