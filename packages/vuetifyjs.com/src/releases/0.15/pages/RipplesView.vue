<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Ripples',
          desc: 'The <code>v-ripple</code> directive is used to show action from a user. It can be applied to any block level element. Numerous components come with the ripple directive built in, such as the <code>v-btn</code>, <code>v-tab-item</code> and many more.',
          examples: [
            { header: 'Buttons', file: 'ripples/1', desc: 'Buttons by default have ripples enabled. This can be removed with the prop <code>:ripple="false"</code>.' },
            { header: 'Custom color', file: 'ripples/2', desc: 'Using a helper class, you can change the color of the ripple.' },
            { header: 'Tabs', file: 'ripples/3', desc: 'Tabs by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Navigation drawers', file: 'ripples/4', desc: 'List items by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Toolbars', file: 'ripples/5', desc: 'Toolbar items by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Expansion panels', file: 'ripples/6', desc: 'Expansion panels by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
          ],
          props: {
            'v-ripple': {
              params: [
                [
                  `{ class: 'class' }`,
                  'Property',
                  '',
                  'Applies a custom class to the ripple, useful for changing color'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>