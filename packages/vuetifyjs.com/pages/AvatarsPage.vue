<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'alerts-page',

    data: () => ({
      namespace: 'Avatars',
      usage: { file: 'standard' },
      examples: [
        { file: 'advanced' },
        { file: 'icon-and-text' }
      ],
      props: {
        'v-avatar': {
          params: [
            [
              'size',
              'String',
              '48px',
              'Controls the height and width of a child <code>img</code> or <code>v-icon</code>'
            ],
            [
              'tile',
              'Boolean',
              'False',
              'Removes the border radius from the avatar'
            ]
          ]
        }
      },
      slots: {
        'v-avatar': {
          shared: ['default']
        }
      }
    })
  }
</script>