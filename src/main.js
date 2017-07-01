import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes'
import { store } from './store/store';
import VueResource from 'vue-resource'
import './firebase';
import VueFire from 'vuefire';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueFire);

Vue.http.options.root = 'https://meal-plan-780da.firebaseio.com/';

const router = new VueRouter({
	routes,
	mode: 'history'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created: function(){
  	this.$store.dispatch('loadData')
  }
})
