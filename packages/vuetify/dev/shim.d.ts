import { VCol } from 'vuetify/src/components/VGrid/VCol'
import { VRow } from 'vuetify/src/components/VGrid/VRow'

declare module 'vue' {
  export interface GlobalComponents {
    VCol: typeof VCol;
    VRow: typeof VRow;
  }
}
