import { createHead } from '@unhead/vue/client'
import { createApp } from './main'

const { app, router } = createApp(createHead())

router.isReady().then(() => app.mount('#app'))
