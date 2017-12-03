<template>
  <v-layout row wrap>
    <v-flex md12 lg4>
      <table class="table text-xs-left" style="width: 300px;">
        <tbody>
          <tr>
            <th>Original</th>
            <td>
              <strong>{{ picker || "No date" }}</strong>
            </td>
          </tr>
          <tr>
            <th>Formatted</th>
            <td>
              <strong>{{ formatted || "No date" }}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </v-flex>
    <v-flex md12 lg4>
      <v-date-picker
        v-model="picker"
        :date-format="date => new Date(date).toDateString()"
        :formatted-value.sync="formatted"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
        formatted: null
      }
    }
  }
</script>
