<script>
  export default {
    title: 'VAlert',
  }
</script>

<story name="withType">
  <div>
    <v-alert type="success">success</v-alert>
    <v-alert type="info">info</v-alert>
    <v-alert type="warning">warning</v-alert>
    <v-alert type="error">error</v-alert>
  </div>
</story>

<story name="withDense">
  <v-alert type="info" dense>dense</v-alert>
</story>
