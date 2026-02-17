<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :options="options"
    :script="script"
    name="v-avatar"
  >
    <div>
      <v-confirm-edit v-model="value" v-bind="props">
        <template v-slot:default="{ model: proxyModel, actions }">
          <v-card
            class="mx-auto"
            max-width="320"
            title="Update Field"
          >
            <template v-slot:text>
              <v-text-field
                v-model="proxyModel.value"
                messages="Modify my value"
              ></v-text-field>
            </template>

            <template v-slot:actions>
              <v-spacer></v-spacer>

              <component :is="actions"></component>
            </template>
          </v-card>
        </template>
      </v-confirm-edit>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="okText" label="Ok text"></v-text-field>
      <v-text-field v-model="cancelText" label="Cancel text"></v-text-field>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const model = ref('default')
  const options = []
  const value = ref('Egg Plant')
  const okText = ref('Ok')
  const cancelText = ref('Cancel')

  const props = computed(() => {
    return {
      'ok-text': okText.value === 'Ok' ? undefined : okText.value,
      'cancel-text': cancelText.value === 'Cancel' ? undefined : cancelText.value,
      'v-model': 'model',
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:default="{ model: proxyModel, actions }">
    <v-card
      class="mx-auto"
      max-width="320"
      title="Update Field"
    >
      <template v-slot:text>
        <v-text-field
          v-model="proxyModel.value"
          messages="Modify my value"
        ></v-text-field>
      </template>

      <template v-slot:actions>
        <v-spacer></v-spacer>

        <component :is="actions"></component>
      </template>
    </v-card>
  </template>
`
  })

  const script = computed(() => {
    return `<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef('Egg plant')
<` + '/script>'
  })

  const code = computed(() => {
    return `<v-confirm-edit${propsToString(props.value)}>${slots.value}</v-confirm-edit>`
  })
</script>
