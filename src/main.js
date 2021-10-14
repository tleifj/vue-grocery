import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store/store";
import VueResource from "vue-resource";
import "./firebase";
import VueFire from "vuefire";

Vue.use(VueResource);
Vue.use(VueFire);

Vue.http.options.root = "https://meal-plan-780da.firebaseio.com/";

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
  created: function () {
    this.$store.dispatch("loadData");
  },
});
