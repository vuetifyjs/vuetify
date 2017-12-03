<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-subheader v-text="'Slots'"></v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              label="Select"
              v-bind:items="people"
              v-model="e11"
              item-text="name"
              item-value="name"
              multiple
              chips
              max-height="auto"
              autocomplete
            >
              <template slot="selection" scope="data">
                <v-chip
                  close
                  @input="data.parent.selectItem(data.item)"
                  :selected="data.selected"
                  class="chip--select-multi"
                  :key="JSON.stringify(data.item)"
                >
                  <v-avatar>
                    <img :src="data.item.avatar">
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template slot="item" scope="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-tile-content v-text="data.item"></v-list-tile-content>
                </template>
                <template v-else>
                  <v-list-tile-avatar>
                    <img v-bind:src="data.item.avatar"/>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="data.item.group"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </template>
            </v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      let srcs = {
        1: '/static/doc-images/lists/1.jpg',
        2: '/static/doc-images/lists/2.jpg',
        3: '/static/doc-images/lists/3.jpg',
        4: '/static/doc-images/lists/4.jpg',
        5: '/static/doc-images/lists/5.jpg'
      }

      return {
        e11: [],
        people: [
          { header: 'Group 1'},
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
          { divider: true },
          { header: 'Group 2'},
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
          { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] }
        ]
      }
    }
  }
</script>
