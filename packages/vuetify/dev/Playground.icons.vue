<template>
  <div>
    <v-icon @click="foo" :type="type" :size="currentSize" :disabled="disabled" :icon="icon" aria-foo="asd" />
    <div class="box">
      <button @click="type = 'material-icons'">material icons</button>
      <button @click="type = 'mdi'">mdi</button>
      <button @click="type = 'mdi-svg'">mdi-svg</button>
      <button @click="type = 'fa5'">fa5</button>
      <button @click="type = 'hero'">custom</button>
    </div>
    <input type="checkbox" :checked="disabled === true" @change="disabled = !disabled" /><label>disabled</label>
    <input :value="icon" @change="e => icon = e.target.value">
    <button @click="toggle">toggle</button>
    <div class="box">
      <div v-for="size in sizes" :key="size">
        <input type="radio" :checked="currentSize === size" @change="currentSize = size" /><label>{{ size }}</label>
      </div>
    </div>
    <v-icon type="mdi" icon="mdi-arrow-up"/>
  </div>
</template>

<script>
  import { ref } from 'vue'

  export default {
    name: 'Playground',
    setup () {
      const currentSize = ref('default')
      const disabled = ref(false)
      const dense = ref(false)
      const icon = ref('$close')
      const bar = () => console.log('click')
      const foo = ref(bar)
      const type = ref('mdi')

      return {
        icon,
        dense,
        foo,
        currentSize,
        sizes: ['x-small', 'small', 'default', 'large', 'x-large', '120px', '10rem', '28pt'],
        disabled,
        toggle: () => {
          foo.value = foo.value ? null : bar
        },
        type,
      }
    },
  }
</script>

<style>
  .box {
    width: 150px;
    height: 150px;
    display: inline-block;
  }

  .alpha {
    color: rgba(var(--v-theme-primary),0.5)
  }
</style>

<style>
.box {
  border: 2px solid black;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
