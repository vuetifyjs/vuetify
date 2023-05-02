// eslint-disable-next-line no-restricted-imports
import { defineComponent } from 'vue'

import { VFileInput } from '@/components/VFileInput/VFileInput'

export const VFileInputTest = defineComponent({
  setup () {
    return () => (
      <div>
        <h1>JSX</h1>
        <VFileInput
          accept="image/png, image/jpeg"
          style={ false }
        ></VFileInput>
      </div>
    )
  },
})

export default VFileInputTest
