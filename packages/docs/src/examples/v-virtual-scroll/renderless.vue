<template>
  <v-app>
    <v-container>
      <v-table height="300">
        <thead>
          <tr>
            <th>Col 1</th>
            <th>Col 2</th>
          </tr>
        </thead>
        <tbody>
          <v-virtual-scroll :items="items" renderless>
            <template v-slot:default="{ item, itemRef }">
              <tr :ref="itemRef">
                <td>{{ item }}</td>
                <td>{{ item }}</td>
              </tr>
            </template>
          </v-virtual-scroll>
        </tbody>
      </v-table>
    </v-container>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref(Array(1000).fill('col'))
</script>

<script>
  export default {
    data: () => ({
      items: Array(1000).fill('col'),
    }),
  }
</script>
