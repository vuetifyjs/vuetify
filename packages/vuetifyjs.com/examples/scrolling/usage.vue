<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h3 class="headline" ref="radio">Target</h3>
        <v-radio-group v-model="type" row>
          <v-radio label="Number" value="number"></v-radio>
          <v-radio label="Selector" value="selector"></v-radio>
          <v-radio label="DOMElement" value="element"></v-radio>
        </v-radio-group>
        <v-text-field v-if="type === 'number'" type="number" label="Number" v-model="number"></v-text-field>
        <v-text-field v-if="type === 'selector'" label="Selector" v-model="selector"></v-text-field>
        <v-select v-if="type === 'element'" label="DOMElement" v-model="selected" :items="elements"></v-select>
      </v-flex>
      <v-flex xs12>
        <h3 class="headline">Options</h3>
        <v-select v-model="easing" label="Easing" :items="easings"></v-select>
        <v-slider min="0" max="1000" v-model="duration" label="Duration" thumb-label></v-slider>
        <v-slider min="-500" max="500" v-model="offset" label="Offset" thumb-label></v-slider>
      </v-flex>
      <v-flex>
        <v-btn color="primary" @click="$vuetify.goTo(target, options)" block ref="button">scroll</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import * as easings from 'vuetify/es5/util/easing-patterns'

  export default {
    data () {
      return {
        type: 'number',
        number: 9999,
        selector: '#first',
        selected: 'Button',
        elements: ['Button', 'Radio group'],
        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',
        easings: Object.keys(easings)
      }
    },
    computed: {
      target () {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
      options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing
        }
      },
      element () {
        if (this.selected === 'Button') return this.$refs.button
        else if (this.selected === 'Radio group') return this.$refs.radio
      }
    }
  }
</script>
