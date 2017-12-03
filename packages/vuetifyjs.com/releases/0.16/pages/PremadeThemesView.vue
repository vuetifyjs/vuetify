<template lang="pug">
  doc-view#themes-view
    section-def
      dt(slot="title") Free and Premium themes
      dd(slot="desc") Vuetify offers Free and Premium pre-made themes designed to get you started in a flash. Free themes are available to install through vue-cli or you can simply download the source.
    v-container(fluid grid-list-xl)
      v-layout(row wrap)
        v-flex(
          xs12 sm6
          v-for="template in templates"
          v-bind:key="template.title"
        )
          v-card(height="100%")
            v-card-media(:src='template.screenshot' height="350px")
            v-card-title.align-center
              h2.headline.mb-0 {{ template.title }}
                v-chip(label small color="indigo" text-color="white" v-if="template.tag") {{ template.tag }}
                v-chip(label small color="blue-grey" text-color="white" v-else) FREE
              v-spacer
              v-avatar(v-if="template.buy").green.lighten-2
                span.white--text.title 25$
            v-divider
            v-card-text {{ template.description }}
            v-card-actions
              v-btn(
                flat
                color="success"
                :href="template.demoUrl"
                v-if="!template.price"
                target="_blank"
                rel="noopener"
              ) Demo
              v-spacer
              v-btn(
                flat
                href="javascript:;"
                disabled
                v-if="template.price"
              ) Coming Soon
              v-btn(
                flat
                color="success"
                :href="`https://github.com/${template.sourceUrl}/tree/master/template`"
                target="_blank"
                rel="noopener"
                v-else
              ) Source Code
                v-icon(right success) chevron_right

</template>

<script>
  export default {
    data: () => ({
      templates: [
        {
          screenshot: '/static/doc-images/starter/vuetify-premium.jpg',
          title: 'Startup',
          tag: 'PREMIUM',
          description: 'Showcase your Company or personal portfolio with this beautifully hand-crafted Material design template.',
          price: '25$',
          demoUrl: ''
        },
        {
          screenshot: '/static/doc-images/starter/vuetify-parallax-starter.png',
          title: 'Parallax',
          description:'This beautiful single page parallax is a great home page for any application.',
          sourceUrl: 'vuetifyjs/parallax-starter',
          demoUrl: '/themes/parallax-starter'
        },
        {
          screenshot: '/static/doc-images/starter/vuetify-blog-starter.png',
          title: 'Blog',
          description:'A simple template that features a clean interface for creating a blog or blog-like application.',
          sourceUrl: 'vuetifyjs/blog-starter',
          demoUrl: '/themes/blog-starter'
        }
      ]
    })
  }
</script>
