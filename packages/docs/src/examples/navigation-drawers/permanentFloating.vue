<template>
  <v-card
    class="pa-5"
    color="indigo"
    flat
  >
    <v-card class="d-inline-block elevation-12">
      <v-navigation-drawer
        floating
        permanent
        stateless
        value="true"
      >
        <v-list dense>
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
    </v-card>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' }
        ],
        right: null
      }
    }
  }
</script>
