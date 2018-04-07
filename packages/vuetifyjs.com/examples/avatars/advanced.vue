<template>
  <v-layout justify-center column>
    <v-subheader>Today</v-subheader>
    <v-expansion-panel popout>
      <v-expansion-panel-content
        hide-actions
        v-for="(message, i) in messages"
        :key="i"
      >
        <v-layout align-center row spacer slot="header">
          <v-flex xs4 sm2 md1>
            <v-avatar
              size="36px"
              slot="activator"
            >
              <img
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                alt=""
                v-if="message.avatar"
              >
              <v-icon :color="message.color" v-else>{{ message.icon }}</v-icon>
            </v-avatar>
          </v-flex>
          <v-flex sm5 md3 hidden-xs-only>
            <strong v-html="message.name"></strong>
            <span class="grey--text" v-if="message.total">&nbsp;({{ message.total }})</span>
          </v-flex>
          <v-flex no-wrap xs5 sm3>
            <v-chip
              label
              small
              :color="`${message.color} lighten-4`"
              class="ml-0"
              v-if="message.new"
            >{{ message.new }} new</v-chip>
            <strong v-html="message.title"></strong>
          </v-flex>
          <v-flex
            class="grey--text"
            ellipsis
            hidden-sm-and-down
            v-if="message.excerpt"
          >
            &mdash;
            {{ message.excerpt }}
          </v-flex>
        </v-layout>
        <v-card>
          <v-divider></v-divider>
          <v-card-text v-text="lorem"></v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'John Leider',
          title: 'Welcome to Vuetify.js!',
          excerpt: 'Thank you for joining our community...'
        },
        {
          color: 'red',
          icon: 'people',
          name: 'Social',
          new: 1,
          total: 3,
          title: 'Twitter'
        },
        {
          color: 'teal',
          icon: 'local_offer',
          name: 'Promos',
          new: 2,
          total: 4,
          title: 'Shop your way',
          exceprt: 'New deals available, Join Today'
        }
      ],
      lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'
    })
  }
</script>
