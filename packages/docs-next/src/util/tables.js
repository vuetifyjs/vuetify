// Imports
const { IS_PROD } = require('./globals')

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function genTableHeader (headers) {
  const headerLine = []
  const dividerLine = []

  for (const header of headers) {
    if (header === 'source' && IS_PROD) continue

    headerLine.push(`${capitalize(header)}`)
    dividerLine.push('---')
  }

  return [
    genRowString(headerLine),
    genRowString(dividerLine),
  ]
}

function genTableRow (headers, row) {
  const headerRow = []

  for (const header of headers) {
    if (header === 'source' && IS_PROD) continue

    let value = row[header]

    if (['default', 'value', 'signature'].includes(header)) {
      value = `\`${row[header]}\``
    } else if (header === 'name') {
      value = `<div class="font-weight-bold text-mono">${row[header]}</div>`
    } else if (header === 'type') {
      value = `<div class="text-mono">${row[header]}</div>`
    }

    headerRow.push(value || '')
  }

  return genRowString(headerRow)
}

function genRowString (row) {
  return `| ${row.join(' | ')} |`
}

function genTable (tableData) {
  const headers = Object.keys(tableData[0])
  const table = genTableHeader(headers)

  for (const row of tableData) {
    table.push(genTableRow(headers, row))
  }

  return `${table.join('\n')}\n\n`
}

module.exports = genTable
