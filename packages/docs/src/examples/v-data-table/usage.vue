<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-data-table
        v-bind="props"
        :items="items"
      ></v-data-table>
    </div>
  </usage-example>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-data-table'
  const model = ref('default')
  const options = []

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
      ':items': 'items',
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
    return `<template>\n  <v-data-table${propsToString(props.value, 2)}></v-data-table>\n</template>\n\n${script.value}`
  })
</script>
