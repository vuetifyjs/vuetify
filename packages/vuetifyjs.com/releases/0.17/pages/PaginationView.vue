<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    name: 'pagination-view',

    data () {
      return {
        doc: {
          component: 'VPagination',
          edit: 'PaginationView',
          title: 'Pagination',
          desc: 'The <code>v-pagination</code> component is used to separate long sets of data so that it is easier for a user to consume information. Depending on the length provided, the pagination component will automatically scale. To maintain the current page, simply supply a v-model attribute.',
          examples: [
            { header: 'Short', file: 'pagination/short', desc: 'Pagination displays all pages if parent container is big enough.' },
            { header: 'Long', file: 'pagination/long', desc: 'When the number of page buttons exceeds the parent container, the component will truncate the list.' },
            { header: 'Limit', file: 'pagination/limit', desc: 'You can also manually set the maximum number of visible page buttons with the <code>total-visible</code> prop.' },
            { header: 'Round', file: 'pagination/round', desc: 'The alternate style for pagination is circle pages.' },
            { header: 'Disabled', file: 'pagination/disabled', desc: 'Pagination items can be manually deactivated.' }
          ],
          props: {
            'v-pagination': {
              shared: ['colorable'],
              params: [
                [
                  'circle',
                  'Boolean',
                  'False',
                  'Shape pagination elements as circles',
                ],
                [
                  'disabled',
                  'Boolean',
                  'False',
                  'Disables component'
                ],
                [
                  'length',
                  'Number',
                  '0',
                  'The length of the paginator',
                ],
                [
                  'total-visible',
                  '[Number, String]',
                  'null',
                  'Specify the max total visible pagination numbers'
                ],
                [
                  'next-icon',
                  'String',
                  'chevron_right',
                  'Specify the icon to use for the next icon'
                ],
                [
                  'prev-icon',
                  'String',
                  'chevron_left',
                  'Specify the icon to use for the prev icon'
                ]
              ],
              model: {
                type: 'Number',
                description: 'Current selected page'
              }
            }
          },
          events: {
            'v-pagination': {
              params: [
                [
                  'input',
                  'Number',
                  'Current page'
                ],
                [
                  'next',
                  '-',
                  'Emits when the next button is clicked'
                ],
                [
                  'previous',
                  '-',
                  'Emits when the previous button is clicked'
                ]
              ]
            }
          }
        }
      }
    },
  }
</script>
