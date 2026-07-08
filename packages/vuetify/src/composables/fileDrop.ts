// Utilities
import { shallowRef } from 'vue'

// Types
type FileSelection = { file: File, path: string }

export interface FileDropOptions {
  isInteractive: () => boolean
  onDrop: (files: File[]) => void
}

export function useFileDrop (options?: FileDropOptions) {
  function getTransfer (e: DragEvent | ClipboardEvent): DataTransfer | null {
    return (e as DragEvent).dataTransfer ?? (e as ClipboardEvent).clipboardData ?? null
  }

  function hasFilesOrFolders (e: DragEvent | ClipboardEvent): boolean {
    const transfer = getTransfer(e)
    const entries = [...transfer?.items ?? []]
      .filter(x => x.kind === 'file')
      .map(x => x.webkitGetAsEntry())
      .filter(Boolean)

    return entries.length > 0 || [...transfer?.files ?? []].length > 0
  }

  function hasDraggedFiles (e: DragEvent): boolean {
    const types = [...getTransfer(e)?.types ?? []]
    return types.includes('Files') || hasFilesOrFolders(e)
  }

  const isDragging = shallowRef(false)

  function onDragover (e: DragEvent) {
    if (!options?.isInteractive() || !hasDraggedFiles(e)) return
    e.preventDefault()
    e.stopImmediatePropagation()
    isDragging.value = true
  }

  function onDragleave (e: DragEvent) {
    e.preventDefault()
    const container = e.currentTarget as HTMLElement
    if (!container.contains(e.relatedTarget as Node)) {
      isDragging.value = false
    }
  }

  async function onDrop (e: DragEvent) {
    e.preventDefault()
    e.stopImmediatePropagation()
    isDragging.value = false

    if (!options?.isInteractive() || !hasFilesOrFolders(e)) return

    options.onDrop(await handleDrop(e))
  }

  async function handleDrop (e: DragEvent | ClipboardEvent) {
    const transfer = getTransfer(e)
    const result: File[] = []

    const entries = [...transfer?.items ?? []]
      .filter(x => x.kind === 'file')
      .map(x => x.webkitGetAsEntry())
      .filter(Boolean)

    if (entries.length) {
      for (const entry of entries) {
        const files = await traverseFileTree(entry!, appendIfDirectory('.', entry!))
        result.push(...files.map(x => x.file))
      }
    } else {
      result.push(...[...transfer?.files ?? []])
    }

    return result
  }

  return {
    isDragging,
    handleDrop,
    hasFilesOrFolders,
    onDragover,
    onDragleave,
    onDrop,
  }
}

function traverseFileTree (item: FileSystemEntry, path = ''): Promise<FileSelection[]> {
  return new Promise<FileSelection[]>((resolve, reject) => {
    if (item.isFile) {
      const fileEntry = item as FileSystemFileEntry
      fileEntry.file((file: File) => resolve([{ file, path }]), reject)
    } else if (item.isDirectory) {
      const directoryReader = (item as FileSystemDirectoryEntry).createReader()
      directoryReader.readEntries(async entries => {
        const files = [] as FileSelection[]
        for (const entry of entries) {
          files.push(...(await traverseFileTree(entry, appendIfDirectory(path, entry))))
        }
        resolve(files)
      })
    }
  })
}

function appendIfDirectory (path: string, item: FileSystemEntry) {
  return item.isDirectory
    ? `${path}/${item.name}`
    : path
}
