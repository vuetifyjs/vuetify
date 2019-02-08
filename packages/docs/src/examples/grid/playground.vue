<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <div class="resultContainer">
          <v-layout v-bind="layoutAttributes">
            <div class="item elevation-5"></div>
            <div class="item elevation-5"></div>
            <div class="item elevation-5"></div>
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs12>
        <v-layout row xs12 wrap>
          <v-flex xs12 md4>
            <v-radio-group v-model="alignment">
              <v-radio
                v-for="n in alignmentsAvailable"
                :key="n"
                :label="n === '' ? 'Nothing' : n"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 md4>
            <v-radio-group v-model="justify">
              <v-radio
                v-for="n in justifyAvailable"
                :key="n"
                :label="n === '' ? 'Nothing' : n"
                :value="n"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 md4>
            <v-layout column>
              <v-radio-group v-model="flexDirection">
                <v-checkbox
                  v-model="reverse"
                  label="reverse"
                  hide-details
                ></v-checkbox>
                <v-checkbox
                  v-model="fillHeight"
                  label="fill-height"
                  hide-details
                ></v-checkbox>
                <v-radio
                  v-for="n in flexDirectionAvailable"
                  :key="n"
                  :label="n === '' ? 'Nothing' : n"
                  :value="n"
                ></v-radio>
              </v-radio-group>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <h5>Output:</h5>
        <code>{{ formatAttributes(layoutAttributes) }}</code>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        alignmentsAvailable: ['align-center', 'align-end', 'align-space-around', 'align-space-between', 'align-start', ''],
        alignment: 'align-center',
        alignmentsContentAvailable: ['align-content-center', 'align-content-end', 'align-content-space-around', 'align-content-space-between', 'align-content-start', ''],
        justifyAvailable: ['justify-center', 'justify-end', 'justify-space-around', 'justify-space-between', 'justify-start', ''],
        justify: 'justify-center',
        reverse: false,
        flexDirectionAvailable: ['row', 'column', ''],
        flexDirection: 'row',
        fillHeight: true
      }
    },
    computed: {
      layoutAttributes () {
        return {
          [this.alignment]: true,
          [this.justify]: true,
          [this.flexDirection]: true,
          reverse: this.reverse,
          'fill-height': this.fillHeight
        }
      }
    },
    methods: {
      formatAttributes (attributes) {
        const attributeArray = []
        for (const Key in attributes) {
          if (!attributes.hasOwnProperty(Key) || Key === '' || attributes[Key] === false) continue
          attributeArray.push(Key.trim())
        }
        return `<v-layout ${attributeArray.join(' ')}/>`
      }
    }

  }
</script>

<style scoped>
  .resultContainer {
    height: 350px;
  }

  .item {
    min-height: 50px;
    min-width: 80px;
    margin: 10px;
  }
</style>
