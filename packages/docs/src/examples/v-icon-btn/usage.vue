<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-icon-btn v-bind="props" v-ripple="ripple"></v-icon-btn>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'secondary', 'accent', 'error', 'warning', 'info', 'success']"
        label="Color"
        clearable
      ></v-select>

      <v-select
        v-model="size"
        :items="['x-small', 'small', 'default', 'large', 'x-large']"
        label="Size"
        clearable
      ></v-select>

      <v-select
        v-model="icon"
        :items="['$vuetify', 'mdi-lightning-bolt', 'mdi-account-outline', 'mdi-cog-outline', 'mdi-heart-outline']"
        :list-props="{ slim: true }"
        label="Icon"
      >
        <template v-slot:item="{ props: itemProps, item }">
          <v-list-item v-bind="itemProps" :prepend-icon="item.title"></v-list-item>
        </template>
      </v-select>

      <v-checkbox-btn v-model="loading" label="Loading"></v-checkbox-btn>

      <v-checkbox-btn v-model="hideOverlay" label="Hide overlay"></v-checkbox-btn>

      <v-checkbox-btn v-model="ripple" label="Ripple"></v-checkbox-btn>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const variants = ['outlined', 'tonal', 'flat', 'text', 'plain']
  const name = 'v-icon-btn'
  const model = shallowRef('default')
  const color = shallowRef()
  const hideOverlay = shallowRef(false)
  const icon = shallowRef('$vuetify')
  const ripple = shallowRef(false)
  const loading = shallowRef(false)
  const size = shallowRef('default')
  const options = [...variants]
  const props = computed(() => {
    return {
      color: color.value || undefined,
      'hide-overlay': hideOverlay.value || undefined,
      icon: icon.value || undefined,
      loading: loading.value || undefined,
      size: size.value !== 'default' ? size.value : undefined,
      variant: model.value !== 'default' ? model.value : undefined,
      'v-ripple': ripple.value || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
