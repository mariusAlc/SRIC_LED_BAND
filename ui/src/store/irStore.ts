import Vue from "vue";
import Vuex, { Module } from "vuex";
import axios, { AxiosRequestConfig } from "axios";
// import { IServerRES } from "@common/server";
// import { ServerError } from "@common/errors";
import { RootState } from "@common/store";

Vue.use(Vuex);
interface State {
	test: string
}
export default function irStore ():Module<State, RootState> {
	const store: Module<State, RootState> = {
		namespaced: true,
		state: {
			test: ""
		},
		getters: {
		},
		mutations: {
		},
		actions: {
			async sendCode (store, code: string): Promise<boolean> {
				try {
					console.log(code);
					const options: AxiosRequestConfig = {
						url: `${this.state.API_URL}/send`,
						method: "POST",
						data: {
							code
						}
					};
					const response = await axios.request<boolean>(options);
					console.log(response.data);
					if (response.data) {
						return true;
					} else {
						return false;
					}
				} catch (error) {
					const e = error as Error;
					console.error(e.message);
					return false;
				}
			},
		}
	};
	return store;
}
