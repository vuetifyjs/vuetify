<template>
  <v-card
    :loading="isUpdating"
    class="mx-auto"
    color="blue-grey-darken-1"
    max-width="420"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="green-lighten-3"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
      cover
    >
      <v-row class="pa-3">
        <v-col cols="12">
          <v-menu
            location="bottom start"
            origin="overlap"
            transition="slide-y-transition"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                density="comfortable"
                icon="mdi-dots-vertical"
                variant="tonal"
              ></v-btn>
            </template>

            <v-list :lines="false">
              <v-list-item
                title="Update"
                @click="isUpdating = true"
              ></v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-row>
          <v-col class="text-center">
            <h3 class="text-h5">{{ name }}</h3>

            <span class="text-grey-lighten-1">{{ title }}</span>
          </v-col>
        </v-row>
      </v-row>
    </v-img>

    <v-form>
      <v-container>
        <v-row density="comfortable">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :disabled="isUpdating"
              color="blue-grey-lighten-2"
              label="Name"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="title"
              :disabled="isUpdating"
              color="blue-grey-lighten-2"
              label="Title"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              v-model="friends"
              :disabled="isUpdating"
              :items="people"
              color="blue-grey-lighten-2"
              item-title="name"
              item-value="name"
              label="Select"
              chips
              closable-chips
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
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item.raw.avatar"
                  :subtitle="item.raw.group"
                  :title="item.raw.name"
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
        class="mt-0 ms-2"
        color="green-lighten-2"
        density="compact"
        label="Auto Update"
        hide-details
      ></v-switch>

      <v-spacer></v-spacer>

      <v-btn
        :disabled="autoUpdate"
        :loading="isUpdating"
        :variant="isUpdating ? 'tonal' : undefined"
        color="blue-grey-lighten-3"
        prepend-icon="mdi-update"
        @click="isUpdating = true"
      >
        Update Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const srcs = {
    1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
  }
  const people = [
    { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
    { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
    { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
    { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
    { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
    { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
    { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
    { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
  ]

  const autoUpdate = ref(true)
  const friends = ref(['Sandra Adams', 'Britta Holt'])
  const isUpdating = ref(false)
  const name = ref('Midnight Crew')
  const title = ref('The summer breeze')

  let timeout = -1
  watch(isUpdating, val => {
    clearTimeout(timeout)
    if (val) {
      timeout = setTimeout(() => (isUpdating.value = false), 3000)
    }
  })
</script>

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
          // TODO: https://github.com/vuetifyjs/vuetify/issues/15721
          // { header: 'Group 1' },
          { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
          { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
          { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
          { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
          // { divider: true },
          // { header: 'Group 2' },
          { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
          { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
          { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
          { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
        ],
        title: 'The summer breeze',
        timeout: null,
      }
    },

    watch: {
      isUpdating (val) {
        clearTimeout(this.timeout)

        if (val) {
          this.timeout = setTimeout(() => (this.isUpdating = false), 3000)
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
