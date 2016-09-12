export default function (cb) {
    if (document.readyState === 'complete') {
        return this.$nextTick(cb)
    }

    document.addEventListener('DOMContentLoaded', cb)
}
