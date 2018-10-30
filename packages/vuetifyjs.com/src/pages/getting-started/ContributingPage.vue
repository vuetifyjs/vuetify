<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#under-construction
        v-alert(type="error" value="true")
          | The contributing section is currently under construction. Vuetify has moved to a mono repo for easier maintenance of packages as outlined in this <a href="https://github.com/vuetifyjs/vuetify/releases/tag/v1.3.4" target="blank">release</a>. If you would like to contribute in the mean time, please reach out to us in the <a href="https://community.vuetifyjs.com" class="white--text">community</a>.
</template>
