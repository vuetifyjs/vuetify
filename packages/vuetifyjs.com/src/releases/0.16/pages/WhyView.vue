<template lang="pug">
  doc-view#why-vuetify
    section-header What's the difference?
    v-layout(row wrap).mb-5
      v-flex(xs12)
        v-container(fluid grid-list-md).pa-0
          v-layout(row wrap).pillars
            v-flex(
              xs12
              sm4
              v-for="(p, i) in philosophies"
              :key="i"
            )
              v-card
                v-layout(align-center justify-center).pa-5
                  v-avatar(size="150px")
                    img(
                      :src="p.img"
                    ).grey.darken-4
                div.px-3
                  v-divider.indigo.lighten-4
                v-card-title(primary).headline.layout.justify-center
                  span(v-text="p.title")
                v-card-text(v-html="p.caption").caption
    v-layout(row wrap justify-space-between)
      v-flex(xs12 md8)
        section-text Choosing a framework can be a daunting task, and I'm not even talking about component frameworks. You've arrived at Vue and now it's time to start developing your next great idea. There are many options to choose from, and everyone says that they are great. So you have to decide, what are my metrics for success?
        section-text This was me almost a year ago. There were plenty of <strong>UI toolkits</strong> to choose from, but none them had everything that I needed...yeah, you've heard that before. Often enough though, it <em>is</em> the reason individual's attempts to create products that fill gaps, and is why I started working on Vuetify.
        section-text.mb-0 But now you are the one searching for that perfect framework, and Vuetify is another on a list of many, vying for your attention. While my opinion will be subjective, I will try to outline features that I believe will be valuable to you and/or your organization.
        section-header.title
          v-icon.mr-3.purple--text brush
          span Design principles
        section-text Vuetify is developed exactly according to Material Design spec. Every component is hand crafted to bring you the best possible UI tools to your next great app. The development doesn't stop at the core components outlined in Google's spec. Through the support of community members and sponsors, additional components will be designed and made available for everyone to enjoy.
        section-header.title
          v-icon.mr-3.teal--text people
          span Vibrant community
        section-text Developing with Vuetify means you will never be alone. Get help immediately from the dev team and other community members in the official Discord server. Get the opportunity to speak with talented individuals that want you to succeed in your efforts.
        section-header.title
          v-icon.mr-3.primary--text apps
          span Comparison to other Frameworks
        section-text Vuetify is not the only Vue material framework out there. Plenty of other talented developers have created some amazing applications under the guise of Google's Material Design spec. Each offer their own unique take on development and process, however, here are a few things that set Vuetify apart:
        v-layout(row wrap)
          v-flex(xs12 sm8)
            v-subheader What you get:
            v-list(style="max-width: 400px;" dense).transparent
              v-list-tile(
                tag="div"
                :ripple="false"
                v-for="(c, $index) in comparisons"
                :key="c.title"
                avatar
                :class="{ 'grey lighten-3': $index % 2 === 0 }"
              )
                v-list-tile-content
                  v-list-tile-title.subheading {{ c.title }}
                v-list-tile-action
                  v-icon(dark).green--text check
          v-flex(xs12 sm4).layout.align-center.justify-center
            img(
              src="https://s3.amazonaws.com/vuetify-docs/images/logos/logo.svg"
              alt="Vuetify"
              width="150px"
            ).my-5
      v-flex(xs12 md3)
        v-badge(color="error" overlap)
          v-icon(slot="badge" left overlap class="white--text") favorite
          v-card(
            flat
            tile
          ).red--after
            v-list
              v-list-tile(avatar tag="div")
                v-list-tile-avatar
                  v-avatar
                    img(src="https://s3.amazonaws.com/vuetify-docs/images/john.jpg")
                v-list-tile-content
                  v-list-tile-title John Leider
                  v-list-tile-sub-title Author of Vuetify.js
                v-list-tile-action
                  v-tooltip(left)
                    v-btn(
                      icon
                      href="mailto:john@vuetifyjs.com"
                      slot="activator"
                    )
                      v-icon mail
                    span Contact Me
            v-card-text I am extremely humbled that you have considered using Vuetify as your next UI Framework. A lot of care has went into forging the perfect setup for taking any idea from conception to production. I look forward to you joining the Vuetify community and am excited to see what incredible interfaces you create!
            v-card-text.text-xs-right <em>&mdash;John Leider</em>

    div.text-xs-center.my-5
      em Still have questions?<br>
      v-btn(flat outline round color="success" href="https://chat.vuetifyjs.com" target="_blank") Ask the Community
</template>

<script>
  export default {
    data: () => ({
      comparisons: [
        { title: 'Semantic Helper Components' },
        { title: 'SSR and PWA Support' },
        { title: '8 Vue-CLI templates' },
        { title: 'Chat Support' },
        { title: 'Modular Component Transition System' },
        { title: 'Blazing Fast Framework' },
        { title: 'A La Carte components' }
      ],
      list: [
        { check: true, text: 'Good for SEO' },
        { check: true, text: 'Well Documented' },
        { check: true, text: 'Active Community' },
        { check: true, text: 'Free' }
      ],
      philosophies: [
        {
          img: '/vuetify_semantic.svg',
          title: 'Semantic toolkit',
          caption: `Vuetify is built from the ground up to be semantic. Easy to learn, easy to remember&mdash;this means that whether you are developing your own application, or onboarding a new developer, Vuetify's <em>write-as-you-speak</em> components and properties make development a breeze.`
        },
        {
          img: '/vuetify_sizes.svg',
          title: 'Continuous updates',
          caption: `Vuetify has a consistent update cycle, allowing you to get your hands on bug fixes and enhancements more often. The development team is committed to providing you with the best experience you can have.`
        },
        {
          img: '/vuetify_cli.svg',
          title: 'Amazing support',
          caption: `When you run into a roadblock, you need assistance immediately. Vuetify offers chat support in our growing community on Discord.`
        }
      ]
    })
  }
</script>

<style lang="stylus">
  #why-vuetify
    .section-text
      margin-bottom: 24px !important

  .pillars
    .flex
      display: flex
      flex: 1 1 auto
      flex-direction: column

      .card
        flex: 1 1 auto
</style>
