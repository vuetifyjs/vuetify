<template lang="pug">
  component-view(v-bind:doc="doc")
</template>

<script>
  export default {
    data () {
      return {
        doc: {
          component: 'subheader',
          edit: 'SubheaderView',
          title: 'Subheaders',
          desc: 'The <code>v-subheader</code> component is used to separate sections of lists.',
          examples: [
            { header: 'List subheaders', file: 'subheaders/1', desc: 'Subheaders work great with lists for describing the information below.' },
            { header: 'Grid subheaders', file: 'subheaders/2', desc: 'A subheader can add context to what a user is looking at.' },
            { header: 'Menu subheaders', file: 'subheaders/3', desc: 'Using a subheader can help separate different types of actions.' }
          ],
          props: {
            'v-subheader': {
              params: [
                [
                  'inset',
                  'Boolean',
                  'False',
                  'Adds identation (72px)'
                ]
              ]
            }
          }
        }
      }
    }
  }
</script>
