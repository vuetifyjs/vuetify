<template>
  <div class="text-center">
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-radio-group row wrap>
          <v-switch v-model="circle" label="Toggle circle" class="mx-4"></v-switch>
          <v-switch v-model="disabled" label="Toggle disabled" class="mx-4"></v-switch>
        </v-radio-group>
      </v-col>

      <v-row>
        <v-col cols="12" md="3">
          <v-select
            v-model="prevIcon"
            class="mx-4"
            :items="prevIcons"
            label="prev-icon"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="nextIcon"
            class="mx-4"
            :items="nextIcons"
            label="next-icon"
          ></v-select>
        </v-col>

        <v-col cols="12" md="3">
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
        </v-col>

        <v-col cols="12" md="3">
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
        </v-col>
      </v-row>
    </v-row>

    <v-pagination
      v-model="page"
      :circle="circle"
      :disabled="disabled"
      :length="length"
      :next-icon="nextIcon"
      :prev-icon="prevIcon"
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
        nextIcon: 'navigate_next',
        nextIcons: ['mdi-chevron-right', 'mdi-arrow-right', 'mdi-menu-right'],
        prevIcon: 'navigate_before',
        prevIcons: ['mdi-chevron-left', 'mdi-arrow-left', 'mdi-menu-left'],
        page: 1,
        totalVisible: 10,
      }
    },
  }
</script>
