<template lang="pug">
  component-view(v-bind:doc="doc" id="badges-view")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Badge',
          edit: 'Badges',
          component: 'badges',
          desc: `
            <p>
              Badge directives can be applied to any element using the <code>v-badge</code> directive. By default, a badge will use the application's defined <strong class="primary--text">primary color</strong>. Parameters can be passed using the arg, <code>v-badge:arg</code>, modifier, <code>v-badge:2.modifier</code>, or by passing an object by expression, <code>v-badge="{ value: 2, overlap: true }"</code>
            </p>
            <p>
              The color can be changed by using the color--after helper class, or by apply a class that modifies the background of the badged elements <strong>:after</strong> psuedo-selector.
            </p>`,
          examples: [
            { header: 'Character', file: 'badges/1', desc: 'Any character can be placed with a badge.' },
            { header: 'Icon', file: 'badges/2', desc: 'The icon badge type only supports Material Design icons.' },
            { header: 'Inline', file: 'badges/3', desc: 'Badges can also be placed inline with text.' },
            { header: 'Visibility', file: 'badges/4', desc: 'The visibility of badges can be controlled either by setting the object property <code>visible</code> to <code>false</code>, or setting the entire object to either <code>false</code> or <code>null</code>.' }
          ],
          props: {
            'v-badge': {
              params: [
                [
                  'v-badge:arg.icon',
                  'Boolean',
                  'False',
                  'Specifies the use of an icon'
                ],
                [
                  'v-badge:arg.left',
                  'Boolean',
                  'False',
                  'Positions the badge to the left of the element'
                ],
                [
                  'v-badge:arg.overlap',
                  'Boolean',
                  'False',
                  'Overlaps badge on element'
                ],
                [
                  'v-badge:arg.left',
                  'Boolean',
                  'False',
                  'Positions the badge to the right of the element'
                ],
                [
                  'v-badge:arg.bottom',
                  'Boolean',
                  'False',
                  'Positions the badge to the bottom of the element'
                ],
                [
                  'visible',
                  'Boolean',
                  'False',
                  'Badge object property for determining visibility, see example #4'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>
