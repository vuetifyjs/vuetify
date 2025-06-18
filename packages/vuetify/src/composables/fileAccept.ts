// Utilities
import { computed } from 'vue'
import { propsFactory } from '@/util'

export interface FileAcceptProps {
  strictAccept?: string
}

export type FileAcceptFilterResult = {
  accepted: File[]
  rejected: File[]
}

// Composables
export const makeFileAcceptProps = propsFactory({
  strictAccept: String,
}, 'file-accept')

export function useFileAccept (props: FileAcceptProps) {
  const fileFilter = computed(() => props.strictAccept ? createFilter(props.strictAccept) : null)

  function filterAccepted (files: File[]): FileAcceptFilterResult {
    if (fileFilter.value) {
      const accepted = files.filter(fileFilter.value)
      return {
        accepted,
        rejected: files.filter(f => !accepted.includes(f)),
      }
    }
    return {
      accepted: files,
      rejected: [],
    }
  }

  return {
    filterAccepted,
  }
}

function createFilter (v: string): ((v: File) => boolean) {
  const types = v.split(',').map(x => x.trim().toLowerCase())
  const extensionsToMatch = types.filter(x => x.startsWith('.'))
  const wildcards = types.filter(x => x.endsWith('/*'))
  const typesToMatch = types.filter(x => !extensionsToMatch.includes(x) && !wildcards.includes(x))

  return (file: File): boolean => {
    const extension = file.name.split('.').at(-1)?.toLowerCase() ?? ''
    const typeGroup = file.type.split('/').at(0)?.toLowerCase() ?? ''
    return typesToMatch.includes(file.type) ||
      extensionsToMatch.includes(`.${extension}`) ||
      wildcards.includes(`${typeGroup}/*`)
  }
}
