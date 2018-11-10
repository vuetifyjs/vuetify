<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#examples
        helpers-section-head(value="Generic.Pages.examples")
        helpers-example(
          file="alignment/example"
        )
</template>
