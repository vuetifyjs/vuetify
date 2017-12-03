<template>
  <v-app id="example-3">
    <v-navigation-drawer permanent floating light>
      <v-card class="ma-4">
        <v-list dense class="py-0">
          <v-list-item v-for="item in items" :key="item">
            <v-list-tile>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <v-toolbar class="purple" light>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <!--v-router-->
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>
