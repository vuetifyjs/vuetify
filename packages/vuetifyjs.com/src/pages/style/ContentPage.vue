<template lang="pug">
  doc-view#content-page
    template(slot-scope="{ namespace }")
      section#blockquote
        section-head(:value="`${namespace}.blockquoteHeader`")
        blockquote.blockquote.mb-5 {{ lorem }}

      section#paragraphs
        section-head(:value="`${namespace}.paragraphsHeader`")
        p {{ lorem }}
        p {{ lorem }}

      section#code
        section-head(:value="`${namespace}.codeHeader`")
        section-text(:value="`${namespace}.codeText`")

      section#variables
        section-head(:value="`${namespace}.variablesHeader`")
        section-text(:value="`${namespace}.variablesText`")

      section#user-input
        section-head(:value="`${namespace}.userInputHeader`")
        section-text(:value="`${namespace}.userInputText`")

</template>

<script>
  export default {
    data: () => ({
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.'
    })
  }
</script>

<style lang="stylus">
  #content-page
    code
      box-shadow: none
</style>
