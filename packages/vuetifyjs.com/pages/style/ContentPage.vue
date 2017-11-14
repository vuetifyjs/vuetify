<template lang="pug">
  text-page(v-bind:data="$data" id="content-page")
    section#blockquote
      section-heading(value="Style.Content.blockquoteHeader")
      blockquote.blockquote.mb-5 {{ lorem }}

    section#paragraphs
      section-heading(value="Style.Content.paragraphsHeader")
      p {{ lorem }}
      p {{ lorem }}

    section#code
      section-heading(value="Style.Content.codeHeader")
      section-text(value="Style.Content.codeText")

    section#variables
      section-heading(value="Style.Content.variablesHeader")
      section-text(value="Style.Content.variablesText")

    section#user-input
      section-heading(value="Style.Content.userInputHeader")
      section-text(value="Style.Content.userInputText")

</template>

<script>
  export default {
    name: 'content-page',

    data: () => ({
      header: 'Style.Content.header',
      headerText: 'Style.Content.headerText',

      lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
    })
  }
</script>

<style lang="stylus">
  #content-page
    code
      box-shadow: none
</style>
