<script>
  export default {
    title: 'VGrid',
  }
</script>

<story name="asDefault">
  <v-row no-gutters>
    <v-col
      v-for="n in 3"
      :key="n"
      cols="12"
      sm="4"
    >
      One of three columns
    </v-col>
  </v-row>
</story>
