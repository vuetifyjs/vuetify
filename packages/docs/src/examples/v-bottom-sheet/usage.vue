<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-bottom-sheet v-bind="props">
      <template v-slot:activator="{ props: activatorProps }">
        <div class="pa-2 text-center">
          <v-btn
            v-bind="activatorProps"
            size="x-large"
            text="Click Me"
          ></v-btn>
        </div>
      </template>

      <v-card
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis dolorem perspiciatis asperiores sed consectetur praesentium! Delectus et iure maxime eaque exercitationem!"
        title="Bottom Sheet"
      ></v-card>
    </v-bottom-sheet>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-bottom-sheet'
  const model = ref('default')
  const options = ['inset']

  const props = computed(() => {
    return {
      inset: model.value === 'inset' || undefined,
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:activator="{ props: activatorProps }">
    <v-btn v-bind="activatorProps" text="Click Me"></v-btn>
  </template>

  <v-card
    title="Bottom Sheet"
    text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis dolorem perspiciatis asperiores sed consectetur praesentium! Delectus et iure maxime eaque exercitationem!"
  ></v-card>
`
  })

  const code = computed(() => {
    return `<v-bottom-sheet${propsToString(props.value)}>${slots.value}</v-bottom-sheet>`
  })
</script>
