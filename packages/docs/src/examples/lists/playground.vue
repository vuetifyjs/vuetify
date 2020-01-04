<template>
  <v-row align="center">
    <v-row justify="space-around">
      <v-switch v-model="disabled" class="ma-2" label="Disabled"></v-switch>
      <v-switch v-model="dense" class="ma-2" label="Dense"></v-switch>
      <v-switch v-model="twoLine" class="ma-2" label="Two-line"></v-switch>
      <v-switch v-model="threeLine" class="ma-2" label="Three-line"></v-switch>
      <v-switch v-model="shaped" class="ma-2" label="Shaped"></v-switch>
      <v-switch v-model="flat" class="ma-2" label="Flat"></v-switch>
      <v-switch v-model="subheader" class="ma-2" label="Subheader"></v-switch>
      <v-switch v-model="inactive" class="ma-2" label="Inactive"></v-switch>
      <v-switch v-model="subGroup" class="ma-2" label="Sub-group"></v-switch>
      <v-switch v-model="nav" class="ma-2" label="Nav"></v-switch>
      <v-switch v-model="avatar" class="ma-2" label="Avatar"></v-switch>
      <v-switch v-model="rounded" class="ma-2" label="Rounded"></v-switch>
    </v-row>
    <v-card
      class="mx-auto"
      max-width="400"
      tile
    >
      <v-list
        :disabled="disabled"
        :dense="dense"
        :two-line="twoLine"
        :three-line="threeLine"
        :shaped="shaped"
        :flat="flat"
        :subheader="subheader"
        :sub-group="subGroup"
        :nav="nav"
        :avatar="avatar"
        :rounded="rounded"
      >
        <v-subheader>REPORTS</v-subheader>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :inactive="inactive"
          >
            <v-list-item-avatar v-if="avatar">
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle v-if="twoLine || threeLine" v-html="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      item: 5,
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
      disabled: false,
      dense: false,
      twoLine: false,
      threeLine: false,
      shaped: false,
      flat: false,
      subheader: false,
      inactive: false,
      subGroup: false,
      nav: false,
      avatar: false,
      rounded: false,
    }),
  }
</script>
