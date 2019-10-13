<template>
  <div>
    <v-layout row justify-center>
      <v-dialog v-model="openDialog" max-width="600" persistent>
        <v-card>
          <v-card-title class="headline">Use Google's location service?</v-card-title>

          <v-card-text>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            {{ openDialog }}
          </v-card-text>

          <v-card-actions justify-center>
            <v-spacer></v-spacer>
            <v-btn outline color="dark darken-l" flat="flat" @click="googleSignIn">
              <v-icon color="red" :style="'padding-right: 10px;'">mdi-google-plus</v-icon>SIgn in With Google+
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <div v-if="isAuthenticated === true">
      <v-parallax dark height="300" src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-thin mb-3">Vuetify.js</h1>
          <h4 class="subheading">Build your application today!</h4>
        </v-layout>
      </v-parallax>
      <v-container fluid>
        <v-layout align-end justify-center row>
          <v-flex xs8>
            <v-stepper v-model="e6" vertical>
              <div v-for="(item, n) in data" :key="`${n}-step`">
                <v-stepper-step :step="n" :complete="e6 > n">{{ item.attribute_name }}</v-stepper-step>
                <v-stepper-content :step="n" :key="`${n}-content`">
                  <v-list two-line>
                    <v-list-tile
                      v-for="(naming, idK) in item.features"
                      :key="idK"
                      :style="textActived == `${item.attribute_id}-${idK}` ? 'background: rgba(204, 204, 204, 0.4);' : ''"
                      @click="itemType({feature_id: idK, attr_id:item.attribute_id })"
                    >
                      <v-list-tile-avatar>
                        <img :src="avatar" />
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>{{ naming }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <v-btn
                    v-if="n != Object.keys(data).length"
                    color="primary"
                    @click.native="checkedFeature(n)"
                  >Lanjut</v-btn>

                  <v-btn v-else @click.native="processing()">Simpan</v-btn>
                  <v-btn flat>Kembali</v-btn>
                </v-stepper-content>
              </div>
            </v-stepper>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
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
      textActived: '',
      avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
      btnText: ''
    }
  },
  computed: {
    ...mapGetters(['appTitle', 'isTokenSet', 'user']),
    items() {
      return this.$store.state.identify.attributes
    },
    isAuthenticated() {
      return this.isTokenSet
    },
    openDialog() {
      return this.isTokenSet === true ? false : true
    },
    btnNext: {
      get() {
        return this.btnText
      },
      set(data) {
        this.btnText = data
      }
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
  methods: {
    ...mapActions([
      'getAttributes',
      'addTempFeature',
      'setStep',
      'socialSignIn',
      'saveCases'
    ]),
    ...mapGetters(['features']),
    itemType(payload) {
      this.textActived = `${payload.attr_id}-${payload.feature_id}`
      this.selectedItem = payload
    },
    checkedFeature(param) {
      this.addTempFeature(this.selectedItem)

      console.log(this)
      // console.log(this.data.length)
      // if (param != Object.keys(items).length)
      this.e6 = parseInt(param) + 1
    },
    AuthProvider(provider) {
      var self = this

      this.$auth
        .authenticate(provider)
        .then(response => {
          self.SocialLogin(provider, response)
        })
        .catch(err => {
          console.log({ err: err })
        })
    },
    processing() {
      this.addTempFeature(this.selectedItem)
      console.log(this.features)
      console.log(this.$store.state.identify)

      return this.saveCases(this.$store.state.identify.features)
    },
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editCity(this.editedItem)
            await this.getCities(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveCity({ name: this.editedItem.name })
            await this.getCities(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          }
          this.close()
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    },
    SocialLogin(provider, response) {
      this.$http
        .post('/sociallogin/' + provider, response)
        .then(response => {
          console.log(response.data)
          this.socialSignIn(response)
        })
        .catch(err => {
          console.log({ err: err })
        })
    },
    googleSignIn() {
      var self = this
      this.$auth
        .authenticate('google')
        .then(response => {
          self.SocialLogin('google', response)
        })
        .catch(err => {
          console.log({ err: err })
        })
    }
  },
  created() {
    console.log(this)
  }
}
</script>
