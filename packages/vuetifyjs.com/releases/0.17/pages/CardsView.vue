<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: 'VCard',
          edit: 'CardsView',
          title: 'Card',
          desc: 'The <code>v-card</code> component is a versatile component that can be used for anything from a panel to a static image. The <strong>card</strong> component has numerous helper components to make markup as easy as possible. Components that have no listed options use <strong class="green--text">Vue\'s</strong> functional component option for faster rendering and serve as markup sugar to make building easier.',
          examples: [
            { header: 'Components', file: 'cards/components', desc: `A card has 4 basic components, <code>v-card-media</code>, <code>v-card-title</code>, <code>v-card-text</code> and <code>v-card-actions</code>.` },
            { header: 'Media with text', file: 'cards/media-with-text', desc: 'Using the layout system, we can add custom text anywhere within the background.' },
            { header: 'Horizontal cards', file: 'cards/horizontal', desc: 'Using <code>v-flex</code>, you can create customized horizontal cards. Use the <code>contain</code> property to shrink the <code>v-card-media</code> to fit inside the container, instead of covering.' },
            { header: 'Grids', file: 'cards/grids', desc: 'Using grid lists, you can create beautiful layouts.' },
            { header: 'Custom actions', file: 'cards/custom-actions', desc: 'With a simple conditional, you can easily add supplementary text that is hidden until opened.' }
          ],
          props: {
            'v-card': {
              shared: ['router', 'theme', 'colorable'],
              params: [
                [
                  'height',
                  'String',
                  'auto',
                  'Manually define the height of the Card',
                ],
                [
                  'img',
                  'String',
                  `-`,
                  'Specifies an image background',
                ],
                [
                  'hover',
                  'Boolean',
                  'False',
                  'Apply a higher elevation on hover',
                ],
                [
                  'raised',
                  'Boolean',
                  'False',
                  'Specifies a higher default elevation',
                ],
                [
                  'flat',
                  'Boolean',
                  'False',
                  'Specifies a 0 elevation',
                ],
                [
                  'tile',
                  'Boolean',
                  'False',
                  'Turn the card into a tile by removing the border radius',
                ]
              ]
            },
            'v-card-media': {
              params: [
                ['contain', 'Boolean', 'False', 'Change the background-size to contain.'],
                ['src', 'String', '-', 'The image to display as a background.'],
                ['height', 'Number, String', 'False', 'Manually set the height of the component.']
              ]
            },
            'v-card-title': {
              params: [
                ['primary-title', 'Boolean', 'False', 'Applies primary title specific padding.']
              ]
            }
          },
          functional: {
            'v-card': {
              params: [
                [
                  'v-card-text',
                  '.card__text'
                ],
                [
                  'v-card-actions',
                  '.card__actions'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>
