<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="4" md="4">
				<h5>Default</h5>
				<v-number-input
    			control-variant="default"
				></v-number-input>
      </v-col>
			<v-col cols="12" sm="4" md="4">
				<h5>Stacked</h5>
        <v-number-input
    			control-variant="stacked"
				></v-number-input>
      </v-col>
			<v-col cols="12" sm="4" md="4">
				<h5>Split</h5>
        <v-number-input
    			control-variant="split"
				></v-number-input>
      </v-col>
		</v-row>
	</v-container>
</template>
