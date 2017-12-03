<template lang="pug">
  doc-view
    v-layout(row wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Be a part of something bigger!
          dd(slot="desc") Vuetify is made possible by an amazing community that submits issues, creates pull requests, and provides invaluable feedback. It is our job to enable you to create amazing applications, and a lot of the time, you come across something that is can be made better. Maybe you find a bug, or you have an idea for additional functionality. That's great! It's as easy as cloning the Vuetify repository to get started working in a development environment.
      ad
    section#reporting-issues
      section-header Reporting issues
      secion-text
        ul
          li The issue list of this repo is exclusively for bug reports and feature requests. Non-conforming issues will be closed immediately.
          ul
            li For general questions, please join the <a href="https://chat.vuetifyjs.com" target="_blank" rel="noopener">community</a>.
          li Try to search for your issue, it may have been answered.
          li See if the error is reproduceable with the latest version.
          li If reproduceable, please provide a simple <a href="https://codepen.io/johnjleider/pen/bgJOrX" target="_blank" rel="noopener">codepen</a> or repository that can be cloned to produce the expected behavior.
    section#pull-requests
      section-header Pull requests
      section-text
        ul
          li All PR's should be made to the <code>dev</code> branch of Vuetify.
          li For changes and feature requests, please include an example of what you are trying to solve and an example of the markup
          li For bug fixes please reference the issue # that the PR resolves

    section#local-dev
      section-header Setup local dev
      section-text Vuetify contains a local dev environment that you can bootup to test new features, functionality, and components. First, clone the repository:
      markup(lang="cli")
        |git clone git@github.com:vuetifyjs/vuetify
      section-text After cloned, use your cli to <kbd>cd vuetify</kbd>. Once in the directory, you will need to create a new file in the <kbd>dev</kbd> directory called <code>Playground.vue</code>. An example has been provided, <code>Playground.example.vue</code>, which you can rename. Keep in mind, this file is not tracked by version control. Once copied, go back to your cli and run:
      markup(lang="cli")
        |git checkout dev
        |npm install // or yarn
        |npm run dev
      section-text This will start a local node server located at <a href="http://localhost:8080">http://localhost:8080</a>. Now from your code editor you can easily load components and test whatever you want at lightning speed! 
</template>