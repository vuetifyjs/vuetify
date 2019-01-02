<template>
  <v-layout
    justify-center
    wrap
  >
    <v-btn
      v-bind="options"
      class="mt-5"
      dark
    >
      <v-icon
        v-if="hasIcon"
        :left="type.includes('icon-left')"
        :right="type.includes('icon-right')"
      >
        mdi-plus
      </v-icon>
      <span v-else>{{ text }}</span>
    </v-btn>

    <v-flex xs12>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex
            xs12
            md4
          >
            <v-select
              :items="sizes"
              v-model="size"
              label="Size"
            ></v-select>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-select
              :items="colors"
              v-model="color"
              label="Color"
            ></v-select>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-select
              :items="types"
              v-model="type"
              label="Type"
              multiple
            ></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      color: 'primary',
      size: 'medium',
      sizes: ['x-small', 'small', 'medium', 'large', 'x-large'],
      type: [],
      types: ['block', 'depressed', 'fab', 'outline', 'round', 'text'],
      text: 'Customize me'
    }),

    computed: {
      hasIcon () {
        return Boolean(
          this.type.includes('fab') ||
            this.type.includes('icon-left') ||
            this.type.includes('icon-right')
        )
      },
      options () {
        const options = {
          color: this.color,
          [this.size]: true
        }

        if (this.type) {
          for (const type of this.type) options[type] = true
        }

        return options
      },
      colors () {
        return Object.keys(this.$vuetify.theme)
      }
    }
  }
</script>
