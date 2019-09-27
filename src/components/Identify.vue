<template>
  <div>
    <v-parallax dark height="300" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
        <h4 class="subheading">Build your application today!</h4>
      </v-layout>
    </v-parallax>
    <v-container fluid>
      <v-layout align-end justify-center row>
        <v-flex xs12>
          <v-stepper v-model="e6" vertical>
            <div v-for="(item, n) in data" :key="`${n}-step`">
              <v-stepper-step :step="n" :complete="e6 > n">
                {{ item.attribute_name }} {{ e6 }} {{ n }}
                <small>Summarize if needed</small>
              </v-stepper-step>
              <v-stepper-content :step="n" :key="`${n}-content`">
                <v-list two-line>
                  <v-list-tile
                    v-for="(naming, idK) in item.features"
                    :key="idK"
                    :style="textActived == `${item.attribute_id}-${idK}` ? 'background: rgba(204, 204, 204, 0.4);' : ''"
                    @click="itemType({feature_id: idK, attr_id:item.attribute_id })"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>{{ naming }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
                <div>
                  <v-btn
                    v-if="n != Object.keys(items).length"
                    @click.native="checkedFeature(n)"
                  >next step</v-btn>
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
import { mushroom } from '@/data/mashroom.js'

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
      data: mushroom,
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
    }
  },
  methods: {
    ...mapActions(['getAttributes', 'addTempFeature', 'setStep']),
    itemType(payload) {
      this.textActived = `${payload.attr_id}-${payload.feature_id}`
      this.selectedItem = payload
    },
    checkedFeature(param) {
      this.addTempFeature(this.selectedItem)
      // this.counter(parseInt(param) + 1)
      this.e6 = parseInt(param) + 1
    }
  }
}
</script>
