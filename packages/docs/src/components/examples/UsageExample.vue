<template>
  <div>
    <v-toolbar
      border="b"
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
    </v-toolbar>

    <v-sheet
      class="px-12 d-flex align-center"
      min-height="300"
      rounded="0"
    >
      <div class="flex-grow-1 px-12">
        <slot />
      </div>
    </v-sheet>
  </div>
</template>

<script>
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

    computed: {
      model: {
        get () {
          return this.modelValue
        },
        set (val) {
          this.$emit('update:modelValue', val)
        },
      },
    },
  }
</script>
