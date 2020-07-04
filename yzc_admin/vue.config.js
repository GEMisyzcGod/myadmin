const path = require('path');

//拼接路径
function resolve(dir) {
	return path.join(__dirname, dir)
}
module.exports = {
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('@components', resolve('src/components'))
            .set('@static', resolve('src/static'))
            .set('@network', resolve('src/network'))
            .set('@store', resolve('src/store'))
            .set('@tools', resolve('src/tools'))
			.set('@view', resolve('src/view'))
			.set('@assets', resolve('src/assets'))
	},
}