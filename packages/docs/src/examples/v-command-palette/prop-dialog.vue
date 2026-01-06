<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Default (Center)</v-card-title>
          <v-card-text>
            <v-btn block @click="dialogs.default = true">
              Open Default
            </v-btn>
          </v-card-text>
        </v-card>

        <v-command-palette
          v-model="dialogs.default"
          :items="items"
          max-width="500"
          placeholder="Search..."
          @click:item="handleClick"
        ></v-command-palette>
      </v-col>

      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Parent Activator</v-card-title>
          <v-card-text>
            <v-btn block>
              Click to Open
              <v-command-palette
                v-model="dialogs.activator"
                :items="items"
                activator="parent"
                max-width="500"
                placeholder="Search..."
                @click:item="handleClick"
              ></v-command-palette>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Custom Dialog Props</v-card-title>
          <v-card-text>
            <v-btn block @click="dialogs.custom = true">
              Open Persistent (No Close on Click Outside)
            </v-btn>
          </v-card-text>
        </v-card>

        <v-command-palette
          v-model="dialogs.custom"
          :items="items"
          max-width="500"
          placeholder="Search..."
          persistent
          @click:item="handleClick"
        ></v-command-palette>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :timeout="2000">
      Selected: {{ selectedItem }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dialogs = ref({
    default: false,
    activator: false,
    custom: false,
  })

  const snackbar = ref(false)
  const selectedItem = ref('')

  const items = [
    {
      title: 'New File',
      subtitle: 'Create a new file',
      prependIcon: 'mdi-file-plus',
      value: 'new-file',
    },
    {
      title: 'New Folder',
      subtitle: 'Create a new folder',
      prependIcon: 'mdi-folder-plus',
      value: 'new-folder',
    },
    {
      title: 'Open',
      subtitle: 'Open a file or project',
      prependIcon: 'mdi-folder-open',
      value: 'open',
    },
    {
      type: 'divider',
    },
    {
      type: 'subheader',
      title: 'Recent',
    },
    {
      title: 'Project Alpha',
      subtitle: 'Last opened 2 hours ago',
      prependIcon: 'mdi-folder',
      value: 'project-alpha',
    },
    {
      title: 'Project Beta',
      subtitle: 'Last opened yesterday',
      prependIcon: 'mdi-folder',
      value: 'project-beta',
    },
  ]

  function handleClick (item) {
    selectedItem.value = item.title
    snackbar.value = true
  }
</script>

<script>
  export default {
    data () {
      return {
        dialogs: {
          default: false,
          activator: false,
          custom: false,
        },
        snackbar: false,
        selectedItem: '',
        items: [
          {
            title: 'New File',
            subtitle: 'Create a new file',
            prependIcon: 'mdi-file-plus',
            value: 'new-file',
          },
          {
            title: 'New Folder',
            subtitle: 'Create a new folder',
            prependIcon: 'mdi-folder-plus',
            value: 'new-folder',
          },
          {
            title: 'Open',
            subtitle: 'Open a file or project',
            prependIcon: 'mdi-folder-open',
            value: 'open',
          },
          {
            type: 'divider',
          },
          {
            type: 'subheader',
            title: 'Recent',
          },
          {
            title: 'Project Alpha',
            subtitle: 'Last opened 2 hours ago',
            prependIcon: 'mdi-folder',
            value: 'project-alpha',
          },
          {
            title: 'Project Beta',
            subtitle: 'Last opened yesterday',
            prependIcon: 'mdi-folder',
            value: 'project-beta',
          },
        ],
      }
    },
    methods: {
      handleClick (item) {
        this.selectedItem = item.title
        this.snackbar = true
      },
    },
  }
</script>
