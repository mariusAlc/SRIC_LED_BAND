module.exports = {
	parallel: 2,
	chainWebpack: config => {
		config
			.plugin("html")
			.tap(args => {
				args[0].title = "IR Remote Control SRIC";
				return args;
			});
		config.resolve.alias.delete("@");
		config.resolve
			.plugin("tsconfig-paths")
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			.use(require("tsconfig-paths-webpack-plugin"));
	},
	transpileDependencies: [
		"vuetify"
	]
};
