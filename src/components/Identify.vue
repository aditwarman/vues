<template>
  <div>
    <v-parallax
      dark
      height="300"
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-layout
        align-center
        column
        justify-center
      >
        <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
        <h4 class="subheading">Build your application today!</h4>
      </v-layout>
    </v-parallax>
    <v-container fluid>
      <v-layout align-end justify-center row>
        <v-flex xs12>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            single-line
            hide-details
            clearable
            clear-icon="mdi-close"
          ></v-text-field>
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1">
              Select an app
              <small>Summarize if needed</small>
            </v-stepper-step>

            <v-stepper-content step="1">
              <v-item-group v-model="model">
                <v-list>
                  <v-list-tile
                    v-for="(item, i) in itemsa"
                    :key="i"
                    :color="active ? 'primary' : ''"
                    @click="toggle">
                    <v-list-tile-avatar>
                      <v-img width="70px" :src="item.avatar"></v-img>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-text="item.text"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-item-group>
              <!-- <v-radio-group v-model="radioGroup" column>
                <v-list
                  subheader
                >
                  <v-list-tile v-for="(item, i) in itemsa"
                      :key="i">
                    <v-list-tile-avatar>
                      <img width="70px" :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-radio
                          :value="i"
                        ></v-radio>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-radio-group> -->
              <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

            <v-stepper-content step="2">
              <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
              <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

            <v-stepper-content step="3">
              <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
              <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">View setup instructions</v-stepper-step>
            <v-stepper-content step="4">
              <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
              <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
              <v-btn text>Cancel</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  },
  data() {
    return {
      search: '',
      radioGroup: 1,
      e6: 0,
      toggle: true,
      active: true,
      itemsa: [
        {
          icon: 'mdi-inbox',
          text: 'Inbox',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          subtext: 'Secondary line text Lorem ipsum dolor sit amet,'
        },
        {
          icon: 'mdi-star',
          text: 'Star',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          subtext: 'Secondary line text Lorem ipsum dolor sit amet,'
        },
        {
          icon: 'mdi-send',
          text: 'Send',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          subtext: 'Secondary line text Lorem ipsum dolor sit amet,'
        },
        {
          icon: 'mdi-email-open',
          text: 'Drafts',
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          subtext: 'Secondary line text Lorem ipsum dolor sit amet,'
        },
      ],
      model: 1,
      valRad: 0
    }
  },
  watch: {
    async search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
        // console.log(this.getDataAttributes())
      }, 400)
    }
  },
  methods: {
    ...mapActions(['getAttributes']),
    async doSearch() {
      try {
        await this.getAttributes()
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
  }
}
</script>