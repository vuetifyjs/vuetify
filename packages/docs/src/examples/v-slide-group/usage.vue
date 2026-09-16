<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="[]"
  >
    <v-sheet class="mx-auto" max-width="600">
      <v-slide-group v-bind="props">
        <v-slide-group-item
          v-for="n in 25"
          :key="n"
          v-slot="{ isSelected, toggle }"
        >
          <v-btn
            :color="isSelected ? 'primary' : undefined"
            class="ma-2"
            rounded
            @click="toggle"
          >
            Option {{ n }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <template v-slot:configuration>
      <v-select
        v-model="snap"
        :items="['start', 'center', 'end']"
        label="Scroll snap"
        clearable
      ></v-select>

      <v-select
        v-model="distance"
        :items="['100%', '50%', '200px']"
        label="Scroll distance"
      ></v-select>

      <v-select
        v-model="arrows"
        :items="arrowOptions"
        label="Show arrows"
        clearable
      ></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-slide-group'
  const model = ref('default')
  const arrows = ref(true)
  const arrowOptions = [
    { title: 'auto (when overflowing)', value: true },
    'always',
    'desktop',
    'mobile',
    'never',
  ]
  const snap = ref(null)
  const distance = ref('100%')

  const props = computed(() => {
    return {
      'show-arrows': arrows.value ?? undefined,
      'scroll-snap': snap.value ?? undefined,
      'scroll-distance': distance.value === '100%' ? undefined : distance.value,
    }
  })

  const slots = `
  <v-slide-group-item
    v-for="n in 25"
    :key="n"
    v-slot="{ isSelected, toggle }"
  >
    <v-btn
      :color="isSelected ? 'primary' : undefined"
      class="ma-2"
      rounded
      @click="toggle"
    >
      Option {{ n }}
    </v-btn>
  </v-slide-group-item>
`

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots}</${name}>`
  })
</script>
