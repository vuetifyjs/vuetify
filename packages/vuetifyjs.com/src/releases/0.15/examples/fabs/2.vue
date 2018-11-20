<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar class="light-blue" light extended>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-btn
            fab
            small
            class="cyan accent-2"
            bottom
            left
            absolute
            @click.native.stop="dialog = !dialog"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <v-toolbar-title slot="extension" class="white--text">My files</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>view_module</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line subheader>
          <v-subheader inset>Folders</v-subheader>
          <v-list-tile avatar v-for="item in items" v-bind:key="item.title" @click="">
            <v-list-tile-avatar>
              <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon class="grey--text text--lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider inset></v-divider>
          <v-subheader inset>Files</v-subheader>
          <v-list-tile v-for="item in items2" v-bind:key="item.title" @click="">
            <v-list-tile-avatar>
              <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon class="grey--text text--lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-dialog absolute v-model="dialog">
          <v-card>
           <v-card-text>
              <v-text-field label="File name"></v-text-field>
              <small class="grey--text">* This doesn't actually save.</small>
           </v-card-text>
           <v-card-actions>
             <v-spacer></v-spacer>
             <v-btn flat primary @click.native="dialog = false">Submit</v-btn>
           </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        items: [
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Photos', subtitle: 'Jan 9, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Recipes', subtitle: 'Jan 17, 2014' },
          { icon: 'folder', iconClass: 'grey lighten-1 white--text', title: 'Work', subtitle: 'Jan 28, 2014' }
        ],
        items2: [
          { icon: 'assignment', iconClass: 'blue white--text', title: 'Vacation itinerary', subtitle: 'Jan 20, 2014' },
          { icon: 'call_to_action', iconClass: 'amber white--text', title: 'Kitchen remodel', subtitle: 'Jan 10, 2014' },
        ]
      }
    }
  }
</script>
