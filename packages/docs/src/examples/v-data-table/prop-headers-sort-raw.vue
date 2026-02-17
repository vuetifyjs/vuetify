<template>
  <v-data-table
    :headers="headers"
    :items="items"
  ></v-data-table>
</template>

<script setup>
  function sortRaw (a, b) {
    if (a.location < b.location) return -1
    if (a.location > b.location) return 1

    const dateA = a.constructed.split('-').pop().trim()
    const dateB = b.constructed.split('-').pop().trim()

    return dateA.localeCompare(dateB, undefined, { numeric: true, sensitivity: 'base' })
  }

  const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Location', key: 'location', sortRaw },
    { title: 'Constructed', key: 'constructed' },
    { title: 'Description', key: 'description' },
  ]

  const items = [
    { name: 'Great Pyramid of Giza', location: 'Egypt', constructed: '2584-2561 BC', description: 'The oldest and largest of the three pyramids in the Giza pyramid complex.' },
    { name: 'Hanging Gardens of Babylon', location: 'Iraq', constructed: '600 BC', description: 'An ascending series of tiered gardens, said to have been built in ancient Babylon.' },
    { name: 'Statue of Zeus at Olympia', location: 'Greece', constructed: '435 BC', description: 'A giant seated figure of Zeus, made by the sculptor Phidias.' },
    { name: 'Temple of Artemis at Ephesus', location: 'Turkey', constructed: '550 BC', description: 'A large temple dedicated to the goddess Artemis, one of the Seven Wonders of the Ancient World.' },
    { name: 'Mausoleum at Halicarnassus', location: 'Turkey', constructed: '351 BC', description: 'A tomb built for Mausolus, a satrap of the Persian Empire.' },
    { name: 'Colossus of Rhodes', location: 'Greece', constructed: '292-280 BC', description: 'A statue of the Greek sun-god Helios, erected in the city of Rhodes.' },
    { name: 'Lighthouse of Alexandria', location: 'Egypt', constructed: '280 BC', description: 'A lighthouse built by the Ptolemaic Kingdom on the island of Pharos.' },
    { name: 'Great Wall of China', location: 'China', constructed: '7th century BC - 1644 AD', description: 'A series of fortifications made of stone, brick, and other materials.' },
    { name: 'Petra', location: 'Jordan', constructed: '312 BC', description: 'A historical city known for its rock-cut architecture and water conduit system.' },
    { name: 'Taj Mahal', location: 'India', constructed: '1632-1653 AD', description: 'An ivory-white marble mausoleum on the south bank of the Yamuna river.' },
    { name: 'Machu Picchu', location: 'Peru', constructed: '1450 AD', description: 'An Incan citadel set high in the Andes Mountains.' },
    { name: 'Chichen Itza', location: 'Mexico', constructed: '600 AD', description: 'A large pre-Columbian archaeological site built by the Maya people.' },
    { name: 'Roman Colosseum', location: 'Italy', constructed: '70-80 AD', description: 'An oval amphitheatre in the centre of the city of Rome.' },
    { name: 'Stonehenge', location: 'United Kingdom', constructed: '3000 BC - 2000 BC', description: 'A prehistoric monument consisting of a ring of standing stones.' },
    { name: 'Angkor Wat', location: 'Cambodia', constructed: '12th century AD', description: 'The largest religious monument in the world, originally constructed as a Hindu temple.' },
    { name: 'Moai Statues of Easter Island', location: 'Chile', constructed: '1250-1500 AD', description: 'Monolithic human figures carved by the Rapa Nui people on Easter Island.' },
    { name: 'Hagia Sophia', location: 'Turkey', constructed: '537 AD', description: 'A former Greek Orthodox Christian patriarchal basilica, later an Ottoman imperial mosque and now a museum.' },
    { name: 'Alhambra', location: 'Spain', constructed: '13th century AD', description: 'A palace and fortress complex located in Granada.' },
    { name: 'Forbidden City', location: 'China', constructed: '1406-1420 AD', description: 'A palace complex in central Beijing, serving as the home of emperors and their households.' },
    { name: 'Christ the Redeemer', location: 'Brazil', constructed: '1922-1931 AD', description: 'An Art Deco statue of Jesus Christ in Rio de Janeiro.' },
    { name: 'Acropolis of Athens', location: 'Greece', constructed: '5th century BC', description: 'An ancient citadel located on a rocky outcrop above the city of Athens.' },
    { name: 'Terracotta Army', location: 'China', constructed: '246-206 BC', description: 'A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.' },
    { name: 'Parthenon', location: 'Greece', constructed: '447-438 BC', description: 'A former temple on the Athenian Acropolis, dedicated to the goddess Athena.' },
    { name: 'Tower of London', location: 'United Kingdom', constructed: '1078 AD', description: 'A historic castle located on the north bank of the River Thames in central London.' },
    { name: 'Neuschwanstein Castle', location: 'Germany', constructed: '1869-1886 AD', description: 'A 19th-century Romanesque Revival palace on a rugged hill above the village of Hohenschwangau.' },
  ]
</script>

<script>
  export default {
    data: () => ({
      headers: [
        { title: 'Name', key: 'name' },
        {
          title: 'Location',
          key: 'location',
          sortRaw (a, b) {
            if (a.location < b.location) return -1
            if (a.location > b.location) return 1

            const dateA = a.constructed.split('-').pop().trim()
            const dateB = b.constructed.split('-').pop().trim()

            return dateA.localeCompare(dateB, undefined, { numeric: true, sensitivity: 'base' })
          },
        },
        { title: 'Constructed', key: 'constructed' },
        { title: 'Description', key: 'description' },
      ],
      items: [
        { name: 'Great Pyramid of Giza', location: 'Egypt', constructed: '2584-2561 BC', description: 'The oldest and largest of the three pyramids in the Giza pyramid complex.' },
        { name: 'Hanging Gardens of Babylon', location: 'Iraq', constructed: '600 BC', description: 'An ascending series of tiered gardens, said to have been built in ancient Babylon.' },
        { name: 'Statue of Zeus at Olympia', location: 'Greece', constructed: '435 BC', description: 'A giant seated figure of Zeus, made by the sculptor Phidias.' },
        { name: 'Temple of Artemis at Ephesus', location: 'Turkey', constructed: '550 BC', description: 'A large temple dedicated to the goddess Artemis, one of the Seven Wonders of the Ancient World.' },
        { name: 'Mausoleum at Halicarnassus', location: 'Turkey', constructed: '351 BC', description: 'A tomb built for Mausolus, a satrap of the Persian Empire.' },
        { name: 'Colossus of Rhodes', location: 'Greece', constructed: '292-280 BC', description: 'A statue of the Greek sun-god Helios, erected in the city of Rhodes.' },
        { name: 'Lighthouse of Alexandria', location: 'Egypt', constructed: '280 BC', description: 'A lighthouse built by the Ptolemaic Kingdom on the island of Pharos.' },
        { name: 'Great Wall of China', location: 'China', constructed: '7th century BC - 1644 AD', description: 'A series of fortifications made of stone, brick, and other materials.' },
        { name: 'Petra', location: 'Jordan', constructed: '312 BC', description: 'A historical city known for its rock-cut architecture and water conduit system.' },
        { name: 'Taj Mahal', location: 'India', constructed: '1632-1653 AD', description: 'An ivory-white marble mausoleum on the south bank of the Yamuna river.' },
        { name: 'Machu Picchu', location: 'Peru', constructed: '1450 AD', description: 'An Incan citadel set high in the Andes Mountains.' },
        { name: 'Chichen Itza', location: 'Mexico', constructed: '600 AD', description: 'A large pre-Columbian archaeological site built by the Maya people.' },
        { name: 'Roman Colosseum', location: 'Italy', constructed: '70-80 AD', description: 'An oval amphitheatre in the centre of the city of Rome.' },
        { name: 'Stonehenge', location: 'United Kingdom', constructed: '3000 BC - 2000 BC', description: 'A prehistoric monument consisting of a ring of standing stones.' },
        { name: 'Angkor Wat', location: 'Cambodia', constructed: '12th century AD', description: 'The largest religious monument in the world, originally constructed as a Hindu temple.' },
        { name: 'Moai Statues of Easter Island', location: 'Chile', constructed: '1250-1500 AD', description: 'Monolithic human figures carved by the Rapa Nui people on Easter Island.' },
        { name: 'Hagia Sophia', location: 'Turkey', constructed: '537 AD', description: 'A former Greek Orthodox Christian patriarchal basilica, later an Ottoman imperial mosque and now a museum.' },
        { name: 'Alhambra', location: 'Spain', constructed: '13th century AD', description: 'A palace and fortress complex located in Granada.' },
        { name: 'Forbidden City', location: 'China', constructed: '1406-1420 AD', description: 'A palace complex in central Beijing, serving as the home of emperors and their households.' },
        { name: 'Christ the Redeemer', location: 'Brazil', constructed: '1922-1931 AD', description: 'An Art Deco statue of Jesus Christ in Rio de Janeiro.' },
        { name: 'Acropolis of Athens', location: 'Greece', constructed: '5th century BC', description: 'An ancient citadel located on a rocky outcrop above the city of Athens.' },
        { name: 'Terracotta Army', location: 'China', constructed: '246-206 BC', description: 'A collection of terracotta sculptures depicting the armies of Qin Shi Huang, the first Emperor of China.' },
        { name: 'Parthenon', location: 'Greece', constructed: '447-438 BC', description: 'A former temple on the Athenian Acropolis, dedicated to the goddess Athena.' },
        { name: 'Tower of London', location: 'United Kingdom', constructed: '1078 AD', description: 'A historic castle located on the north bank of the River Thames in central London.' },
        { name: 'Neuschwanstein Castle', location: 'Germany', constructed: '1869-1886 AD', description: 'A 19th-century Romanesque Revival palace on a rugged hill above the village of Hohenschwangau.' },
      ],
    }),
  }
</script>
