<template>
  <v-app>
    <v-locale-provider :rtl="rtl">
      <v-btn @click="rtl = !rtl">rtl</v-btn>
      <div style="text-align: center;width: 100%;">
        <p style="padding: 20px;" >Dynamic first flag would sepcify which item to be active when it comes to a conflicting case, one Item via Properties (dynamic part) which holds a step value that another Static Item (slots) is also having, so according to the priority we can set either of them</p>  
        <v-switch
          v-model="itemsFirst"
          label="Dynamic First"
          color="primary"
          style="display: block; margin-left: auto;margin-right: auto;width:200px;"
        ></v-switch>
     
      
      
      </div>

      <!-- *******************************************                Vertical Component               ********************************************-->
      <v-stepper v-model="e1" direction="vertical" :items="items"  :dynamicFirst="itemsFirst" :key="itemsFirst">
        <template #content.foo="props">
          <v-card>
            <v-card-text>
              hello

            </v-card-text>
            <v-btn
                color="primary"
                @click=" e1 = '3'"
              >
                Continue
              </v-btn>

          </v-card>
        </template>
        <template #content.bar="props">
          <v-card>
            <v-card-text>
              hello
            </v-card-text>
          </v-card>
        </template>

          <v-stepper-header>
            <v-stepper-step
              title="Name of step 1"
              :complete="e1 > '1'"
              step="1"
            >
              
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              title="Name of step 2"  
              :complete="e1 > '2'"
              step="2"
            >
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step 
            title="Name of step 3"
            step="3">
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" value="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              Step 1 Contents
            </v-card>

              <v-btn
                color="primary"
                @click=" e1 = itemsFirst? 'foo':'2'"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              Step 2 Contents
            </v-card>

              <v-btn
                color="primary"
                @click="e1 = '3'"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
              >
              Step 3 Contents
            </v-card>

              <v-btn
                color="primary"
                @click="e1 = '1'"
              >
                Continue
              </v-btn>

              <v-btn text>
                Cancel
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        
        
        
        

    </v-locale-provider>
  </v-app>
</template>



<script>
  export default {
    name: 'Playground',
    data: () => ({
      e1:0,
      e2:0,
      itemsFirst:false,
      rtl: false,
      open: null,
      active: null,
      items: [
        {
          title: 'Foo',
          subtitle: 'Subtitle',
          value: 'foo',
          step: '2'
        },
        {
          title: 'Bar',
          value: 'bar',
          step: '4'
        },
      ],
      loadedItems: [
        {
          value: 'root',
          text: 'root',
          loaded: false,
          children: [],
        },
      ],
      opened: [],
      isCtrl: false,
      count: 1,
    }),
  }
</script>
