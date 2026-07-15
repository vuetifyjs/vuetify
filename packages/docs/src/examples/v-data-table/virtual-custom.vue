<template>
  <v-container>
    <v-chip-group v-model="selectedSize" class="mb-4" mandatory row>
      <v-chip
        v-for="size in sizes"
        :key="size"
        :value="size"
        color="primary"
        variant="outlined"
      >
        {{ size }} items
      </v-chip>
    </v-chip-group>

    <v-data-table-virtual
      :headers="headers"
      :items="items"
      height="400"
      item-key="id"
      fixed-header
    >
      <template v-slot:item="{ columns, internalItem, props, itemRef }">
        <tr v-bind="props" :ref="itemRef">
          <td v-for="column in columns" :key="column.key">
            {{ internalItem.raw[column.key] }}
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const sizes = [100, 400, 800]
  const selectedSize = ref(100)

  const headers = [
    { title: 'ID', value: 'id', sortable: true },
    { title: 'Title', value: 'title', sortable: true },
    { title: 'Name', value: 'name', sortable: true },
    { title: 'Email', value: 'email', sortable: true },
    { title: 'Role', value: 'role', sortable: true },
  ]

  const baseItems = [
    { title: 'Mr.', name: 'James Smith', email: 'james.smith@gmail.com', role: 'Owner' },
    { title: 'Ms.', name: 'Mary Johnson', email: 'mary.johnson@yahoo.com', role: 'Manager' },
    { title: 'Dr.', name: 'Robert Williams', email: 'robert.williams@outlook.com', role: 'Board Member' },
    { title: 'Mrs.', name: 'Patricia Brown', email: 'patricia.brown@hotmail.com', role: 'Developer' },
    { title: 'Mr.', name: 'John Davis', email: 'john.davis@gmail.com', role: 'Designer' },
    { title: 'Ms.', name: 'Jennifer Garcia', email: 'jennifer.garcia@yahoo.com', role: 'Manager' },
    { title: 'Mr.', name: 'Michael Miller', email: 'michael.miller@outlook.com', role: 'Owner' },
    { title: 'Mrs.', name: 'Linda Martinez', email: 'linda.martinez@hotmail.com', role: 'Developer' },
    { title: 'Dr.', name: 'William Rodriguez', email: 'william.rodriguez@gmail.com', role: 'Board Member' },
    { title: 'Ms.', name: 'Elizabeth Hernandez', email: 'elizabeth.hernandez@yahoo.com', role: 'Designer' },
    { title: 'Mr.', name: 'David Lopez', email: 'david.lopez@outlook.com', role: 'Manager' },
    { title: 'Mrs.', name: 'Barbara Gonzalez', email: 'barbara.gonzalez@hotmail.com', role: 'Owner' },
  ]

  const items = computed(() => {
    return Array.from({ length: selectedSize.value }).map((_, i) => {
      const base = baseItems[i % baseItems.length]
      return { id: i + 1, ...base }
    })
  })
</script>

<script>
  export default {
    data () {
      return {
        sizes: [100, 400, 800],
        selectedSize: 100,
        headers: [
          { title: 'ID', value: 'id', sortable: true },
          { title: 'Title', value: 'title', sortable: true },
          { title: 'Name', value: 'name', sortable: true },
          { title: 'Email', value: 'email', sortable: true },
          { title: 'Role', value: 'role', sortable: true },
        ],
        baseItems: [
          { title: 'Mr.', name: 'James Smith', email: 'james.smith@gmail.com', role: 'Owner' },
          { title: 'Ms.', name: 'Mary Johnson', email: 'mary.johnson@yahoo.com', role: 'Manager' },
          { title: 'Dr.', name: 'Robert Williams', email: 'robert.williams@outlook.com', role: 'Board Member' },
          { title: 'Mrs.', name: 'Patricia Brown', email: 'patricia.brown@hotmail.com', role: 'Developer' },
          { title: 'Mr.', name: 'John Davis', email: 'john.davis@gmail.com', role: 'Designer' },
          { title: 'Ms.', name: 'Jennifer Garcia', email: 'jennifer.garcia@yahoo.com', role: 'Manager' },
          { title: 'Mr.', name: 'Michael Miller', email: 'michael.miller@outlook.com', role: 'Owner' },
          { title: 'Mrs.', name: 'Linda Martinez', email: 'linda.martinez@hotmail.com', role: 'Developer' },
          { title: 'Dr.', name: 'William Rodriguez', email: 'william.rodriguez@gmail.com', role: 'Board Member' },
          { title: 'Ms.', name: 'Elizabeth Hernandez', email: 'elizabeth.hernandez@yahoo.com', role: 'Designer' },
          { title: 'Mr.', name: 'David Lopez', email: 'david.lopez@outlook.com', role: 'Manager' },
          { title: 'Mrs.', name: 'Barbara Gonzalez', email: 'barbara.gonzalez@hotmail.com', role: 'Owner' },
        ],
      }
    },

    computed: {
      items () {
        return Array.from({ length: this.selectedSize }).map((_, i) => {
          const base = this.baseItems[i % this.baseItems.length]
          return { id: i + 1, ...base }
        })
      },
    },
  }
</script>
