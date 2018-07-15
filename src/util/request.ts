/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
export interface RequestOptions {
  data: any
  ignoreCache?: boolean
  headers?: {
    [key: string]: string
  }
  onError: any
  onProgress: any
  onSuccess: any
  onTimeout: any
  // 0 (or negative) to wait forever
  timeout?: number
}

export const DEFAULT_REQUEST_OPTIONS = {
  data: null,
  ignoreCache: false,
  headers: {
    Accept: 'application/json, text/javascript, text/plain'
  },
  onError: () => {},
  onProgress: () => {},
  onSuccess: () => {},
  onTimeout: () => {},
  // default max duration for a request
  timeout: 5000
}

export interface RequestResult {
  ok: boolean
  status: number
  statusText: string
  data: string
  json: <T>() => T
  headers: string
}

function queryParams (params: any = {}) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
}

function withQuery (url: string, params: any = {}) {
  const queryString = queryParams(params)
  return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url
}

function parseXHRResult (xhr: XMLHttpRequest): RequestResult {
  return {
    ok: xhr.status >= 200 && xhr.status < 300,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: xhr.responseText,
    json: () => JSON.parse(xhr.responseText)
  }
}

function errorResponse (xhr: XMLHttpRequest, message: string | null = null): RequestResult {
  return {
    ok: false,
    status: xhr.status,
    statusText: xhr.statusText,
    headers: xhr.getAllResponseHeaders(),
    data: message || xhr.statusText,
    json: () => JSON.parse(message || xhr.statusText)
  }
}

export default function request (
  method: 'get' | 'post',
  url: string,
  queryParams: any = {},
  body: any = null,
  options: RequestOptions = DEFAULT_REQUEST_OPTIONS
) {
  const ignoreCache = options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache
  const headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers
  const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout

  return new Promise<RequestResult>(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, withQuery(url, queryParams))

    if (headers) {
      Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]))
    }

    if (ignoreCache) {
      xhr.setRequestHeader('Cache-Control', 'no-cache')
    }

    xhr.timeout = timeout

    if (xhr.upload) {
      xhr.upload.onprogress = (e: ProgressEvent) => {
        options.onProgress(e,
          e.total > 0 ? e.loaded / e.total * 100 : 0
        )
      }
    }

    xhr.onload = (e: Event): void => {
      resolve(
        options.onSuccess(e, parseXHRResult(xhr))
      )
    }

    xhr.onerror = (e: Event): void => {
      resolve(
        options.onError(e, errorResponse(xhr))
      )
    }

    xhr.ontimeout = (e: Event): void => {
      resolve(
        options.onTimeout(e, errorResponse(xhr))
      )
    }

    if (options.data) {
      xhr.send(options.data)
    } else if (method === 'post' && body) {
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(body))
    } else {
      xhr.send()
    }
  })
}
