<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-stepper v-bind="props" v-model="step">
      <template v-slot:item.1>
        <v-card title="Step One" flat>
          <template v-slot:text>
            <div @dblclick="onDblClick" @blur="onBlur">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
            </div>
          </template>
        </v-card>
      </template>

      <template v-slot:item.2>
        <v-card title="Step Two" flat>
          <template v-slot:text>
            <div @dblclick="onDblClick" @blur="onBlur">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!
            </div>
          </template>
        </v-card>
      </template>

      <template v-slot:item.3>
        <v-card title="Step Three" flat>
          <template v-slot:text>
            <div @dblclick="onDblClick" @blur="onBlur">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!

              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </template>
        </v-card>
      </template>
    </v-stepper>

    <template v-slot:configuration>
      <v-text-field v-model="prev" label="Previous text"></v-text-field>

      <v-text-field v-model="next" label="Next text"></v-text-field>

      <v-checkbox v-model="hideActions" label="Hide actions"></v-checkbox>

      <v-checkbox v-model="editable" label="Editable"></v-checkbox>

      <v-checkbox v-model="altLabels" label="Alt labels"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-stepper'
  const model = ref('default')
  const options = []
  const step = ref(1)
  const altLabels = ref(false)
  const editable = ref(false)
  const hideActions = ref(false)
  const prev = ref('$vuetify.stepper.prev')
  const next = ref('$vuetify.stepper.next')

  function onDblClick (e) {
    e.target.contentEditable = true
  }

  function onBlur (e) {
    e.target.contentEditable = false
  }

  const props = computed(() => {
    return {
      'alt-labels': altLabels.value || undefined,
      editable: editable.value || undefined,
      'hide-actions': hideActions.value || undefined,
      'prev-text': prev.value.startsWith('$vuetify') ? undefined : prev.value,
      'next-text': next.value.startsWith('$vuetify') ? undefined : next.value,
      items: [
        'Step 1',
        'Step 2',
        'Step 3',
      ],
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:item.1>
    <v-card title="Step One" flat>...</v-card>
  </template>

  <template v-slot:item.2>
    <v-card title="Step Two" flat>...</v-card>
  </template>

  <template v-slot:item.3>
    <v-card title="Step Three" flat>...</v-card>
  </template>
`
  })

  const code = computed(() => {
    return `<v-stepper${propsToString(props.value)}>${slots.value}</v-stepper>`
  })
</script>
