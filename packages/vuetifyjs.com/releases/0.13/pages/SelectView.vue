<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          title: 'Select',
          desc: 'Select fields components are used for collecting user provided information from a list of options.',
          component: 'select',
          edit: 'SelectView',
          examples: [
            { header: 'Light theme', file: 'selects/1', desc: 'A standard single select has a multitude of configuration options.' },
            { header: 'Dark theme', file: 'selects/2', desc: 'Selects also support theming, dark and light.' },
            { header: 'Icons', file: 'selects/3', desc: 'Use a custom prepended or appended icon.' },
            { header: 'Multiple', file: 'selects/4', desc: `A multi-select can utilize v-chip as the display for selected items.` },
            { header: 'Autocomplete', file: 'selects/5', desc: `Provides type-ahead autocomplete functionality.` },
            { header: 'Scoped slots', file: 'selects/6', desc: `With the power of scoped slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.` },
            { header: 'Customized item text and value', file: 'selects/7', desc: `You can specify the specific properties within your items array correspond to the text and value fields. By default, this is <strong>text</strong> and <strong>value</strong>. In this example we also use the <code>return-object</code> prop which will return the entire object of the selected item on selection.` }
          ],
          props: {
            'v-select': {
              shared: ['input', 'filterable'],
              params: [
                [
                  'chips',
                  'Boolean',
                  'False',
                  'Changes display of selections to chips'
                ],
                [
                  'items',
                  'Array',
                  '[]',
                  'Can be an array of objects or array of strings. When using objects, will look for a <strong>text</strong> and <strong>value</strong> field. This can be changed using the <code>item-text</code> and <code>item-value</code> props.'
                ],
                [
                  'item-text',
                  'String',
                  'text',
                  'Set property of <code>items</code> will be displayed on option'
                ],
                [
                  'item-value',
                  'String',
                  'value',
                  'Set property of <code>items</code> define option\'s value'
                ],
                [
                  'max-height',
                  'Number, String',
                  '200',
                  'Sets the maximum height for the select menu'
                ],
                [
                  'multiple',
                  'Boolean',
                  'False',
                  'Changes select to multiple. Accepts array for v-model'
                ],
                [
                  'single-line',
                  'Boolean',
                  'False',
                  'Removes floating label'
                ],
                [
                  'auto',
                  'Boolean',
                  'False',
                  'Centers list on selected element',
                ],
                [
                  'autocomplete',
                  'Boolean',
                  'False',
                  'Filter the items in the list based on user input'
                ],
              ],
              model: {
                types: ['Array', 'Object'],
                default: '-',
                description: 'Single select requires model, multiple requires array'
              }
            }
          },
          events: {
            'v-select': {
              params: [
                ['input', 'String', 'Selected value']
              ]
            }
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #forms-view
    .with
      min-height: 0

    main
      min-height: 0
      padding-left: 0

    .toolbar
      max-height: 64px

    .component-example__container
      justify-content: space-between
      flex-wrap: wrap

      > div > *
        margin: 2rem 0
        flex: 1 0 100%
</style>
