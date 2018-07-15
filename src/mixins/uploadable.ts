// Types
import Vue from 'vue'
import { RequestResult } from './../util/request'

// Utilities
import request from '../util/request'

export default Vue.extend({
  name: 'uploadable',

  props: {
    action: String,
    httpRequest: {
      type: Function,
      default: request
    },
    lazy: Boolean,
    options: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: 'file'
    },
    params: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    internalFiles: [],
    isUploading: false,
    uploadProgress: 0
  }),

  computed: {
    uploadFiles (): File[] {
      return this.internalFiles
    }
  },

  watch: {
    uploadFiles (val) {
      if (val.length > 0) {
        const file = val[0]
        const data = new FormData()

        data.append(this.name, file, file.name)

        this.uploadProgress = 0
        this.isUploading = true
        this.upload(data)
      }
    }
  },

  methods: {
    /** @abstract */
    getInput (): any {
      throw new Error('Not implemented !')
    },
    onFileChange (e: Event) {
      this.internalFiles = Array.from(this.getInput().files)
    },
    onError (e: Event, res: RequestResult) {
      //
      this.isUploading = false
      this.uploadProgress = 0
      this.$emit('error', e)
    },
    onProgress (e: Event, uploadProgress: number) {
      this.uploadProgress = uploadProgress
      this.$emit('progress', e)
    },
    onSuccess (e: Event, res: RequestResult) {
      setTimeout(() => (this.isUploading = false), 1000)

      this.$emit('success', e)
    },
    onTimeout (e: Event, res: RequestResult) {
      this.$emit('timeout', e)
    },
    openFiles (e: Event) {
      const input = this.getInput()

      if (e.target !== input) {
        input.click && input.click()
      }
    },
    upload (data: FormData): Promise<any> {
      return request(
        'post',
        this.action,
        this.params,
        null,
        {
          onError: this.onError,
          onProgress: this.onProgress,
          onSuccess: this.onSuccess,
          onTimeout: this.onTimeout,
          data,
          ...this.options
        }
      )
    }
  }
})
