<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-sheet
      :width="stacked ? 96 : 220"
      class="mx-auto py-4"
      rounded="lg"
      border
    >
      <v-navigation-btn
        v-for="item in items"
        :key="item.value"
        :active="active === item.value"
        :active-icon="activeIcon ? item.activeIcon : undefined"
        :icon="item.icon"
        :labels="stacked ? labels : undefined"
        :stacked="stacked"
        :text="item.text"
        @click="active = item.value"
      ></v-navigation-btn>
    </v-sheet>

    <template v-slot:configuration>
      <v-select
        v-if="stacked"
        v-model="labels"
        :items="['always', 'selected', 'none']"
        label="Labels"
      ></v-select>

      <v-checkbox v-model="activeIcon" label="Active icon"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-navigation-btn'
  const model = shallowRef('default')
  const options = ['stacked']
  const active = shallowRef('inbox')
  const activeIcon = shallowRef(true)
  const labels = shallowRef('always')
  const stacked = computed(() => model.value === 'stacked')

  const items = [
    { value: 'inbox', text: 'Inbox', icon: 'mdi-inbox-outline', activeIcon: 'mdi-inbox' },
    { value: 'starred', text: 'Starred', icon: 'mdi-star-outline', activeIcon: 'mdi-star' },
    { value: 'sent', text: 'Sent', icon: 'mdi-send-outline', activeIcon: 'mdi-send' },
  ]

  const props = computed(() => {
    return {
      'active-icon': activeIcon.value ? 'mdi-inbox' : undefined,
      icon: 'mdi-inbox-outline',
      labels: stacked.value && labels.value !== 'always' ? labels.value : undefined,
      stacked: stacked.value || undefined,
      text: 'Inbox',
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}></${name}>`
  })
</script>
