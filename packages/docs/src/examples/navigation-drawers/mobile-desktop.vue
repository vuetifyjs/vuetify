<template>
<div id="app">
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
    >
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
  
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
  
            <v-list-tile-action>
              <v-btn
                icon
              >
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
  
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
  
        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-btn color="success" @click="toggleNav">Toggle Drawer</v-btn>
  </v-app>
</div>
</template>

<script>
export default{
data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      mini: this.$vuetify.breakpoint.lgAndUp,
      right: null
    }
  },
  computed: {
     isLarge(){
       return this.$vuetify.breakpoint.lgAndUp;
      }
   },
  methods:{
    toggleNav(){
      if(this.isLarge){
        this.drawer = true;
        this.mini = !this.mini;
      }
      else{
        this.mini = false;
        this.drawer = !this.drawer;
      }
    }
  }
}
</script>
