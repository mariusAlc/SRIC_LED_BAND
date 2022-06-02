import Vue from "vue";
import Vuex from "vuex";
import irStore from "./irStore";
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		version: "1",
		API_URL: process.env.NODE_ENV === "production" ? "" : "http://localhost:5000"
	},
	getters: {
		API_URL: state => state.API_URL
	}
});
store.registerModule("irStore", irStore());
export default store;
