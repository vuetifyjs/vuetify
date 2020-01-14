<template>
  <div>
    <v-app-bar
      :src="attrs.image ? 'https://picsum.photos/1920/1080?random' : ''"
      absolute
      dark
      scroll-target="#usage-example"
      v-bind="attrs"
    >
      <v-app-bar-nav-icon />

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-responsive height="1000">&nbsp;</v-responsive>
  </div>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],

    data: () => ({
      alert: true,
    }),
  }
</script>
