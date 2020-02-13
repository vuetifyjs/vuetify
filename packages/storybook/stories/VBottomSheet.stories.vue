<script>
  export default {
    title: 'VBottomSheet',
  }
</script>

<story name="asDefault">
  <v-bottom-sheet :value="true">
    <v-sheet class="text-center" height="200px">
      This is a bottom sheet
    </v-sheet>
  </v-bottom-sheet>
</story>
