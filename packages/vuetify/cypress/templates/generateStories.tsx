const _ = Cypress._

const grid = (examples) => <div style="display: flex; grid-gap: 0.8rem;">{ examples }</div>
const title = (key) => <h4 class="my-4">{ key }</h4>
const wrapper = <div class="ma-4"></div>
const makeMountFromStories = (exampleSet) => {
  return Object.entries(exampleSet).reduce((acc, [key, value]) => {
    acc.push({
      mount: <wrapper>
        { title(key) }
        { grid(value) }
      </wrapper>,
      name: key
    })
    return acc
  }, [])
}

const makeMountFromProps = (props, component) => Object.entries(props).reduce((acc, [key, value]) => {
  const examples = []
  if (_.isBoolean(value)) {
    examples.push(<component { ...{ [key]: true } }>Is { key }</component>)
    examples.push(<component { ...{ [key]: false } }>Is not { key }</component>)
  } else if (_.isArray(value)) {
    value.forEach((v) => {
      examples.push(<component { ... { [key]: v } }>{ v }</component>)
    })
  }
  acc.push({
    name: key, mount: <wrapper>
      { title(key) }
      { grid(examples) }
    </wrapper>
  })
  return acc
}, [])

export const byExample = (exampleSet) => {
  return makeMountFromStories(exampleSet).map(({ name, mount }) => {
    return it(name, () => { cy.mount(() => <>{ mount }</>) })
  })
}

export const byProps = (props, component) => {
  return makeMountFromProps(props, component).map(({ mount, name }) => {
    return it(name, () => { cy.mount(() => <>{ mount }</>) })
  })
}
