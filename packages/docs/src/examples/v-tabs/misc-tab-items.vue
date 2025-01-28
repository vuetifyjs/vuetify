<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
        :title="item.tab"
      ></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item
        v-for="item in items"
        :key="item.tab"
      >
        <v-card flat>
          <v-card-text>{{ item.content }}</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = [
    { tab: 'One', content: 'Tab 1 Content' },
    { tab: 'Two', content: 'Tab 2 Content' },
    { tab: 'Three', content: 'Tab 3 Content' },
    { tab: 'Four', content: 'Tab 4 Content' },
    { tab: 'Five', content: 'Tab 5 Content' },
    { tab: 'Six', content: 'Tab 6 Content' },
    { tab: 'Seven', content: 'Tab 7 Content' },
    { tab: 'Eight', content: 'Tab 8 Content' },
    { tab: 'Nine', content: 'Tab 9 Content' },
    { tab: 'Ten', content: 'Tab 10 Content' },
  ]

  const tab = ref(null)
</script>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
        ],
      }
    },
  }
</script>
