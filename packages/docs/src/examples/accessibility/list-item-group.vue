<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :disabled="item.disabled"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Item 1',
          disabled: false,
        },
        {
          text: 'Item 2',
          disabled: true,
        },
        {
          text: 'Item 3',
          disabled: false,
        },
      ],
      model: 0,
    }),
  }
</script>
