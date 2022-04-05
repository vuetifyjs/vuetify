<template>

  <v-list>
    <a :href="fullLink" target="_blank">
      <v-list-item class="grey lighten-3">
        <v-list-item-avatar style="border-radius: 0;">
          <v-img :src="require('../../assets/vue-school.png')" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ title }}</v-list-item-title>
          <v-list-item-subtitle><slot /></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </a>
  </v-list>
</template>

<script>
  export default {
    name: 'VueSchoolLink',
    props: {
      title: { type: String, default: 'Vue School - Industry Leading Video Training' },
      href: { type: String, required: true },
    },
    computed: {
      fullLink () {
        return `${this.href}?utm_source=Vuetify&utm_medium=banner&utm_campaign=sponsorship&friend=s-vuetify`
      },
    },
  }
</script>
<style scoped>
a:hover{
  text-decoration:none;
}
</style>
