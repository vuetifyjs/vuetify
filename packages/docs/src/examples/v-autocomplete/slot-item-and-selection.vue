<template>
  <v-card
    color="blue-grey-darken-1"
    dark
    :loading="isUpdating"
  >
    <template v-slot:progress>
      <v-progress-linear
        absolute
        color="green-lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img height="200" src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg">
      <v-row>
        <v-col class="text-end" cols="12">
          <v-menu location="bottom start" origin="overlap" transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text"></v-btn>
            </template>
            <v-list>
              <v-list-item @click="isUpdating = true">
                <v-list-item-action>
                  <v-icon>mdi-cog</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>Update</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
        <v-row
          class="pa-4"
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h3 class="text-h5">
              {{ name }}
            </h3>
            <span class="text-grey-lighten-1">{{ title }}</span>
          </v-col>
        </v-row>
      </v-row>
    </v-img>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :disabled="isUpdating"
              filled
              color="blue-grey-lighten-2"
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="title"
              :disabled="isUpdating"
              filled
              color="blue-grey-lighten-2"
              label="Title"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="friends"
              :disabled="isUpdating"
              :items="people"
              filled
              chips
              closable-chips
              color="blue-grey-lighten-2"
              label="Select"
              item-title="name"
              item-value="name"
              multiple
            >
              <template v-slot:chip="{ props, item }">
                <v-chip
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :text="item.raw.name"
                ></v-chip>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
                <v-list-item
                  v-else
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :title="item.raw.name"
                  :subtitle="item.raw.group"
                ></v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-switch
        v-model="autoUpdate"
        :disabled="isUpdating"
        class="mt-0"
        color="green-lighten-2"
        hide-details
        label="Auto Update"
      ></v-switch>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="autoUpdate"
        :loading="isUpdating"
        color="blue-grey-lighten-3"
        prepend-icon="mdi-update"
        @click="isUpdating = true"
      >
        Update Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data () {
      const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }

      return {
        autoUpdate: true,
        friends: ['Sandra Adams', 'Britta Holt'],
        isUpdating: false,
        name: 'Midnight Crew',
        people: [
          { header: 'Group 1' },
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
          { divider: true },
          { header: 'Group 2' },
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
          { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
        ],
        title: 'The summer breeze',
      }
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {
      remove (item) {
        const index = this.friends.indexOf(item.name)
        if (index >= 0) this.friends.splice(index, 1)
      },
    },
  }
</script>
