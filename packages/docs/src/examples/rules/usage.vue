<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-form>
        <v-text-field
          label="Username"
          :rules="[rules.required(), rules.exclude([' '])]"
        ></v-text-field>
      </v-form>
    </div>
  </usage-example>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'
  import { useRules } from 'vuetify/labs/rules'

  const name = 'useRules'
  const model = ref('default')
  const options = []

  const rules = useRules()

  const props = computed(() => {
    return {
      label: 'Username',
      ':rules': '[rules.required(), rules.exclude([\' \'])]',
    }
  })

  // eslint doesn't like the script tag inside the template
  const script = computed(() => {
    return `<script setup>
  import { useRules } from 'vuetify/labs/rules'

  const rules = useRules()
<` + '/script>'
  })

  const code = computed(() => {
    return `<template>\n  <v-form>\n    <v-text-field${propsToString(props.value, 4)}></v-text-field>\n  </v-form>\n</template>\n\n${script.value}`
  })
</script>
