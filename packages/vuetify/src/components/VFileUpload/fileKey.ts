let nextId = 0
const fileIds = new WeakMap<File, number>()

export function getFileKey (file: File): number {
  let id = fileIds.get(file)
  if (id == null) {
    id = ++nextId
    fileIds.set(file, id)
  }
  return id
}
