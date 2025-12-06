---
layout: blog
meta:
  title: Vuetify — Building a Basic Nuxt App with Vuetify
  description: Learn how to build a basic Nuxt app with Vuetify
  keywords: Vuetify, Nuxt, Vue, JavaScript, Web Development
---

# Building a Basic Nuxt Application with Vuetify

---

🖊️ Eric Sarrion • 📅 February 21st, 2025

<PromotedEntry />

---

## Introduction

In this article, we will build a basic application using Vue.js and Vuetify, leveraging the Nuxt framework.

Why do we use the Nuxt framework?

1. It allows us to easily create new pages in our application using URLs such as /contact to access the contact page, or /products to access the products page.
1. It simplifies the use of Vuetify components through a simple configuration in the nuxt.config.ts file.
1. It automatically loads Vue.js methods and the components of our application without the need to import them manually each time. No more instructions like import { ref } from "vue".

For the mere simplification of the code enabled by the automatic loading of Vue.js methods and our application’s components, using Nuxt in our projects is highly recommended.

Why do we use Vuetify?

1. Vuetify was created in 2016 and has been regularly updated and improved since then. Version 3 fully utilizes the latest version of Vue.js, with the `<script setup>` syntax.
1. Vuetify has a large variety of components, and here we will use a few of them to create the structure of an application that includes a toolbar and a menu for selecting which pages to display.

Now, let’s present the application built with Vue.js and Vuetify.

## Overview of the Application Built with Vuetify

The application will consist of three simple pages, each displaying plain text centered on the page. The application can, of course, be expanded by including more information on each page. However, this type of application is truly the foundation of many modern applications.

When launching the application, the homepage will be displayed like this:

![Homepage of the Nuxt and Vuetify application with a toolbar and footer.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/0.png){ height=500 }

A toolbar is displayed at the top of the window, along with a footer at the bottom.

The toolbar contains the application's title (here, "My Application") and action buttons:

1. The button on the left (to the left of the title) is a button that displays a navigation menu, allowing users to navigate between the different pages of the application. In this case, we have three main pages: the homepage, the products page, and the contact page.
1. To the right of the navigation button is the name of the application, "My Application".
1. Finally, on the right side of the toolbar, we have added three buttons that allow direct access to each page of the application. These buttons have the same functionality as the navigation menu. We included them to demonstrate that it is possible to access a page directly by clicking on a button.

Let’s open the navigation menu by clicking the corresponding button on the left side of the toolbar:

![Navigation menu opened from the sidebar.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/16.png){ height=500 }

A sidebar has appeared on the left side of the screen. Each item in the displayed list allows direct navigation to the corresponding page. For example, let’s click on the "Products" item:

![Homepage of the Nuxt and Vuetify application with a toolbar and footer.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/0.png){ height=500 }

The page displaying the products has now appeared.

Notice that the URL shown in the browser's address bar now displays /products following the server name <http://localhost:3000>. This is because Nuxt makes it easy to use the Vue Router's built-in routing system with Nuxt.

Now that we have demonstrated the main features of the application, let’s show how to build it using Vuetify and Nuxt.

## Creating the Application in Nuxt.js

Nuxt makes it simple to create a Vue.js application that integrates Vuetify. Before proceeding, Node.js must be installed to use npm commands.

To do this, enter the following command in a terminal:

```bash
npx nuxi init vuetify-app
```

<!-- ![Screenshot of the application](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/1.png){ height=500 } -->

The command npx nuxi init vuetify-app is used to initialize a Nuxt project with a basic configuration in a directory named vuetify-app. This command breaks down as follows:

1. npx: npx is a tool that comes with Node.js, allowing you to run npm packages without needing to install them globally on your system. This means you can use a tool or script directly without having to download it first.

In this case, npx runs nuxi, a utility provided by Nuxt.

1. nuxi: nuxi is the command-line tool for Nuxt. It is used to create, start, and manage Nuxt projects. The features of nuxi include:

- Creating new Nuxt projects.
- Starting a development server.
- Generating static files for static applications.

1. init: init is a specific command for nuxi that initializes a new Nuxt project. It creates the basic project structure (configuration files) and sets up directories like pages, components, etc., which will contain the source files of our application.

1. vuetify-app: This final argument is the name of the folder where the project will be created. In this example, vuetify-app is the directory where Nuxt will initialize a project with the default structure. This folder should not exist, it will be created. After running this command, you should get a folder containing the basic configuration files for a Nuxt project.

At the end of the command execution, you will get:

![Terminal output showing the successful initialization of the Nuxt project.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/2.png){ height=500 }

We now need to enter the following two commands:

1. The command cd vuetify-app allows you to navigate to the directory of the default Vue.js application that has been created.
1. The command npm run dev starts the server, enabling us to view our application in a browser.

Let’s enter these two commands:

![Terminal output indicating the local server running on port 3000.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/3.png){ height=500 }

A local server is now running, accessible on port 3000. Simply enter the URL <http://localhost:3000> in your browser to access the previously created application.

![The default homepage displayed in the browser.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/4.png){ height=500 }

This displays the homepage of the Vue.js application created by the Nuxt framework.

Now, let’s take a look at the main files and directories generated in the default application.

## Main Files and Directories in the Nuxt-Created Application

In the vuetify-app directory, you can see the files and folders that have been created within the application:

![Directory structure of the Nuxt project with components, pages, and plugins folders.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/5.png){ height=300 }

For our application, we will need three additional directories, which will be placed directly in the root directory of the application:

- The **components** directory will contain the Vue.js components of our application.
- The **pages** directory will contain the pages of our application. A page is a Vue.js component that will be displayed in the application using internal routing. For example, the contact.vue page, located in the pages directory, will be displayed using the URL <http://localhost:3000/contact>.
- The **plugins** directory will contain the file associated with the Vuetify configuration, named vuetify.js in this case.

Thus, after creating the components, pages, and plugins directories, we will have the following structure:

![Terminal output showing the successful initialization of the Nuxt project.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/6.png){ height=300 }

We have seen the main directories of the application created with Nuxt, now let’s configure this application to display components from the Vuetify library.

## Configuring the Application to Use Vuetify Components

The Vue.js application created with Nuxt does not yet allow the use of Vuetify components like v-btn, which displays a stylized button.

To enable Vuetify components, we need to create a Vuetify configuration file in the plugins directory that we previously created. This JavaScript file will be named vuetify.js and will reside in the plugins directory.

Here is the minimum content for the file plugins/vuetify.js:

```js { resource="plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({ components })
  nuxtApp.vueApp.use(vuetify)
})
```

We import the createVuetify() method defined by Vuetify, which allows us to define the vuetify object used in the Nuxt application. The Vuetify components are also imported to be used in the Vue.js application.

We also need to modify the nuxt.config.ts file, which is responsible for configuring Nuxt. This file is located in the root directory of the application.

Here is how to update the nuxt.config.ts file:

```ts { resource="nuxt.config.ts" }
export default defineNuxtConfig({
  pages: true,
  ssr: false,
  devtools: { enabled: false },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  plugins: ['~/plugins/vuetify.js'],
  components: true,
  build: {
    transpile: ['vuetify'],
  },
})
 ```

To define that the internal routing system is used with the pages, we configure access to Vuetify's CSS style files and the use of default MDI icons, as well as the location of the vuetify.js file previously created in the plugins directory.

The pages property set to true in the nuxt.config.ts file implies that the pages of the application will be defined in specific Vue.js components, which will be inserted into the pages directory created for this purpose. The first page to be displayed will be the homepage, corresponding to the index.vue component located in the pages directory.

The configuration is now complete, and we can use Vuetify components in our application.

## Creating a Minimal Nuxt Application Using Vuetify Components

To create a minimal Nuxt application using Vuetify components, you need to:

- Create the index.vue file for the homepage located in the pages directory.
- Modify the app.vue component file to indicate the use of internal routing based on the URL. For example, the URL <http://localhost:3000/contact> will grant access to the contact.vue page located in the pages directory.

Let’s start by modifying the app.vue component, which is the first component displayed in the Nuxt application. We will use the NuxtPage component from Nuxt to display the page corresponding to the indicated URL.

Here is the content of app.vue:

![Homepage of the Nuxt and Vuetify application with a toolbar and footer.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/0.png){ height=500 }

The use of the NuxtPage component is mandatory in a Nuxt-created application because it synchronizes the displayed page with the URL in the browser. This ensures that the contact.vue page in the pages directory corresponds to the /contact URL in the browser.

Now, we need to create the index.vue page, which will be displayed by default when the URL is simply <http://localhost:3000>. In this page, we can use the Vuetify v-btn component to verify that we have access to Vuetify components.

Here is the content of the pages/index.vue file:

```html { resources="pages/index.vue" }
<template>
  <v-container>
    <v-btn color="primary" text="Vuetify Button"></v-btn>
  </v-container>
</template>
```

We are using here the v-container component, which allows encapsulating one or more components with margins around them, and the v-btn component, which displays a button in the Vuetify style.

We verify that the components are indeed active in the index.vue page:

![Screenshot showing the Vuetify button on the homepage.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/7.png){ height=300 }

The button is correctly displayed according to the attributes specified in the v-btn component, particularly the primary color. Additionally, the effect of the v-container component is visible because a margin has been applied around the button, preventing it from being positioned against the edges of the window.

Now that we have seen how to structure the Vue.js application with Vuetify and Nuxt, let’s see how to modify it to integrate components that will display toolbars and a menu to access the pages of the application.

## Displaying a Toolbar at the Top of the Window

The first thing to do is to display a toolbar at the top of the window. This toolbar will contain the title of the application, along with a button that will open a menu displaying the pages, allowing navigation within the application.

To do this, we modify the app.vue file of the application. This file contains the overall structure of the application and is the first to be displayed when the application starts in a browser.

We will use the v-app-bar component, which is a Vuetify component used to display the navigation bar.

```html { resource="app.vue" }
<template>
  <v-app>
    <!-- Toolbar at the top of the screen -->
    <v-app-bar color="primary" height="48">
      <!-- Title of the application with adjusted margin and font size -->
      <v-app-bar-title class="text-h6 ms-3">
        <v-icon icon="mdi-apps"></v-icon>

        <span class="ms-1">My Application</span>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Main content of the application -->
    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>
```

We see the necessary structure to display a toolbar with Vuetify:

- The v-app-bar component uses the color and height attributes. The color attribute allows specifying a background color for the toolbar, while the height attribute allows specifying its height. If these attributes are not provided, Vuetify applies default values.
- The v-app-bar-title component defines the content to be displayed in the toolbar's title. Here, we use a v-icon component to leverage the MDI icons defined in Vuetify (in this case, the mdi-apps icon, which displays an icon representing a set of applications), followed by a span element displaying the text. The Vuetify internal CSS class ml-1 adds a margin of 1 unit to the left side of the element. This helps visually separate the text from the preceding icon.

Let's display the corresponding page:

![Application with a toolbar featuring an icon and a title.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/8.png){ height=500 }

The toolbar has been displayed correctly, but the index.vue page still contains the previously inserted button.

Let's modify this index.vue page to display more appropriate content for the homepage.

## Create the homepage displayed at startup

We simply need to modify the index.vue page. In it, we display an mdi-home icon followed by the text of the page: My Application's Home Page. The entire content needs to be centered on the page.

```html { resources="pages/index.vue" }
<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center text-center">
    <v-icon icon="mdi-home" size="64"></v-icon>

    <div class="mt-3">My Application's Home Page</div>
  </v-container>
</template>
```

We use the v-container and v-icon components from Vuetify, as seen previously. We also apply the CSS classes defined in Vuetify to the v-container component, allowing the use of Flexbox.

Now we get:

![Homepage with an icon and text centered using Vuetify components.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/9.png){ height=500 }

Before handling the click on the mdi-apps button in the toolbar (which allows displaying the navigation menu), let's see how to integrate a footer into our application.

## Display a footer at the bottom of the window

The insertion of a footer in the Vuetify application is similar to that of the toolbar. We use the v-footer component from Vuetify.

The app.vue file is therefore modified:

```html { resource="app.vue" }
<template>
  <v-app>
    <!-- Toolbar at the top of the screen -->
    <v-app-bar color="primary" height="48">
    <!-- Title of the application with adjusted margin and font size -->
      <v-app-bar-title class="text-h6 ms-3">
        <v-icon icon="mdi-apps"></v-icon>

        <span class="ms-1">My Application</span>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Main content of the application -->
    <v-main>
      <NuxtPage />
    </v-main>

    <!-- Smaller footer at the bottom of the screen -->
    <v-footer color="secondary" height="30">
      <v-container class="text-center text-caption">
        © {{ new Date().getFullYear() }} My Application - All Rights Reserved
      </v-container>
    </v-footer>
  </v-app>
</template>
```

We simply inserted the v-footer component, specifying the color and height attributes as before. The content is simply placed inside a v-container component.

Now we get:

![Footer displayed at the bottom of the application window.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/10.png){ height=500 }

The footer is not positioned at the desired height. Indeed, Vuetify requires correlating the toolbar and footer by using the app attribute in both components. This app attribute indicates that these components are linked to each other, making it essential.

Let's add the app attribute to both our v-app-bar and v-footer components:

```html { resource="app.vue" }
<template>
  <v-app>
    <!-- Toolbar at the top of the screen -->
    <v-app-bar color="primary" height="48">
      <!-- Title of the application with adjusted margin and font size -->
      <v-app-bar-title class="text-h6 ms-3">
        <v-icon icon="mdi-apps"></v-icon>

        <span class="ms-1">My Application</span>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Main content of the application -->
    <v-main>
      <NuxtPage />
    </v-main>

    <!-- Smaller footer at the bottom of the screen -->
    <v-footer app color="secondary" height="30">
      <v-container class="text-center text-caption">
        © {{ new Date().getFullYear() }} My Application - All Rights Reserved
      </v-container>
    </v-footer>
  </v-app>
</template>
```

The app attribute has been added to the v-app-bar component and the v-footer component.

Let's see the resulting output:

![Footer correctly aligned at the bottom after using the app attribute.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/11.png){ height=500 }

The footer is now displayed correctly, taking into account the height attribute specified within it.

## Using a navigation menu

We now need to add a navigation menu that allows selecting a page from the following options:

1. The index.vue page, which is displayed by default.
2. The products.vue page, which displays the products of our application.
3. The contact.vue page, which allows contacting the management.

This navigation menu will be accessible by clicking on the mdi-apps icon in the toolbar.

The app.vue component is modified to integrate the navigation menu:

```html { resource="app.vue" }
<template>
  <v-app>
  <!-- Toolbar at the top of the screen -->
  <v-app-bar color="primary" height="48">
    <!-- Title of the application with adjusted margin and font size -->
    <v-app-bar-title class="text-h6 ms-3">
      <v-icon icon="mdi-apps"></v-icon>

      <span class="ms-1">My Application</span>
    </v-app-bar-title>
  </v-app-bar>

  <!-- Navigation drawer for menu actions -->
  <v-navigation-drawer v-model="drawer">
    <v-list>
      <!-- Menu items in the drawer with icons -->
      <v-list-item
        @click="navigateTo('/')"
        title="Home"
        prepend-icon="mdi-home"
      ></v-list-item>

      <v-list-item
        @click="navigateTo('/products')"
        title="Products"
        prepend-icon="mdi-cube-outline"
      ></v-list-item>

      <v-list-item
        @click="navigateTo('/contact')"
        title="Contact"
        prepend-icon="mdi-email"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- Main content of the application -->
  <v-main>
    <NuxtPage />
  </v-main>

  <!-- Smaller footer at the bottom of the screen -->
  <v-footer app color="secondary" height="30">
    <v-container class="text-center text-caption">
      © {{ new Date().getFullYear() }} My Application - All Rights Reserved
    </v-container>
  </v-footer>
  </v-app>
</template>
```

The v-navigation-drawer component from Vuetify allows defining the elements that make up the navigation menu. It is defined as a list using the v-list component:

- Each list item is a v-list-item component, itself composed of a title (v-list-item-title component).
- Each title is represented by an icon (v-icon component) and a text.

The appearance of the menu is controlled by a reactive variable, here named drawer. If it is set to false (default value), the menu is not displayed. As soon as it changes to true, the menu appears. The change from false to true (or vice versa) happens when the mdi-apps button in the toolbar is clicked.

The menu also needs to be linked to this reactive variable. To achieve this, Vuetify uses the v-model attribute in the v-navigation-drawer component. Many Vuetify components use the v-model attribute to link the component to a reactive variable in the program.

Clicking on each navigation menu item is handled by the @click attribute, which is a shorthand for v-on:click provided by Vue.js. We call the navigateTo(page) method, which displays the page specified as a parameter, such as "/" (to display index.vue), "/products" (to display products.vue), or "/contact" (to display the contact.vue page).

Let's verify the proper functioning of this mechanism by displaying the products.vue page. We assume that each page of the application has been created similarly to the index.vue page. These pages will be created in the next section if needed.

![Products page displayed after navigating using the sidebar menu.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/12.png){ height=500 }

We can now navigate from page to page within the application.

## Creating the other pages of the application

The products.vue page, displayed previously, must first be created. We create it using the same principle as the index.vue page that was created earlier.

Here is the code describing each of the components associated with the pages of the application:

```html { resource="pages/products.vue" }
<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center text-center">
    <v-icon icon="mdi-cube-outline" size="64"></v-icon>

    <div class="mt-3">My Application's Products Page</div>
  </v-container>
</template>
```

## Adding buttons to the toolbar

Finally, we might want to insert new buttons into the toolbar at the top of the screen, on the right side. These buttons can provide direct access to one of the application’s pages, without using the previously implemented navigation menu.

We therefore insert buttons in the form of icons into the application's toolbar. The app.vue component becomes:

```html
<template>
  <v-app>
    <!-- Toolbar at the top of the screen -->
    <v-app-bar color="primary" height="48">
      <!-- Title of the application with adjusted margin and font size -->
      <v-app-bar-title class="text-h6 ms-3">
        <v-icon icon="mdi-apps" @click="drawer = !drawer"></v-icon>

        <span class="ms-1">My Application</span>
      </v-app-bar-title>

      <!-- Spacer to push the following elements to the right -->
      <v-spacer />

      <!-- Menu icons on the right side of the toolbar -->
      <v-btn icon="mdi-home" @click="navigateTo('/')"></v-btn>

      <v-btn icon="mdi-cube-outline" @click="navigateTo('/products')"></v-btn>

      <v-btn icon="mdi-email" @click="navigateTo('/contact')"></v-btn>
    </v-app-bar>

    <!-- Navigation drawer for menu actions -->
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <!-- Menu items in the drawer with icons -->
        <v-list-item
          @click="navigateTo('/')"
          title="Home"
          prepend-icon="mdi-home"
        ></v-list-item>


        <v-list-item
          @click="navigateTo('/products')"
          title="Products"
          prepend-icon="mdi-cube-outline"
        ></v-list-item>


        <v-list-item
          @click="navigateTo('/contact')"
          title="Contact"
          prepend-icon="mdi-email"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main content of the application -->
    <v-main>
      <NuxtPage />
    </v-main>

    <!-- Smaller footer at the bottom of the screen -->
    <v-footer app color="secondary" height="30">
      <v-container class="text-caption text-center">
        © {{ new Date().getFullYear() }} My Application - All Rights Reserved
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
// Drawer state to open/close the navigation drawer
const drawer = shallowRef(false)
</script>
```

Vuetify offers the v-spacer component, which allows "pushing" the elements that follow it to the right. The buttons will therefore be positioned on the right side of the toolbar.

To display the buttons, we use the v-btn component with the icon attribute. This attribute allows the button to be displayed in a circular shape, according to the icon it contains. The @click attribute is also used to handle navigation to the desired page, just as we did in the navigation menu.

The application is now displayed:

![Toolbar with additional navigation buttons for quick page access.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/14.png){ height=500 }

Clicking on the buttons displays the desired page. For example, the /contact page:

![Contact page displayed after selecting it from the navigation menu.](https://cdn.vuetifyjs.com/docs/images/blog/building-a-basic-nuxt-application-with-vuetify/15.png){ height=500 }

## Conclusion

In this article, we have covered fundamental aspects of using Vue.js and Vuetify in a Nuxt application.

We explored several Vuetify components that help design the application, and we learned how to break down the application into different pages, through which we navigated.
