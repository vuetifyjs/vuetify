<template>
  <v-navigation-drawer
    v-model="drawer"
    class="pb-0"
    floating
    hide-overlay
    stateless
    width="380"
  >
    <v-layout fill-height>
      <v-navigation-drawer
        dark
        mini-variant
        stateless
        value="true"
      >
        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>John Leider</v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  icon
                  @click.native.stop="mini = !mini"
                >
                  <v-icon>chevron_left</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-toolbar>

        <v-list class="pt-0" dense>
          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-list class="grow">
        <v-list-item
          v-for="link in links"
          :key="link"
          @click=""
        >
          <v-list-item-title v-text="link"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        links: ['Home', 'Contacts', 'Settings'],
        mini: true,
        right: null
      }
    }
  }
</script>
