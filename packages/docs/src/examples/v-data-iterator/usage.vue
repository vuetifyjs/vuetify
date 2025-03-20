<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div>
      <v-data-iterator
        v-bind="props"
        :items="cards"
        :page="page"
        items-per-page="3"
      >
        <template v-slot:default="{ items }">
          <template
            v-for="(item, i) in items"
            :key="i"
          >
            <v-card v-bind="item.raw"></v-card>

            <br>
          </template>
        </template>

        <template v-slot:footer="{ pageCount }">
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
        </template>
      </v-data-iterator>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-data-iterator'
  const model = ref('default')
  const options = []

  const page = ref(1)

  const cards = Array.from({ length: 15 }, (k, v) => ({
    title: `Item ${v + 1}`,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
  }))

  const props = computed(() => {
    return {
      items: 'items',
      page: 'page',
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:default="{ items }">
    <template
      v-for="(item, i) in items"
      :key="i"
    >
      <v-card v-bind="item.raw"></v-card>

      <br>
    </template>
  </template>
`
  })

  const code = computed(() => {
    return `<v-data-iterator${propsToString(props.value, ['items'])}>${slots.value}</v-data-iterator>`
  })

  const script = computed(() => {
    return `<script setup>
  import { ref } from 'vue'

  const page = ref(1)
  const items = Array.from({ length: 15 }, (k, v) => ({
    title: 'Item ' + v + 1,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
  }))
<` + '/script>'
  })
</script>
