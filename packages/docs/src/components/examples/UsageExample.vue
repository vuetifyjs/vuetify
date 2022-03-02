<template>
  <div>
    <v-toolbar
      border="b"
      class="px-2"
      density="compact"
      flat
    >
      <v-btn-toggle
        v-model="model"
        class="py-2"
        mandatory
      >
        <v-btn value="default">Default</v-btn>

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
          class="px-12 d-flex align-center"
          min-height="300"
          rounded="0"
        >
          <div class="flex-grow-1 px-12">
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

    <app-markup :code="formatAttributes" class="pt-0" />
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
      }
    },
  }
</script>
