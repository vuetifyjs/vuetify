<template lang="pug">
  views-doc#content-page
    template(slot-scope="{ namespace }")
      section#blockquote
        helpers-section-head(:value="`${namespace}.blockquoteHeader`")
        blockquote.blockquote.mb-5 {{ lorem }}

      section#paragraphs
        helpers-section-head(:value="`${namespace}.paragraphsHeader`")
        p {{ lorem }}
        p {{ lorem }}

      section#code
        helpers-section-head(:value="`${namespace}.codeHeader`")
        helpers-section-text(:value="`${namespace}.codeText`")

      section#variables
        helpers-section-head(:value="`${namespace}.variablesHeader`")
        helpers-section-text(:value="`${namespace}.variablesText`")

      section#user-input
        helpers-section-head(:value="`${namespace}.userInputHeader`")
        helpers-section-text(:value="`${namespace}.userInputText`")

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
