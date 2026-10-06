// Types
import type { InjectionKey, Ref, ShallowRef } from 'vue'

export interface AudioProvide {
  media: ShallowRef<HTMLAudioElement | undefined>
  playing: Ref<boolean>
  playHooks: Set<() => void>
  graph?: { audioContext: AudioContext, analyser: AnalyserNode, buffer: Float32Array<ArrayBuffer> }
}

export const VAudioSymbol: InjectionKey<AudioProvide> = Symbol.for('vuetify:v-audio')
