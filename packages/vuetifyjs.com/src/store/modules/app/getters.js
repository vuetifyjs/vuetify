import supporters from '@/data/company/supporters.json'

export default {
  supporters: () => {
    const diamond = []
    const palladium = []
    const gold = []
    const affiliate = []
    const service = []

    const matches = (str, comp) => str.toLowerCase().indexOf(comp.toLowerCase()) > -1

    for (const supporter of supporters) {
      const pledge = supporter.pledge
      const type = supporter.type

      if (pledge) {
        if (matches(pledge, 'diamond')) diamond.push(supporter)
        if (matches(pledge, 'palladium')) palladium.push(supporter)
        if (matches(pledge, 'gold')) gold.push(supporter)
      } else {
        if (matches(type, 'affiliate')) affiliate.push(supporter)
        if (matches(type, 'service')) service.push(supporter)
      }
    }

    return {
      diamond,
      palladium,
      gold,
      affiliate,
      service
    }
  }
}
