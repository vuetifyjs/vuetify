import { generateComponentDataFromTypes } from './types'

const reset = '\x1b[0m'
const red = '\x1b[31m'
const blue = '\x1b[34m'

export default async (componentName: string) => {
  console.log(blue, componentName, reset)

  try {
    return await generateComponentDataFromTypes(componentName)
  } catch (err: any) {
    console.error(red, `${componentName}: ${err}`, err.stack, reset)
    return null
  }
}
