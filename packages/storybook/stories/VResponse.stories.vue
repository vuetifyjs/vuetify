<script>
  export default {
    title: 'VResponsive'
  }
</script>

<story name="withAspect">
  <div style="max-height: 200px; max-width: 200px">
    <v-responsive :aspect-ratio="16/9" class="primary"></v-responsive>
    <v-responsive :aspect-ratio="1" class="secondary"></v-responsive>
  </div>
</story>
