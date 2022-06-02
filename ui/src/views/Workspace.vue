<template>
	<v-app>
		<v-app-bar app color="secondary" dark class="elevation-10">
			<div class="d-flex align-center zoom" @click="home()">
				<h1>
					IR Remote Control
				</h1>
			</div>

			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main app>
			<router-view class="viewport"></router-view>
		</v-main>
	</v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
export default Vue.extend({
	name: "Workspace",
	computed: {
		...mapGetters({
			irStore: "setupStore/irStore"
		}),
	},
	methods: {
		home (): void {
			if (this.$route.path !== "/") {
				this.$router.push("/");
			}
		}
	}
});
</script>
<style lang="css">
.viewport {
	padding-left: 25%;
	padding-right: 25%;
}
@media (max-width:1800px) and (min-width:600px) {
	.viewport {
		/* padding-left: 25%;
		padding-right: 25%; */
		padding-left: calc(5% + (100vw - 600px) * (5 - 25) / (500 -  1000));
		padding-right: calc(5% + (100vw - 600px) * (5 - 25) / (500 -  1000));
	}
};
.zoom {
  transition: transform .2s; /* Animation */
}
.zoom:hover {
	transform: scale(1.2);
	cursor: pointer;
}
</style>
