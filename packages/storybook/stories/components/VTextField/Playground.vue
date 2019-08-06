<story
  group="VTextField"
  name="playground"
  knobs="{
    value: {
      default: text('Text', 'Initial text')
    }
  }"
  parameters="{
    eyes: {
      include: false
    }
  }"
>
  <div id="playground">
    <v-text-field label="Foo" :value="value"></v-text-field>
  </div>
</story>
