// Types
import type { InjectionKey, Ref, ShallowRef } from 'vue'

export interface AudioGraph {
  audioContext: AudioContext
  analyser: AnalyserNode
  buffer: Float32Array<ArrayBuffer>
}

export interface AudioProvide {
  media: ShallowRef<HTMLAudioElement | undefined>
  playing: Ref<boolean>
  playHooks: Set<() => void>
  graph?: AudioGraph
}

export const VAudioSymbol: InjectionKey<AudioProvide> = Symbol.for('vuetify:v-audio')
