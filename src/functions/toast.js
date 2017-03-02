class Toast {
  toast (location) {
    const toast = document.createElement('div')

    toast.classList.add('toast')
    toast.classList.add(`toast--${location}`)

    document.body.appendChild(toast)

    return toast
  }

  create (message, location = 'right', duration = 3000, cb) {
    let toast = document.querySelector(`.toast--${location}`)

    if (!toast) {
      toast = this.toast(location)
    }

    var content = document.createElement('div')
    content.classList.add('toast__content')
    content.innerHTML = message

    toast.appendChild(content)
    setTimeout(() => content.classList.add('toast__content--active'), 10)

    setTimeout(() => {
      content.classList.add('toast__content--remove')

      setTimeout(() => {
        content.remove()

        if (cb) {
          cb()
        }
      }, 300)
    }, duration)
  }
}

export default new Toast()
