<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        :force-expand="forceExpand"
        expand-on-hover
        permanent
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra@gmail.com"
            title="Sandra Adams"
          >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px">
        <div class="d-flex justify-end">

          <v-switch v-model="forceExpand" class="mx-5" label="Toggle Force Expand"></v-switch>
        </div>

      </v-main>
    </v-layout>
  </v-card>
</template>

  <script setup>
  import { ref } from 'vue'

  const forceExpand = ref(true)

  </script>

<script>
  export default {
    data () {
      return {
        forceExpand: true,
      }
    },
  }
</script>
