<template lang="pug">
  div(class="view" id="display-view")
    v-layout(row)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Display
          dd(slot="desc") The display helpers allow you to control the display of content. This includes being conditionally visible based upon the current viewport, or the actual element display type.
      ad
    grid
    section
      h6.subheading Classes
      ul.mb-3.browser-list
        li.subheader.pl-0 Visibility
        li <code>hidden-xs-only</code> - hidden on extra small viewports only
        li <code>hidden-sm-and-down</code> - hidden on small viewports and down
        li <code>hidden-sm-and-up</code> - hidden on small viewports and up
        li <code>hidden-md-only</code> - hidden on medium viewports only
        li <code>hidden-md-and-down</code> - hidden on medium viewports and down
        li <code>hidden-md-and-up</code> - hidden on medium viewports and up
        li <code>hidden-lg-only</code> - hidden on large viewports only
        li <code>hidden-lg-and-down</code> - hidden on large viewports and down
        li <code>hidden-lg-and-up</code> - hidden on large viewports and up
        li <code>hidden-xl-only</code> - hidden on extra large viewports only
      ul.mb-5.browser-list
        li.subheader.pl-0 Display
        li <code>d-flex</code> - sets element display to flex
        li <code>d-inline-flex</code> - sets element display to inline-flex
        li <code>d-block</code> - sets element display to block
        li <code>d-inline-block</code> - sets element display to inline-block
      component-example(header="Hidden elements" file="display/hidden-elements")
        div(slot="desc") The toolbar links will be hidden on small viewport devices and down
</template>

<script>
  export default {
    name: 'display-view'
  }
</script>
