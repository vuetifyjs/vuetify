<template>
  <v-sheet
    border="s e b"
    class="overflow-hidden"
    max-width="900"
    rounded
  >
    <v-divider
      class="border-opacity-100"
      color="primary"
      thickness="4"
    />

    <v-container class="pt-9 px-5" fluid>
      <v-row density="comfortable" justify="space-around">
        <template v-for="({ text, href, name, btnText, notes }, i) in cards" :key="i">
          <v-col cols="12" md="6">
            <v-responsive class="h-100" content-class="d-flex flex-column">
              <h3 class="d-flex align-center text-h6 font-weight-medium mb-4">
                {{ name }}
              </h3>

              <div class="mb-auto text-caption">
                <div class="mb-4">{{ text }}</div>
                <ul v-if="notes && notes.length" class="mb-0 ml-5">
                  <li v-for="(item, j) in notes" :key="j">{{ item }}</li>
                </ul>
              </div>

              <v-btn
                :href="href"
                :text="btnText"
                :variant="i === 3 ? 'flat' : 'outlined'"
                class="text-none mt-8"
                color="primary"
                rel="noopener"
                target="_blank"
              />

              <v-divider class="my-8" />
            </v-responsive>
          </v-col>
        </template>
      </v-row>

      <div class="text-medium-emphasis text-caption">
        *View more detailed information on
        <AppLink href="https://www.epicmax.co/">
          Epicmax.co
        </AppLink>
      </div>
    </v-container>
  </v-sheet>
</template>

<script setup>
  const cards = [
    {
      name: '🧩 Vuetify App Development',
      href: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1ICL1_pVx87WpbxCeAKPNljw8Wr8Og4-NuzbUV-RHlxs-c_B8s2nYZ0RAWPcVqTx4Dn568c5OA',
      text: 'Epicmax helps companies build and improve Vuetify apps of any size - from brand-new products to complex legacy systems. Our senior Vue.js team resolves performance issues, modernizes legacy codebases, and develops scalable frontend architectures with clean, intuitive UI/UX designs. If you need reliable Vuetify experts to optimize, upgrade, or extend your app, we’ve got you covered.',
      btnText: 'Book a Consultation',
    },
    {
      name: '🔁 Vuetify 2 → Vuetify 3 Migration',
      href: 'https://epicmax.co/vue-3-migration#migration-form',
      text: 'Still running on Vuetify 2? Our Vuetify migration experts ensure a smooth upgrade to Vuetify 3 - with zero downtime, clear budget estimates, and long-term support.',
      notes: ['⚙️ Every migration includes a free audit and upgrade plan.'],
      btnText: 'Request Migration',
    },
    {
      name: '🔍 Frontend Code Audit Services',
      href: 'https://epicmax.co/code-audit#request_form',
      text: 'Ensure your app runs at its best with Epicmax’s Vue.js and Vuetify code audit services. We provide a detailed technical review, highlight performance bottlenecks, and deliver a prioritized roadmap with actionable fixes.',
      notes: ['💡 Use code VUETIFY for 20% off.'],
      btnText: 'Request an Audit',
    },
    {
      name: '👨‍💻 Hire Senior Vuetify Developers',
      href: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1ICL1_pVx87WpbxCeAKPNljw8Wr8Og4-NuzbUV-RHlxs-c_B8s2nYZ0RAWPcVqTx4Dn568c5OA',
      text: 'Scale your team with Epicmax’s senior Vue.js and Vuetify developers. Our engineers seamlessly integrate into your workflow, modernize legacy Vue.js applications, optimize frontend performance, and build scalable web applications with clean, reliable UI/UX.',
      btnText: 'Hire Developers',
    },
  ]
</script>
