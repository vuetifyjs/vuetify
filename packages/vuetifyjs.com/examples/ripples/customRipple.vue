<template>
  <v-layout row>
    <v-flex xs12>
      <v-card ripple height="300" :color="color.value"
              @click.native="color=colors[color.next]">
        <div class="title white--text pl-3 pt-3"> {{color.value}}</div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        color: {value:'red', next:1},
        colors:[
          {value:'red', next:1},
          {value:'pink', next:2},
          {value:'purple', next:3},
          {value:'deep-purple', next:4},
          {value:'indigo', next:5},
          {value:'blue', next:6},
          {value:'light-blue', next:7},
          {value:'cyan', next:8},
          {value:'teal', next:9},
          {value:'green', next:10},
          {value:'light-green', next:11},
          {value:'lime', next:12},
          {value:'yellow', next:13},
          {value:'amber', next:14},
          {value:'orange', next:15},
          {value:'deep-orange', next:16},
          {value:'brown', next:17},
          {value:'blue-grey', next:18},
          {value:'grey', next:0},
        ]
      }
    }
  }
</script>
