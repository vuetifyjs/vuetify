// Types
type FileSelection = { file: File, path: string }

export function useFileDrop () {
  async function handleDrop (e: DragEvent) {
    const result: File[] = []

    const entries = [...e.dataTransfer?.items ?? []]
      .filter(x => x.kind === 'file')
      .map(x => x.webkitGetAsEntry())
      .filter(Boolean)

    if (entries.length) {
      for (const entry of entries) {
        const files = await traverseFileTree(entry!, appendIfDirectory('.', entry!))
        result.push(...files.map(x => x.file))
      }
    } else {
      result.push(...[...e.dataTransfer?.files ?? []])
    }

    return result
  }

  return { handleDrop }
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
