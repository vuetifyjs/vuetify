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
            { header: 'Buttons', file: 'ripples/buttons', desc: 'Buttons by default have ripples enabled. This can be removed with the prop <code>:ripple="false"</code>.' },
            { header: 'Custom color', file: 'ripples/custom-color', desc: 'Using a helper class, you can change the color of the ripple.' },
            { header: 'Tabs', file: 'ripples/tabs', desc: 'Tabs by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Navigation drawers', file: 'ripples/navigation-drawers', desc: 'List items by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Toolbars', file: 'ripples/toolbars', desc: 'Toolbar items by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Expansion panels', file: 'ripples/expansion-panels', desc: 'Expansion panels by default have ripples disabled. This can be enabled with the <code>ripple</code> prop.' },
            { header: 'Standard HTML element', file: 'ripples/html-element', desc: 'Add the ripple effect to a standard HTML element. This can be enabled with the <code>v-ripple</code> HTML attribute.' },
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
