import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuetify from 'vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import 'vuetify/dist/vuetify.min.css'
import router from '@/router/index'
import store from './store'
import fb from 'firebase/compat/app'
import "firebase/database";
import 'firebase/firestore';
import 'firebase/compat/storage';


Vue.use(Vuetify)
Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
  router: router,
  store,
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyDoQtZDSNngInl9z4DhIHPTlF7jb4zqqeg",
      authDomain: "itc-ads-e08e8.firebaseapp.com",
      projectId: "itc-ads-e08e8",
      storageBucket: "gs://itc-ads-e08e8.appspot.com",
      messagingSenderId: "639897374350",
      appId: "1:639897374350:web:16bc444369a516adc483df",
      measurementId: "G-NS5RQY46KT",
      databaseURL: "https://itc-ads-e08e8-default-rtdb.asia-southeast1.firebasedatabase.app/"
    })
    
    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },
}).$mount('#app')
