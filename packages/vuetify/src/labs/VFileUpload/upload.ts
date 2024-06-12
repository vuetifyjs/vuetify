// Utilities
import { computed, ref } from 'vue'

interface Options {
  name: string
  url: string
  method: 'POST' | 'PUT' | 'PATCH'
  headers?: Record<string, string>
  withCredentials?: boolean

  onError?: (e: Error) => void
  onProcess?: (file: File, e: ProgressEvent) => void
}

export interface FileItem {
  file: File
  progress: number
  state?: 'aborted' | 'complete' | 'uploading'
  xhr?: XMLHttpRequest
}

const useUpload = (options: Options) => {
  const uploading = ref(false)
  const uploadMap = ref<WeakMap<File, FileItem>>(new WeakMap())

  const uploadFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const { name, url, method, headers } = options
      const xhr = new XMLHttpRequest()

      if (headers) {
        Object.keys(headers).forEach(key => {
          if (headers[key] !== null) {
            xhr.setRequestHeader(key, headers[key])
          }
        })
      }

      const formData = new FormData()
      formData.append(name, file)

      xhr.onabort = () => {
        if (uploadMap.value.has(file)) {
          const item = uploadMap.value.get(file)
          if (item?.state === 'uploading') {
            item.state = 'aborted'
          }
        }
        // warning
        reject(new Error('Aborted'))
      }
      xhr.onerror = e => {
        reject(e)
      }
      xhr.upload.addEventListener('progress', e => {
        if (uploadMap.value.has(file)) {
          const item = uploadMap.value.get(file)
          if (item) {
            item.progress = Math.floor(e.loaded / e.total * 100)
          }
        }
        options.onProcess?.(file, e)
      })
      xhr.onload = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (uploadMap.value.has(file)) {
              const item = uploadMap.value.get(file)
              if (item) {
                item.state = 'complete'
              }
            }
            resolve(this.responseText || this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }
      }
      if (options.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true
      }
      xhr.open(method, url, true)
      xhr.send(formData)

      uploadMap.value.set(file, {
        file,
        progress: 0,
        state: 'uploading',
        xhr,
      })
    })
  }

  const abort = (file: File) => {
    if (uploadMap.value.has(file)) {
      const item = uploadMap.value.get(file)
      if (item) {
        item.xhr?.abort()
      }
    }
  }

  const remove = (file: File) => {
    if (uploadMap.value.has(file)) {
      const item = uploadMap.value.get(file)
      if (item?.state === 'uploading') {
        abort(file)
      }
      uploadMap.value.delete(file)
    }
  }

  const upload = (files: File[]) => {
    uploading.value = true
    const uploadFiles = files.map(file => {
      return uploadFile(file)
    })

    return Promise.all(uploadFiles).finally(() => {
      uploading.value = false
    })
  }

  return {
    abort,
    remove,
    upload,
    uploading: computed(() => uploading.value),
    uploadMap,
  }
}

export default useUpload
