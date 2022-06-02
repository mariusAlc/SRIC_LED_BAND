import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { app, BrowserWindow } from "electron";
import url from "url";
import path from "path";
Vue.config.productionTip = false;
process.env.VUE_APP_API_URL =
	process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";
new Vue({
	router,
	store,
	vuetify,
	render: h => h(App)
}).$mount("#app");
