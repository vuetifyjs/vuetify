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
          component: 'VSelect',
          edit: 'SelectView',
          examples: [
            { header: 'Light theme', file: 'selects/1', desc: 'A standard single select has a multitude of configuration options.' },
            { header: 'Dark theme', file: 'selects/2', desc: 'Selects also support themeing, dark and light.' },
            { header: 'Icons', file: 'selects/3', desc: 'Use a custom prepended or appended icon.' },
            { header: 'Multiple', file: 'selects/4', desc: `A multi-select can utilize v-chip as the display for selected items.` },
            { header: 'Autocomplete', file: 'selects/5', desc: `Provides type-ahead autocomplete functionality.` },
            { header: 'Scoped slots', file: 'selects/6', desc: `With the power of scoped slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.` },
            { header: 'Customized item text and value', file: 'selects/7', desc: `You can specify the specific properties within your items array correspond to the text and value fields. By default, this is <strong>text</strong> and <strong>value</strong>. In this example we also use the <code>return-object</code> prop which will return the entire object of the selected item on selection.` },
            { header: 'Tags', new: '0.15.3', file: 'selects/8', desc: `With tags you can allow a user to create new values that may not be present in a provided items list. Keep in mind, tags only supports arrays of <strong>primitive</strong> items and cannot be used with props such as <code>item-text</code>, <code>item-value</code> for example.` },
            { header: 'Asynchronous items', new: '0.15.3', file: 'selects/9', desc: 'Sometimes you need to load data externally based upon a search query. Use the <code>search-input</code> prop with the <strong>.sync</strong> modifier when using the <code>autocomplete</code> prop. We also make use of the new <code>cache-items</code> prop. This will keep a unique list of all items that have been passed to the <code>items</code> prop and is <strong>REQUIRED</strong> when using asynchronous items and the <strong>multiple</strong> prop.' }
          ],
          props: {
            'v-select': {
              shared: ['input', 'filterable'],
              params: [
                [
                  'allow-overflow',
                  'Boolean',
                  'False',
                  'Removes content/window overflow detection'
                ],
                [
                  'browser-autocomplete',
                  'String',
                  'on',
                  'Set the autocomplete prop for the search input when using the <code>autocomplete</code> prop'
                ],
                [
                  'clearable',
                  'Boolean',
                  'False',
                  'Add input clear functionality'
                ],
                [
                  'cache-items',
                  'Boolean',
                  'False',
                  'Keeps a local <strong>unique</strong> copy of all items that have been passed through the <code>items</code> prop.'
                ],
                [
                  'debounce-search',
                  '[Number, String]',
                  '200',
                  'Debounces the search input value being emitted'
                ],
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
                  'item-disabled',
                  'String',
                  'disabled',
                  `Set property of <code>items</code>'s disabled value`
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
                  'min-width',
                  '[Boolean, Number, String]',
                  'False',
                  'Sets the minimum width of the select, overwrites automatic determination'
                ],
                [
                  'single-line',
                  'Boolean',
                  'False',
                  'Removes floating label'
                ],
                [
                  'solo',
                  'Boolean',
                  'False',
                  'Changes the style of the text-field for use in toolbars'
                ],
                [
                  'tags',
                  'Boolean',
                  'False',
                  'Tagging functionality, allows you to enter/navigate/delete items'
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
                [
                  'return-object',
                  'Boolean',
                  'False',
                  'Changes the selection behavior to return the object directly rather than the value specified with item-value'
                ],
                [
                  'search-input',
                  'String',
                  'null',
                  'Bound when using the autocomplete prop. Use the .sync modifier to catch user input from the autocomplete search input'
                ],
              ],
              model: {
                types: ['Array', 'Object'],
                default: '-',
                description: 'Single select requires model, multiple requires array'
              }
            }
          },
          slots: {
            'v-select': {
              shared: ['label']
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
