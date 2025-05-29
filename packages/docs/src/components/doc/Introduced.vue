<template>
  <Alert type="success">
    <i18n-t keypath="feature-introduced-in">
      <AppLink :href="`/getting-started/release-notes/?version=v${props.version}`">
        {{ versionString }}
      </AppLink>
    </i18n-t>
  </Alert>
</template>

<script setup lang="ts">
  const props = defineProps<{
    version: string
  }>()

  const versionNameMap: Record<string, string> = {
    '3.0.0': 'Titan',
    '3.1.0': 'Valkyrie',
    '3.2.0': 'Orion',
    '3.3.0': 'Icarus',
    '3.4.0': 'Blackguard',
    '3.5.0': 'Polaris',
    '3.6.0': 'Nebula',
    '3.7.0': 'Odyssey',
    '3.8.0': 'Andromeda',
    '3.9.0': 'Zealot',
    '4.0.0': 'Revisionist',
  }

  const versionString = computed(() => {
    let str = `v${props.version}`
    const name = versionNameMap[props.version]
    if (name) str += ` (${name})`
    return str
  })
</script>
