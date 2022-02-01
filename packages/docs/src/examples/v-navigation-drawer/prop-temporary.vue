<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
          title="John Leider"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px">
        <v-container class="fill-height">
          <v-row
            align="center"
            justify="center"
          >
            <v-btn
              color="primary"
              @click.stop="drawer = !drawer"
            >
              Toggle
            </v-btn>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        drawer: null,
      }
    },
  }
</script>
