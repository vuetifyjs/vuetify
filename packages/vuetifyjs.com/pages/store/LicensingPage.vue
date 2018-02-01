<template>
  <v-container class="page pb-5">
    <div class="text-xs-center">
      <v-btn flat :to="{ name: 'store/Index' }" class="mb-5" exact>
        <v-icon>chevron_left</v-icon>
        Back to store
      </v-btn>
    </div>
    <h1 class="display-1 primary--text mb-3">Licenses FAQ</h1>
    <p>
      Digital products purchased under the Standard License may be used one time in an End Product for Personal Use (an End Product that does not charge End Users).
      <br>
      Digital products purchased under the Extended License may be used an unlimited amount of times for Personal Use, and one time to create a single End Product that does charge End Users.
      <br>
      An Unlimited License can be used an unlimited amount of times for Personal Use, Commercial Use, and Commercial End Products.
    </p>
    <p>If you have a use-case that you feel isn't covered by these licenses and are interested in purchasing, please <a href="mailto:sales@vuetifyjs.com">Contact Us</a>.</p>
    <table class="table">
      <thead>
        <tr class="text-xs-left">
          <th>License</th>
          <th>Personal Use</th>
          <th>Commercial Use</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(license, i) in licenses" :key="i">
          <td>
            <strong v-text="license[0]" />
          </td>
          <td
            v-for="(data, j) in license.slice(1)"
            :key="j"
            v-text="data"
          />
        </tr>
      </tbody>
    </table>
    <div class="caption py-3">
      *Theme vue-cli template may be used unlimited times with the <strong>Default</strong>, <strong>Prototype</strong> and <strong>Custom</strong> presets.
    </div>
    <h2 class="headline primary--text mb-3">General FAQ</h2>
    <div
      class="mb-4"
      v-for="(f, i) in faq"
      :key="i"
    >
      <div class="subheading" v-text="f[0]" />
      <div v-html="f[1]" />
    </div>
    <div class="text-xs-center pt-5">
      <cta-btn
        :caption="$t('Generic.Common.needHelp')"
        :text="$t('Generic.Common.contactUs')"
        href="mailto:sales@vuetifyjs.com"
      />
    </div>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      licenses: [
        ['Standard', '1 Project*', 'Not Applicable'],
        ['Extended', 'Unlimited', '1 Project*'],
        ['Unlimited', 'Unlimited', 'Unlimited']
      ],
      faq: [
        [
          'What is unlimited vue-cli uses?',
          'All themes come with a reusable vue-cli template. This has 3 standard presets, Default, Prototype and Custom, along with the install options for the <strong>pre-built</strong> theme examples. All theme purchases have unlimited usage of the <strong>standard presets</strong> and can be used for any project regardless of what it is. The only limitations for theme use is in regards to the <strong>specifically</strong> included pre-built theme examples.'
        ],
        [
          'Can I use a purchased item in a freelance project or contract work for a client?',
          'Yes. However, if the client intends to charge End Users in any way from the End Product you create, you will need to purchase an Extended License. If you create the End Product for a client, your rights to purchased Items are transferred from you to your client.'
        ],
        [
          'What is an End Product?',
          'An End Product is work that is designed or developed for a single, paid client. This website can not be resold as a product to multiple users. For more information on selling products to multiple users, please see <strong>What is an Unlimited License?</strong>'
        ],
        [
          'What are the End Product requirements?',
          'An End Product must be a unique implementation of the Item, often requiring limited copy and content changes. For example, if you purchase a resume template, you may use the Item for yourself or a client after having input personal information (you may not resell it as stock).'
        ],
        [
          'What is Personal Use, Commerical Work, Contracted Work, Client Work, etc.?',
          'If the created site can not charge users in any way, it is considered for Personal Use and a Regular License can be used. For End Products that can charge users, such as a Software as a Service application, or an e-commerce site, you should use an Extended License. For any End Products that will be sold in its entirety, such as creating software that is distributed digitally, use an Unlimited License.'
        ],
        [
          'What is a Standard License?',
          'A Standard License is for an End Product that does not charge users in any way.'
        ],
        [
          'What is an Extended License?',
          'An Extended License is for an End Product that is not distributed but can charge users. '
        ],
        [
          'What is an Unlimited License?',
          'An End Product For Sale can be either a digital design or physical item that you and/or your client intend to sell to more than a single person (wholesale, drop-shipping, etc.). For example, if you purchase a theme and include it in a website designed for a single, paid client, this is not considered an End Product for Sale. If you purchase that same theme and incorporate it into a calendar that you design and sell to multiple people, that is considered an End Product for Sale.'
        ]
      ]
    })
  }
</script>
