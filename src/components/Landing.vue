<template>
  <v-layout row wrap>
    <v-carousel delimiter-icon="stop" prev-icon="mdi-arrow-left" next-icon="mdi-arrow-right">
      <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>

    <button @click="AuthProvider('google')">auth Google</button>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  },
  methods: {
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

    SocialLogin(provider, response) {
      this.$http
        .post('/sociallogin/' + provider, response)
        .then(response => {
          console.log(response.data)
        })
        .catch(err => {
          console.log({ err: err })
        })
    }
  }
}
</script>
