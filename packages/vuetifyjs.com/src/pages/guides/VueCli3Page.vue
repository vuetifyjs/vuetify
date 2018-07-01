<template lang="pug">
  views-doc
    section#get-started
      helpers-section-head(value="Guides.VueCli3.getStartedHeader")
      helpers-section-text(value="Guides.VueCli3.getStartedText1")
      helpers-section-text(value="Guides.VueCli3.getStartedText2")
      helpers-section-text(value="Guides.VueCli3.getStartedText3")

      helpers-markup(lang="bash")
        | vue create my-app

      helpers-section-text(value="Guides.VueCli3.getStartedText4")
      helpers-section-text(value="Guides.VueCli3.getStartedText5")

      helpers-markup(lang="bash")
        | vue add vuetify

      helpers-section-text(value="Guides.VueCli3.getStartedText6")
</template>
