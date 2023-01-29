
function addDay(num) {
  return num * 24 * 60 * 60 * 1000
}

export function creatEvents() {
  const dateStr = '2023-01-29 00:43:00'
  const eventStart = new Date(dateStr)
    .valueOf()
  const eventEnd = eventStart + (2 * 60 * 60 * 1000)
  const otherEnd = eventEnd + (4 * 60 * 60 * 1000)

  const otherStart = eventStart + (2 * 60 * 60 * 1000) + 15 * 60 * 1000
  const otherEnd2 = otherStart + (6 * 60 * 60 * 1000)
  return [

    {
      name: 'green',
      color: 'green',
      start: otherStart - addDay(18),
      end: otherEnd - addDay(18),
      timed: true,
    },
    {
      name: 'red',
      color: 'red',
      start: otherStart,
      end: otherEnd2 + addDay(1),
      timed: true,
    },
    {
      name: 'black',
      color: 'black',
      start: eventStart - addDay(13),
      end: otherEnd - addDay(13),
      timed: true,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd + addDay(1),
      timed: true,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart + addDay(8),
      end: eventEnd + addDay(8),
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart + addDay(18),
      end: eventEnd + addDay(18),
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd,
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd + addDay(2),
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd,
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd,
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd + addDay(3),
      timed: false,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd,
      timed: true,
    },
    {
      name: 'blue',
      color: 'blue',
      start: eventStart,
      end: eventEnd,
      timed: false,
    }
  ]
}
