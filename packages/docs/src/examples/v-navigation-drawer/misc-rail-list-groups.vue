<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        permanent
        rail
        @update:rail="collapsed = $event"
      >
        <v-list v-model:opened="opened" density="compact" nav>
          <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" value="dashboard"></v-list-item>

          <v-list-group value="Users">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                prepend-icon="mdi-account-circle"
                title="Users"
              ></v-list-item>
            </template>

            <v-list-item
              v-for="([title, icon], i) in users"
              :key="i"
              :prepend-icon="icon"
              :title="title"
              :value="title"
            ></v-list-item>
          </v-list-group>

          <v-list-item prepend-icon="mdi-cog" title="Settings" value="settings"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="height: 300px"></v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const collapsed = ref(true)
  const expandedGroups = ref([])
  const opened = computed({
    get: () => collapsed.value ? [] : expandedGroups.value,
    set: value => {
      expandedGroups.value = value
    },
  })

  const users = [
    ['Management', 'mdi-account-multiple-outline'],
    ['Roles', 'mdi-shield-account-outline'],
    ['Invitations', 'mdi-email-outline'],
  ]
</script>

<script>
  export default {
    data: () => ({
      collapsed: true,
      expandedGroups: [],
      users: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Roles', 'mdi-shield-account-outline'],
        ['Invitations', 'mdi-email-outline'],
      ],
    }),

    computed: {
      opened: {
        get () {
          return this.collapsed ? [] : this.expandedGroups
        },
        set (value) {
          this.expandedGroups = value
        },
      },
    },
  }
</script>
