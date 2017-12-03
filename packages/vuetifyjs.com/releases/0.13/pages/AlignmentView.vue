<template lang="pug">
  div(class="view" id="spacing-view")
    v-layout(column-xs row-sm)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Alignment
          dd(slot="desc") Layouts can change when screen resolutions change. The alignment classes help you position your text based on viewport size.
      ad
    section
      component-example(header="Examples" file="alignment/1")
        v-card
          v-card-text
            p(class="text-lg-right") Right align on large viewport sizes
            p(class="text-md-center") Center align on medium viewport sizes
            p(class="text-sm-left") Left align on small viewport sizes
            p(class="text-xs-center") Center align on all viewport sizes
            p(class="text-xl-right") Right align on extra large viewport sizes
      markup(lang="html")
        |&lt;p class="text-xs-left"&gt;...&lt;/p&gt;
        |&lt;p class="text-xs-center"&gt;...&lt;/p&gt;
        |&lt;p class="text-xs-right"&gt;...&lt;/p&gt;
        |&nbsp;
        |&nbsp;
        |&lt;p class="text-xs-left"&gt;...&lt;/p&gt;
        |&lt;p class="text-sm-left"&gt;...&lt;/p&gt;
        |&lt;p class="text-md-left"&gt;...&lt;/p&gt;
        |&lt;p class="text-lg-left"&gt;...&lt;/p&gt;
        |&lt;p class="text-xl-right"&gt;...&lt;/p&gt;
</template>

<script>
  export default {
    name: 'alignment-view'
  }
</script>