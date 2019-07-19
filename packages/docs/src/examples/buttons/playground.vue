<template>
  <v-layout
    justify-center
    wrap
  >
    <v-btn
      v-bind="options"
      class="mt-12"
    >
      <v-icon
        v-if="hasIcon"
        :left="type.includes('icon-left')"
        :right="type.includes('icon-right')"
      >
        mdi-plus
      </v-icon>
      <span v-else>
        {{ text }}
      </span>
      <template
        v-if="customLoad"
        v-slot:loader
      >
        Loading...
      </template>
    </v-btn>

    <v-flex xs12>
      <v-container grid-list-md>
        <v-slider
          v-model="minWidth"
          label="Min width"
          min="10"
          max="300"
        ></v-slider>
        <v-slider
          v-model="minHeight"
          label="Min height"
          min="10"
          max="300"
        ></v-slider>
        <v-slider
          v-model="elevation"
          label="Elevation"
          min="0"
          max="24"
          clearable
        ></v-slider>
        <v-layout wrap>
          <v-flex
            xs12
            md4
          >
            <v-select
              v-model="size"
              :items="sizes"
              label="Size"
            ></v-select>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-select
              v-model="color"
              :items="colors"
              label="Color"
            ></v-select>
          </v-flex>
          <v-flex
            xs12
            md4
          >
            <v-select
              v-model="type"
              :items="types"
              label="Type"
              multiple
            ></v-select>
          </v-flex>
          <v-flex xs4>
            <v-checkbox
              v-model="disabled"
              label="Disabled"
            ></v-checkbox>
          </v-flex>
          <v-flex xs4>
            <v-checkbox
              v-model="loading"
              label="Loading"
            ></v-checkbox>
          </v-flex>
          <v-flex xs4>
            <v-checkbox
              v-model="customLoad"
              label="Custom loader"
            ></v-checkbox>
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
      types: ['block', 'depressed', 'fab', 'outlined', 'rounded', 'text'],
      text: 'Customize me',
      minWidth: undefined,
      minHeight: undefined,
      elevation: 2,
      loading: false,
      customLoad: false,
      disabled: false,
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
          [this.size]: true,
          elevation: this.elevation,
          loading: this.loading,
          disabled: this.disabled,
        }

        if (this.type) {
          for (const type of this.type) options[type] = true
        }

        if (this.minWidth) {
          options.minWidth = this.minWidth
        }
        if (this.minHeight) {
          options.minHeight = this.minHeight
        }

        return options
      },
      colors () {
        return Object.keys(this.$vuetify.theme.themes.dark)
      },
    },
    watch: {
      type (val) {
        if (
          val.includes('depressed') ||
          val.includes('outlined') ||
          val.includes('text')
        ) {
          this.elevation = 0
        } else {
          this.elevation = 2
        }
      },
    },
  }
</script>
