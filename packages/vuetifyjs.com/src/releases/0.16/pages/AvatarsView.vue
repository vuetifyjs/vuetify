<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'alerts-view',

    data () {
      return {
        doc: {
          component: 'VAvatar',
          edit: 'AvatarsView',
          title: 'Avatar',
          desc: 'The <code>v-avatar</code> component is used to control the size and border radius of responsive images, typically used to show profile pictures.',
          examples: [
            { header: 'Standard display', file: 'avatars/standard', desc: `The avatar has a dynamic size that can be scaled for any situation. A <strong>tile</strong> variation is available for displaying an avatar without border radius.` },
            { header: 'Advanced usage', file: 'avatars/advanced', desc: `Combining an avatar with other components allows you to build beautiful user interfaces right out of the box.` },
            { header: 'Icon and text', file: 'avatars/icon-and-text', desc: 'An avatar also accepts the <code>v-icon</code> component or text. Mix and match functionality to create something unique.'}
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
        }
      }
    }
  }
</script>

<style lang="stylus">
  #alert-view
    .alert
      margin: 1rem 0
</style>
