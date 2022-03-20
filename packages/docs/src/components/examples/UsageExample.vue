<template>
  <div>
    <v-toolbar
      border="b"
      class="ps-1 pe-2"
      density="compact"
      flat
    >
      <v-btn-toggle
        v-model="model"
        class="py-2"
        mandatory
        color="primary"
      >
        <v-btn value="default" rounded="tl">Default</v-btn>

        <v-btn
          v-for="(option, i) in options"
          :key="i"
          :value="option"
        >
          {{ option }}
        </v-btn>
      </v-btn-toggle>

      <v-tooltip anchor="bottom">
        <template #activator="{ props }">
          <v-btn
            icon="mdi-code-tags"
            class="mr-1 text-medium-emphasis"
            density="comfortable"
            v-bind="props"
            @click="code = !code"
          />
        </template>

        <span>Show code</span>
      </v-tooltip>

      <v-tooltip anchor="bottom">
        <template #activator="{ props }">
          <v-btn
            icon="mdi-tune"
            class="mr-1 text-medium-emphasis"
            density="comfortable"
            v-bind="props"
            @click="tune = !tune"
          />
        </template>

        <span>Configure more options</span>
      </v-tooltip>
    </v-toolbar>

    <v-layout>
      <v-main>
        <v-sheet
          class="pa-14 d-flex align-center"
          min-height="250"
          rounded="0"
        >
          <div class="flex-fill">
            <slot />
          </div>
        </v-sheet>
      </v-main>

      <v-navigation-drawer
        :model-value="tune"
        permanent
        name="tune"
        position="right"
        width="200"
      >
        <v-list>
          <v-list-subheader>Configuration</v-list-subheader>

          <v-list-item title="Coming soon" />
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <v-expand-transition>
      <div v-if="code">
        <div class="pa-3">
          <app-markup :code="formatAttributes" />
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
  // Utilities
  import { computed, ref } from 'vue'

  export default {
    name: 'UsageExample',

    props: {
      name: String,
      options: {
        type: Array,
        default: () => ([]),
      },
      modelValue: {
        type: String,
        required: true,
      },
    },

    emits: {
      'update:modelValue': val => val,
    },

    setup (props, { emit }) {
      const tune = ref(false)
      const code = ref(false)
      const model = computed({
        get () {
          return props.modelValue
        },
        set (val) {
          emit('update:modelValue', val)
        },
      })

      const formatAttributes = computed(() => {
        let attributeArray = []
        if (props.options.includes(model.value)) {
          attributeArray.push(model.value)
        }

        attributeArray = attributeArray.sort()
        const indent = attributeArray.length ? '\r  ' : ''
        const tail = `${attributeArray.length ? '\r' : ''}></${props.name}>`

        return `<${props.name}${indent}${attributeArray.join('\r  ')}${tail}`
      })

      return {
        formatAttributes,
        model,
        tune,
        code,
      }
    },
  }
</script>
