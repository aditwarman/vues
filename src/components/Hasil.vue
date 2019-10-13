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
          <v-card class="pa-6"> /
            <!-- Tabel data test dan case base -->
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs6>
                  <div>
                    <v-toolbar flat color="red">
                      <v-toolbar-title>Ciri-ciri Kasus Jamur Baru</v-toolbar-title>
                    </v-toolbar>
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      class="elevation-1"
                      hide-actions
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.fitur }}</td>
                      </template>
                    </v-data-table>
                  </div>
                </v-flex>
                <v-flex xs6>
                  <div>
                    <v-toolbar flat color="green">
                      <v-toolbar-title>Ciri-ciri Kasus Jamur Lama</v-toolbar-title>
                    </v-toolbar>
                    <v-data-table
                      :headers="headers"
                      :items="desserts"
                      class="elevation-1"
                      hide-actions
                    >
                      <template v-slot:items="props">
                        <td>{{ props.item.name }}</td>
                        <td class="text-xs-left">{{ props.item.fitur }}</td>
                      </template>
                    </v-data-table>
                  </div>
                </v-flex>    
              </v-layout>
            </v-container>  
            <!-- Output hasil/solusi -->
            <v-container>
              <div>
                <v-tabs
                  v-model="actived"
                  color="cyan"
                  dark
                >
                  <v-tab>
                    Hasil Identifikasi!
                  </v-tab>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>{{ texts }}</v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-container>
            <!-- Output perhitungan  -->
            <v-container>
              <div>
                <v-tabs
                  v-model="active"
                  color="cyan"
                  dark
                >
                  <v-tab>
                    HASIL PERHITUNGAN! 
                  </v-tab>
                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>{{ text }}</v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-container>
            <!-- Button -->
            <v-layout row wrap>
              <v-flex xs6 offset-xs6 offset-md6 offset-lg8>
                <div>
                  <v-btn large>Ulang</v-btn>
                  <v-btn large>Cetak</v-btn>
                  <v-btn large>Detail</v-btn>
                </div>
              </v-flex>
            </v-layout>
          </v-card>
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

  data () {
    return {
      actived: null,
      texts: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      active: null,
      text: 'Lorem ipsum arasy',
      expand: false,
      headers: [
        {
          text: 'Atribut',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Fitur', value: 'fitur' },
      ],
      desserts:[ 
        {
          name: 'Frozen Yogurt',
          fitur: 159,
        },
        {
          name: 'Ice cream sandwich',
          fitur: 237,
        },
        {
          name: 'Eclair',
          fitur: 262,
        },
        {
          name: 'Cupcake',
          fitur: 305,
        },
        {
          name: 'Gingerbread',
          fitur: 356,
        },
        {
          name: 'Jelly bean',
          fitur: 375,  
        },
        {
          name: 'Lollipop',
          fitur: 392,  
        },
        {
          name: 'Honeycomb',
          fitur: 408,
        },
        {
          name: 'Donut',
          fitur: 452,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
        {
          name: 'KitKat',
          fitur: 518,
        },
      ]
    }
  },
  computed: {
    dataresult () {
      return {
        active: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    
  },
  methods: {
    next () {
      const active = parseInt(this.active)
      this.active = (active < 2 ? active + 1 : 0)
    }
  },
}


</script>