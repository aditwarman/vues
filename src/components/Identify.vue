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
          <!-- <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            single-line
            hide-details
            clearable
            clear-icon="mdi-close"
          ></v-text-field> -->
          <v-stepper v-model="e6" vertical>
            <template v-for="(item, index) in items">
              
              <v-stepper-step :complete="e6 > index" :step="index">
                {{ item.attribute_name }}
                <small>Summarize if needed</small>
              </v-stepper-step>

              <v-stepper-content :step="index">
                <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
                <!-- <v-list two-line>
                  <v-list-tile v-for="(naming, idK) in item.feature" :key="idK" class="tile" @click="itemType({'name': naming, 'id':idK })">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ naming }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list> -->
                <v-btn color="primary" @click="e6 = index + 1">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
            </template>
            <!-- <v-list-tile-action>
              <v-radio :value="item.name" :key="item.id"
                v-model="selectedItem"></v-radio>
            </v-list-tile-action> -->

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
      model: 1,
      valRad: 0,
      selectedItem: '',
      e6: 1
    }
  },
  computed: {

    items() {
      return this.$store.state.identify.attributes
    },
  },
  watch: {
    async search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
        // console.log(this.getDataAttributes())
      }, 400)
    },
    collectItems() {
      this.attributeFeatures()
    },
    selectedItem (val) {
      console.log(val)
      // this.$store.commit('item/setIteminStore', payload)
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
    itemType(payload) {
      this.selectedItem = payload.name
    },
    attributeFeatures() {
      // try {
      //   await this.getAttributes().then((response) => {
      //     console.log(response)
      //   })
      // } catch (error) {
      //   // 
      // }
    }
  },
  async mounted() {
    await this.getAttributes()
    // await this.getAllCities()
  }
}
</script>

<style scoped>
  .tile {
    margin: 5px;
    border-radius: 4px;
  }
  .tile:hover {
    background: green;
  }
  .tile:active {
    background: yellow;
  }
</style>