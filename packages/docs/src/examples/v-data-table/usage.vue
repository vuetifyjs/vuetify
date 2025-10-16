<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div>
      <v-data-table
        v-bind="props"
        :items="items"
      ></v-data-table>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-data-table'
  const model = ref('default')
  const options = ['Hide header', 'Hide footer', 'Hide both']

  const items = [
    {
      name: 'African Elephant',
      species: 'Loxodonta africana',
      diet: 'Herbivore',
      habitat: 'Savanna, Forests',
    },
    {
      name: 'Lion',
      species: 'Panthera leo',
      diet: 'Carnivore',
      habitat: 'Savanna, Grassland',
    },
    {
      name: 'Giraffe',
      species: 'Giraffa camelopardalis',
      diet: 'Herbivore',
      habitat: 'Savanna, Grassland',
    },
    {
      name: 'Zebra',
      species: 'Equus quagga',
      diet: 'Herbivore',
      habitat: 'Savanna, Grassland',
    },
    {
      name: 'Hippopotamus',
      species: 'Hippopotamus amphibius',
      diet: 'Herbivore',
      habitat: 'Riverbanks, Lakes',
    },
    {
      name: 'Meerkat',
      species: 'Suricata suricatta',
      diet: 'Omnivore',
      habitat: 'Desert, Savanna',
    },
    {
      name: 'Hyena',
      species: 'Crocuta crocuta',
      diet: 'Carnivore',
      habitat: 'Savanna, Grassland',
    },
    {
      name: 'Zebra',
      species: 'Equus quagga',
      diet: 'Herbivore',
      habitat: 'Savanna, Grassland',
    },
    {
      name: 'Ostrich',
      species: 'Struthio camelus',
      diet: 'Omnivore',
      habitat: 'Savanna, Grassland',
    },
    {
      name: 'Cheetah',
      species: 'Acinonyx jubatus',
      diet: 'Carnivore',
      habitat: 'Savanna, Grassland',
    },
  ]

  const props = computed(() => {
    return {
      items: 'items',
      'hide-default-header': ['Hide both', 'Hide header'].includes(model.value) || undefined,
      'hide-default-footer': ['Hide both', 'Hide footer'].includes(model.value) || undefined,
    }
  })

  // eslint doesn't like the script tag inside the template
  const script = computed(() => {
    return `<script setup>
  const items = [
    {
      name: 'African Elephant',
      species: 'Loxodonta africana',
      diet: 'Herbivore',
      habitat: 'Savanna, Forests',
    },
    // ... more items
  ]
<` + '/script>'
  })

  const code = computed(() => {
    return `<v-data-table${propsToString(props.value, ['items'])}></v-data-table>`
  })
</script>
