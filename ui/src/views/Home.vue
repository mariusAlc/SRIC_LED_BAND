<template>
	<v-container>
		<div class="row-lg-12 justify-center align-center">
			<v-card flat class="elevation-0 pt-6 mt-10 mb-10" height="100%">
				<v-card-title>
					<h1>
						IR Remote Control
					</h1>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col cols="3" v-for="(code, idx) in Codes" :key="idx">
							<v-btn :class="idx === 'WHITE' || idx === 'YELLOW' ? '' : 'white--text'" block large :color="CodeColors[idx]" @click="sendCommand(code)">
								{{CodeLabels[idx]}}
							</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
				</v-card-actions>
			</v-card>
		</div>
	</v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { Codes, CodeLabels, CodeColors } from "../../../common/ui";
interface IHome {
	test: "test",
	Codes: typeof Codes,
	CodeLabels: typeof CodeLabels,
	CodeColors: typeof CodeColors
}
export default Vue.extend({
	name: "Home",
	async mounted () {
		try {
			// TODO
		} catch (error) {
			const e = error as Error;
			console.error(e);
		}
	},
	data (): IHome {
		return {
			test: "test",
			Codes,
			CodeLabels,
			CodeColors
		};
	},
	methods: {
		async sendCommand (code: string) {
			try {
				const sent = await this.$store.dispatch("irStore/sendCode", code);
				if (!sent) {
					console.error("Couldn't send code");
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
});
</script>
<style lang="css">
.centered {
  display: grid;
  justify-content: center;
  align-content: center;
}

.box {
	display:grid;
	grid-template-columns: auto auto;
	justify-content: center;
	align-content: center;
}

</style>
