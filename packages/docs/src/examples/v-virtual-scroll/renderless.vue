<template>
  <v-app>
    <v-container>
      <p class="text-caption text-grey">
        💡 The <code>height</code> prop accepts numbers (e.g. <code>300</code>),
        or units like <code>px</code> and <code>vh</code>, but not percentages
        (<code>%</code>).
      </p>

      <v-table height="300">
        <thead>
          <tr>
            <th>#</th>
            <th>Col 1</th>
            <th>Col 2</th>
          </tr>
        </thead>
        <tbody>
          <v-virtual-scroll :items="items" renderless>
            <template v-slot:default="{ item, index, itemRef }">
              <tr :ref="itemRef">
                <td>{{ index + 1 }}</td>
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
