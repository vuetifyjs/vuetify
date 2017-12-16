export default {
  state: {
    snackbarQueue: []
  },
  addSnackbarToQueue (uid) {
    this.state.snackbarQueue.push(uid)
  },
  clearSnackbarQueue () {
    this.state.snackbarQueue = []
  },
  getSnackbarQueue () {
    return this.state.snackbarQueue
  },
  getSnackbarFromQueue () {
    return this.state.snackbarQueue[0]
  },
  removeSnackbarFromQueue (uid) {
    const index = this.state.snackbarQueue.indexOf(uid)
    if (index > -1) this.state.snackbarQueue.splice(index, 1)
  }
}
