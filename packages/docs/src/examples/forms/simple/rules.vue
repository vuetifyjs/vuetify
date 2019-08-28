<template>
  <v-container>
    <v-row

      justify="space-between"
    >
      <v-col
        cols="12"
        md="4"
      >
        <v-form ref="form">
          <v-text-field
            v-model="model"
            :counter="max"
            :rules="rules"
            label="First name"
          ></v-text-field>
        </v-form>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-slider
          v-model="max"
          label="Max characters"
        >
        </v-slider>

        <v-checkbox
          v-model="allowSpaces"
          label="Allow spaces"
        ></v-checkbox>

        <v-text-field
          v-model="match"
          label="Value must match"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      allowSpaces: false,
      match: 'Foobar',
      max: 0,
      model: 'Foobar',
    }),

    computed: {
      rules () {
        const rules = []

        if (this.max) {
          const rule =
            v => (v || '').length <= this.max ||
              `A maximum of ${this.max} characters is allowed`

          rules.push(rule)
        }

        if (!this.allowSpaces) {
          const rule =
            v => (v || '').indexOf(' ') < 0 ||
              'No spaces are allowed'

          rules.push(rule)
        }

        if (this.match) {
          const rule =
            v => (!!v && v) === this.match ||
              'Values do not match'

          rules.push(rule)
        }

        return rules
      },
    },

    watch: {
      match: 'validateField',
      max: 'validateField',
      model: 'validateField',
    },

    methods: {
      validateField () {
        this.$refs.form.validate()
      },
    },
  }
</script>
