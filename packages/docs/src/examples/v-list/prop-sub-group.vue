<template>
  <v-card
    class="mx-auto"
    width="300"
  >
    <v-list v-model:opened="open">
      <v-list-item prepend-icon="i-mdi:home" title="Home"></v-list-item>

      <v-list-group value="Users">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="i-mdi:account-circle"
            title="Users"
          ></v-list-item>
        </template>

        <v-list-group value="Admin">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Admin"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in admins"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>

        <v-list-group value="Actions">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="Actions"
            ></v-list-item>
          </template>

          <v-list-item
            v-for="([title, icon], i) in cruds"
            :key="i"
            :prepend-icon="icon"
            :title="title"
            :value="title"
          ></v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const open = ref(['Users'])

  const admins = [
    ['Management', 'i-mdi:account-multiple-outline'],
    ['Settings', 'i-mdi:cog-outline'],
  ]
  const cruds = [
    ['Create', 'i-mdi:plus-outline'],
    ['Read', 'i-mdi:file-outline'],
    ['Update', 'i-mdi:update'],
    ['Delete', 'i-mdi:delete'],
  ]
</script>

<script>
  export default {
    data: () => ({
      open: ['Users'],
      admins: [
        ['Management', 'i-mdi:account-multiple-outline'],
        ['Settings', 'i-mdi:cog-outline'],
      ],
      cruds: [
        ['Create', 'i-mdi:plus-outline'],
        ['Read', 'i-mdi:file-outline'],
        ['Update', 'i-mdi:update'],
        ['Delete', 'i-mdi:delete'],
      ],
    }),
  }
</script>
