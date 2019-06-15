<template>
  <div class="text-xs-center">
    <v-layout column justify-center align-center>
      <v-flex xs12>
        <v-radio-group row wrap>
          <v-switch v-model="circle" label="Toggle circle" class="mx-3"></v-switch>
          <v-switch v-model="disabled" label="Toggle disabled" class="mx-3"></v-switch>
          <v-switch v-model="nextIcon" label="Toggle next-icon" class="mx-3"></v-switch>
          <v-switch v-model="prevIcon" label="Toggle prev-icon" class="mx-3"></v-switch>
        </v-radio-group>
      </v-flex>

      <v-flex>
        <v-text-field
          v-model="length"
          label="Pagination length"
          max="25"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-flex>

      <v-flex>
        <v-text-field
          v-model="totalVisible"
          label="Total visible"
          max="25"
          min="1"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-pagination
      v-model="page"
      :circle="circle"
      :disabled="disabled"
      :length="length"
      :next-icon=" nextIcon ? 'mdi-menu-right' : 'navigate-next' "
      :prev-icon=" prevIcon ? 'mdi-menu-left' : 'navigate-before' "
      :page="page"
      :total-visible="totalVisible"
    ></v-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        circle: false,
        disabled: false,
        length: 10,
        nextIcon: false,
        prevIcon: false,
        page: 1,
        totalVisible: 10,
      }
    },
  }
</script>
