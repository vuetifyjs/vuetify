<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-pagination
        v-bind="props"
      ></v-pagination>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="showFirstLastPage"
        :items="[
          { title: 'true', value: true },
          'only-first',
        ]"
        label="Show first/last page"
        clearable
      ></v-select>

      <v-slider
        v-model="length"
        class="mt-2"
        label="Length"
        max="20"
        min="1"
      ></v-slider>

      <v-slider
        v-model="totalVisible"
        class="mt-2"
        label="Total visible"
        max="10"
        min="0"
        step="1"
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-pagination'
  const model = ref('default')
  const length = ref(4)
  const totalVisible = ref(0)
  const showFirstLastPage = ref()
  const options = []

  const props = computed(() => {
    return {
      length: length.value,
      'total-visible': totalVisible.value || undefined,
      'show-first-last-page': showFirstLastPage.value ?? undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-pagination${propsToString(props.value)}>${slots.value}</v-pagination>`
  })
</script>
