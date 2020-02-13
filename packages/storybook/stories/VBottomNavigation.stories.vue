<script>
  export default {
    title: 'VBottomNavigation',
  }
</script>

<story name="asDefault">
  <v-bottom-navigation>
    <v-btn value="recent">
      <span>Recent</span>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn value="favorites">
      <span>Favorites</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="nearby">
      <span>Nearby</span>
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
  </v-bottom-navigation>
</story>
