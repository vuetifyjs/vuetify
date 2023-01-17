<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-toolbar
      color="orange-lighten-1"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Message Board</v-toolbar-title>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list lines="two">
      <template v-for="(item, index) in items">
        <v-list-subheader
          v-if="item.header"
          :key="item.header"
          inset
        >
          {{ item.header }}
        </v-list-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          inset
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
          :prepend-avatar="item.avatar"
          ripple
        >
          <template v-slot:title>
            <div v-html="item.title"></div>
          </template>

          <template v-slot:subtitle>
            <div v-html="item.subtitle"></div>
          </template>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          header: 'Today',
        },
        { divider: true },
        {
          avatar: 'https://picsum.photos/250/300?image=660',
          title: 'Meeting @ Noon',
          subtitle: `<span class="font-weight-bold">Spike Lee</span> &mdash; I'll be in your neighborhood`,
        },
        {
          avatar: 'https://picsum.photos/250/300?image=821',
          title: 'Summer BBQ <span class="text-grey-lighten-1"></span>',
          subtitle: '<span class="font-weight-bold">to Operations support</span> &mdash; Wish I could come.',
        },
        {
          avatar: 'https://picsum.photos/250/300?image=783',
          title: 'Yes yes',
          subtitle: '<span class="font-weight-bold">Bella</span> &mdash; Do you have Paris recommendations',
        },
        {
          header: 'Yesterday',
        },
        { divider: true },
        {
          avatar: 'https://picsum.photos/250/300?image=1006',
          title: 'Dinner tonight?',
          subtitle: '<span class="font-weight-bold">LaToya</span> &mdash; Do you want to hang out?',
        },
        {
          avatar: 'https://picsum.photos/250/300?image=146',
          title: 'So long',
          subtitle: '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
        {
          header: 'Last Week',
        },
        { divider: true },
        {
          avatar: 'https://picsum.photos/250/300?image=1008',
          title: 'Breakfast?',
          subtitle: '<span class="font-weight-bold">LaToya</span> &mdash; Do you want to hang out?',
        },
        {
          avatar: 'https://picsum.photos/250/300?image=839',
          title: 'Winter Porridge <span class="text-grey-lighten-1"></span>',
          subtitle: '<span class="font-weight-bold">cc: Daniel</span> &mdash; Tell me more...',
        },
        {
          avatar: 'https://picsum.photos/250/300?image=145',
          title: 'Oui oui',
          subtitle: '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
      ],
    }),
  }
</script>
