<template lang="pug">
  component-view(v-bind:doc="doc" id="badges-view")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Badge component',
          edit: 'BadgesView',
          component: 'badge',
          desc: `The <code>v-badge</code> component can wrap any type of content to highlight information to a user or to just draw attention to a specific element.`,
          examples: [
            { header: 'Character', file: 'badges/character', desc: 'Any character can be placed with a badge.' },
            { header: 'Icon', file: 'badges/icon', desc: 'The icon badge type only supports Material Design icons.' },
            { header: 'Inline', file: 'badges/inline', desc: 'Badges can also be placed inline with text.' },
            { header: 'Visibility', file: 'badges/visibility', desc: 'The visibility of badges can be controlled using <code>v-model</code>.' }
          ],
          props: {
            'v-badge': {
              model: {
                type: ['Boolean'],
                default: 'False'
              },
              params: [
                [
                  'color',
                  'String',
                  'False',
                  'Designate a custom badge color from the MD color spec'
                ],
                [
                  'left',
                  'Boolean',
                  'False',
                  'Position the badge to the left'
                ],
                [
                  'bottom',
                  'Boolean',
                  'False',
                  'Position the badge to the bottom'
                ],
                [
                  'transition',
                  'String',
                  'fab-transition',
                  'Transition used when enabling or disabling the badge'
                ],
                [
                  'overlap',
                  'Boolean',
                  'False',
                  'Remove the added margin and allow badge to overlap designated element'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>
