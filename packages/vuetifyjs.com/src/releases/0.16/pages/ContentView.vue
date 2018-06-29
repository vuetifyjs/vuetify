<template lang="pug">
  doc-view(id="content-view")
    v-layout(row wrap)
      v-flex(xs12 sm8 xl12)
        section-def
          dt(slot="title") {{ doc.title }}
          dd(slot="desc") {{ doc.desc }}
      ad
    section
      section-header Block quote
      blockquote.blockquote.mb-5 Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.

      section-header Paragraphs
      div.mb-5
        p Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.

        p Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.

      section-header Code
      div.mb-5 Example of an inline <code>&lt;code&gt;</code> element.

      section-header Variables
      div.mb-5 <var>v</var> = <var>u</var> * <var>e</var>

      section-header User input
      div To install Vuetify, type <kbd>npm install vuetify</kbd> into your console. Once complete, type <kbd>cd &lt;project name&gt;</kbd> and run <kbd>npm install</kbd>
</template>

<script>
  export default {
    name: 'content-view',

    data () {
      return {
        doc: {
          title: 'Content',
          desc: 'Vuetify has custom styling for multiple standard elements.'
        },
        lorem: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    }
  }
</script>

<style lang="stylus">
  #content-view
    .component-example__container
      > div
        width: 100%
        
    code
      box-shadow: none
</style>