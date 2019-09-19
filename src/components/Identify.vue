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
          <v-stepper v-model="e6" vertical>
            <div v-for="(item, n) in data" 
                :key="`${n}-step`">
              <v-stepper-step :step="n" :complete="e6 > n">
                {{ item.attribute_name }} {{ e6 }} {{ n }}
                <small>Summarize if needed</small>
              </v-stepper-step>
              <v-stepper-content :step="n" :key="`${n}-content`">
                <v-list two-line>
                  <v-list-tile v-for="(naming, idK) in item.features" :key="idK" :style="textActived == `${item.attribute_id}-${idK}` ? 'background: rgba(204, 204, 204, 0.4);' : ''" @click="itemType({feature_id: idK, attr_id:item.attribute_id })">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ naming }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <div>
                  <v-btn v-if="n != Object.keys(items).length" @click.native="checkedFeature(n)">next step</v-btn>
                  <v-btn v-else>Simpan</v-btn>
                </div> 
                <v-btn text>Cancel</v-btn>
              </v-stepper-content>
            </div>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('about.TITLE')} - %s`
    }
  },
  data() {
    return {
      stepCounter: 1,
      model: 1,
      valRad: 0,
      selectedItem: {},
      e6: 1,
      steps: 5,
      data: {
        "1":{
          "attribute_id":1,
          "attribute_name":"Bentuk Tudung",
          "features":{
            "1":"BELL",
            "2":"CONICAL",
            "4":"FLAT",
            "5":"KNOBBED",
            "3":"CONVEX",
            "6":"SUNKEN"
          }
        },
        "2":{
          "attribute_id":2,
          "attribute_name":"Permukaan Tudung",
          "features":{
            "7":"FIBROUS",
            "8":"GROOVES",
            "9":"SCALYY",
            "10":"SMOOTH"
          }
        },
        "3":{
          "attribute_id":3,
          "attribute_name":"Warna Tudung",
          "features":{
            "11":"BROWN",
            "12":"BUFF",
            "13":"CINNAMON",
            "14":"GRAY",
            "15":"GREEN",
            "16":"PINK",
            "17":"PURPLE",
            "18":"RED",
            "19":"WHITE",
            "20":"YELLOW"
          }
        },
        "4":{
          "attribute_id":4,
          "attribute_name":"Memar",
          "features":{
            "21":"BRUISES",
            "22":"NO BRUISES"
          }
        },
        "5":{
          "attribute_id":5,
          "attribute_name":"Aroma",
          "features":{
            "23":"ALMOND",
            "24":"ANISE",
            "25":"CREOSOTE",
            "27":"FISHY",
            "28":"FOUL",
            "29":"MUSTY",
            "30":"NONE",
            "31":"PUNGENT",
            "32":"SPICY"
          }
        },
        "6":{
          "attribute_id":6,
          "attribute_name":"Pelekatan Insang",
          "features":{
            "33":"ATTACHED",
            "34":"DESCENDING",
            "35":"FREE",
            "36":"NOTCHED"
          }
        },
        "7":{
          "attribute_id":7,
          "attribute_name":"Kerapatan Garis-Garis Insang",
          "features":{
            "37":"CLOSE",
            "38":"CROWDED",
            "39":"DISTANT"
          }
        },
        "8":{
          "attribute_id":8,
          "attribute_name":"Ukuran Insang",
          "features":{
            "40":"BROAD",
            "41":"NARROW"
          }
        },
        "9":{
          "attribute_id":9,
          "attribute_name":"Warna Insang",
          "features":{
            "42":"BLACK",
            "11":"BROWN",
            "12":"BUFF",
            "44":"CHOCOLATE",
            "14":"GRAY",
            "15":"GREEN",
            "45":"ORANGE",
            "16":"PINK",
            "17":"PURPLE",
            "18":"RED",
            "19":"WHITE",
            "20":"YELLOW"
          }
        },
        "10":{
          "attribute_id":10,
          "attribute_name":"Bentuk Tangkai",
          "features":{
            "46":"ENLARGING",
            "47":"TAPERING"
          }
        },
        "11":{
          "attribute_id":11,
          "attribute_name":"Akar Tangkai",
          "features":{
            "48":"BULBOUS",
            "49":"CLUB",
            "50":"CUP",
            "52":"EQUAL",
            "53":"RHIZOMORPHS",
            "54":"ROOTED",
            "55":"MISSING"
          }
        },
        "12":{
          "attribute_id":12,
          "attribute_name":"Permukaan Tangkai di Atas Cincin",
          "features":{
            "7":"FIBROUS",
            "9":"SCALYY",
            "57":"SILKY",
            "10":"SMOOTH"
          }
        },
        "13":{
          "attribute_id":13,
          "attribute_name":"Permukaan Tangkai di Bawah Cincin",
          "features":{
            "7":"FIBROUS",
            "9":"SCALYY",
            "57":"SILKY",
            "10":"SMOOTH"
          }
        },
        "14":{
          "attribute_id":14,
          "attribute_name":"Warna Tangkai di Atas Cincin",
          "features":{
            "11":"BROWN",
            "12":"BUFF",
            "13":"CINNAMON",
            "14":"GRAY",
            "45":"ORANGE",
            "16":"PINK",
            "18":"RED",
            "19":"WHITE",
            "20":"YELLOW"
          }
        },
        "15":{
          "attribute_id":15,
          "attribute_name":"Warna Tangkai di Bawah Cincin",
          "features":{
            "11":"BROWN",
            "12":"BUFF",
            "13":"CINNAMON",
            "14":"GRAY",
            "45":"ORANGE",
            "16":"PINK",
            "18":"RED",
            "19":"WHITE",
            "20":"YELLOW"
          }
        },
        "16":{
          "attribute_id":16,
          "attribute_name":"Jenis Membran Pembungkus",
          "features":{
            "58":"PARTIAL",
            "59":"UNIVERSAL"
          }
        },
        "17":{
          "attribute_id":17,
          "attribute_name":"Warna Membran Pembungkus",
          "features":{
            "11":"BROWN",
            "45":"ORANGE",
            "19":"WHITE",
            "20":"YELLOW"
          }
        },
        "18":{
          "attribute_id":18,
          "attribute_name":"Jumlah Cincin",
          "features":{
            "30":"NONE",
            "60":"ONE",
            "61":"TWO"
          }
        },
        "19":{
          "attribute_id":19,
          "attribute_name":"Jenis Cincin",
          "features":{
            "62":"COBWEBBY",
            "63":"EVANESCENT",
            "64":"FLARING",
            "65":"LARGE",
            "30":"NONE",
            "66":"PENDANT",
            "67":"SHEATHING",
            "68":"ZONE"
          }
        },
        "20":{
          "attribute_id":20,
          "attribute_name":"Warna Cetakan Spora",
          "features":{
            "42":"BLACK",
            "11":"BROWN",
            "12":"BUFF",
            "44":"CHOCOLATE",
            "15":"GREEN",
            "45":"ORANGE",
            "17":"PURPLE",
            "19":"WHITE",
            "20":"YELLOW"
          }
        },
        "21":{
          "attribute_id":21,
          "attribute_name":"Populasi",
          "features":{
            "69":"ABUNDANT",
            "70":"CLUSTERED",
            "71":"NUMEROUS",
            "72":"SCATTERED",
            "73":"SEVERAL",
            "74":"SOLITARY"
          }
        },
        "22":{
          "attribute_id":22,
          "attribute_name":"Habitat",
          "features":{
            "75":"GRASSES",
            "76":"LEAVES",
            "77":"MEADOWS",
            "78":"PATHS",
            "79":"URBAN",
            "80":"WASTE",
            "81":"WOODS"
          }
        }
      },
      textActived: ''
    }
  },
  computed: {

    items() {
      return this.$store.state.identify.attributes
    },
    activeFeature: {
      get() {
        return this.selectedItem
      },
      set(value) {
        this.selectedItem = `${value.attr_id}-${value.feature_id}`
      }
    },
    counter: {
      get() {
        return this.$store.state.identify.stepCounter
      },
      set(value) {
        this.setStep(value)
      }
    }
  },
  watch: {
    collectItems() {
      this.attributeFeatures()
    },
  },
  methods: {
    ...mapActions(['getAttributes', 'addTempFeature', 'setStep']),
    itemType(payload) {
      this.textActived = `${payload.attr_id}-${payload.feature_id}`
    },
    checkedFeature(param) {
      this.addTempFeature(this.selectedItem)
      // this.counter(parseInt(param) + 1)
      this.e6 = parseInt(param) + 1
    }
  }
}
</script>
