<template>
  <div>
    <v-toolbar
      border="b"
      class="ps-2 pe-2"
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
          class="text-uppercase"
        >
          {{ option.label ?? option.prop.replace('-', ' ') }}
        </v-btn>
      </v-btn-toggle>

      <v-spacer />

      <v-tooltip location="bottom">
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

      <v-tooltip location="bottom">
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
        location="right"
        width="200"
      >
        <v-list>
          <v-list-subheader>Configuration</v-list-subheader>

          <div class="px-2">
            <v-defaults-provider
              :defaults="{
                global: { density: 'compact' }
              }"
            >
              <template v-for="(option, i) of tuneOptions" :key="i">
                <v-checkbox-btn
                  v-if="option.type === 'checkbox'"
                  v-model="tuneModel[option.prop]"
                  :input-value="option.value"
                  :label="option.label ?? option.prop.replace('-', ' ')"
                  class="text-capitalize mb-2"
                />

                <v-text-field
                  v-if="option.type === 'text-field'"
                  v-model="tuneModel[option.prop]"
                  :label="option.label ?? option.prop.replace('-', ' ')"
                  class="text-capitalize mb-4"
                  hide-details
                />

                <v-select
                  v-if="option.type === 'select'"
                  v-model="tuneModel[option.prop]"
                  :items="option.items"
                  :label="option.label ?? option.prop.replace('-', ' ')"
                  class="text-capitalize mb-4"
                  hide-details
                />
              </template>
            </v-defaults-provider>
          </div>
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
        type: [Object, String],
        default: () => ({}),
        required: true,
      },
      tuneOptions: {
        type: Object,
        default: () => ({}),
      },
      tuneValue: {
        type: Object,
        default: () => ({}),
      },
    },

    emits: {
      'update:modelValue': val => val,
      'update:tuneValue': val => val,
    },

    setup (props, { emit }) {
      const tune = ref(true)
      const code = ref(true)
      const model = computed({
        get () {
          return props.modelValue
        },
        set (val) {
          emit('update:modelValue', val)
        },
      })
      const tuneModel = computed({
        get () {
          return props.tuneValue
        },
        set (val) {
          emit('update:tuneValue', val)
        },
      })

      const formatAttributes = computed(() => {
        let attributeArray = []

        for (const toption of props.tuneOptions) {
          const val = tuneModel.value[toption.prop]

          if (!val) continue

          if (toption.type === 'checkbox') {
            attributeArray.push(
              toption.value
                ? `${toption.prop}="${toption.value}"`
                : toption.prop
            )
          }

          if (toption.type === 'text-field') {
            attributeArray.push(`${toption.prop}="${val}"`)
          }

          if (toption.type === 'select') {
            if (val === 'default') continue

            attributeArray.push(
              `${toption.prop}="${val}"`
            )
          }
        }

        const option = props.options.find(o => {
          return o.value === model.value.value
        })

        if (option) {
          attributeArray.push(
            option.value
              ? `${option.prop}="${option.value}"`
              : option.prop
          )
        }

        attributeArray = attributeArray.sort()
        const indent = attributeArray.length ? '\r  ' : ''
        const tail = `${attributeArray.length ? '\r' : ''}></${props.name}>`

        return `<${props.name}${indent}${attributeArray.join('\r  ')}${tail}`
      })

      return {
        formatAttributes,
        model,
        tuneModel,
        tune,
        code,
      }
    },
  }
</script>
