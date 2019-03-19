<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img width="100"src="https://cdn.vuetifyjs.com/images/logos/logo.svg">
  </a>
</p>

<h2 align="center">Vuetify API Generator</h2>

<p align="center">Generator of the API that powers Vuetify docs</p>

<br>

### Introduction
This repo compiles and generates the api needed for the components located in the api section of vuetify docs. 


### Manual Build

``` bash
# from root dir
yarn build api
# from local dir
yarn build
```

### Adding API's

Adding props/events/slots/functions/etc. to the docs is easy as 2 steps.
* Add your prop to the appropiate `.json` file
eg:
``` json
{
  "props": {
    "border": {
      "type": "string",
      "default": "undefined"
    }
  }
}
```

### Inheritance
Instead of duplicating API's in each component you can auto inherit API's from other components.
Inside the component json file simply add the inherited component name to inherited the json array:
``` json
{
  "inherited": [
    "v-sheet",
    "colorable"
  ]
}
```
