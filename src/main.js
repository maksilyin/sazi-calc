import Vue from 'vue'
import App from './App.vue'
import VueScrollTo  from 'vue-scrollto'
import "./assets/styles.sass"

Vue.use(VueScrollTo)

new Vue({
    el: '#sazi-calc-app',
    render: h => h(App)
})