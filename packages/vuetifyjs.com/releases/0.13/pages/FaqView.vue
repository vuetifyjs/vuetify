<template lang="pug">
  doc-view
    v-layout(column-xs row-sm wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Frequently asked questions
          dd(slot="desc") Stuck on a particular problem? Check some of these common gotchas before creating a ticket. If you still cannot find what you are looking for, submit an <a href="https://github.com/vuetifyjs/vuetify/issues/new" target="_blank" rel="noopener">issue</a> on github.
      ad
    section
      v-expansion-panel
        v-expansion-panel-content(v-for="faq in faqs" v-bind:key="faq")
          div(slot="header")
            strong Question: &nbsp;
            span(v-html="faq.q") 
          v-card
            v-card-text
              strong Answer: &nbsp;
              div(v-html="faq.a")
</template>

<script>
  export default {
    data: () => ({
      faqs: [
        {
          q: `Menu/Dialog/Navigation drawer are not opening properly.`,
          a: `Ensure that your components are wrapped with a <code>v-app</code> element. If you are using an element to activate the component that is not placed into the <kbd>activator</kbd> slot, ensure that you stop propagation of the click event. These components utilize the <code>v-outside-click</code> directive and will immediately close.`
        },
        {
          q: `I'm using <code>@click</code> on a component and it is not invoking my method.`,
          a: `When Vue 2 was released, it changed how events work on custom components. Native events, like click, hover were are longer explicitly available and must be bound with <code>@click.native</code>. <a href="https://vuejs.org/v2/guide/migration.html#Listening-for-Native-Events-on-Components-with-v-on-changed" target="_blank" rel="noopener">Reference</a>.`
        }
      ]
    })
  }
</script>