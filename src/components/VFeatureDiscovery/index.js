import VFeatureDiscovery from './VFeatureDiscovery'

export { VFeatureDiscovery }

/* istanbul ignore next */
VFeatureDiscovery.install = function install (Vue) {
  Vue.component(VFeatureDiscovery.name, VFeatureDiscovery)
}

export default VFeatureDiscovery
