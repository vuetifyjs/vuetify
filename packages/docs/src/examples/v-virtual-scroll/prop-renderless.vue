<template>
  <v-container>
    <p class="text-body-small opacity-80">
      💡 The <code>height</code> prop should be a plain number,
      or a value with units like <code>px</code> and <code>vh</code>, but not the percentage
      (<code>%</code>).
    </p>

    <v-table height="300" fixed-header>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Icon</th>
        </tr>
      </thead>
      <tbody>
        <v-virtual-scroll :items="items" renderless>
          <template v-slot:default="{ item, index, itemRef }">
            <tr :ref="itemRef">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.icon }}</td>
            </tr>
          </template>
        </v-virtual-scroll>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
  const icons = ['🍄', '🌼', '🌵', '🌲', '🌰', '🍅', '🍊', '🍓']
  const items = Array.from({ length: 1000 }, (k, v) => ({
    name: `Item #${String(v + 1).padStart(4, '0')}`,
    icon: icons[v % icons.length],
  }))
</script>

<script>
  const icons = ['🍄', '🌼', '🌵', '🌲', '🌰', '🍅', '🍊', '🍓']
  export default {
    data: () => ({
      items: Array.from({ length: 1000 }, (k, v) => ({
        name: `Item #${String(v + 1).padStart(4, '0')}`,
        icon: icons[v % icons.length],
      })),
    }),
  }
</script>
