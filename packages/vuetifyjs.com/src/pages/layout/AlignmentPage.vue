<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#examples
        section-head(value="Generic.Pages.examples")
        example(
          file="alignment/example"
        )
</template>
