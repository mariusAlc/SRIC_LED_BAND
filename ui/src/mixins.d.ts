import Vue from "vue";
import store from "./store";

declare module "vue/types/vue" {
  interface Vue {
		store: typeof store
  }
}
