import { generateComponentDataFromTypes } from './types'

export default async (componentName: string) => {
  console.log(componentName)

  try {
    return await generateComponentDataFromTypes(componentName)
  } catch (err) {
    console.error(`${componentName}: ${err}`, err.stack)
    return null
  }
}
