module.exports = function override(config, env) {
    //return config;
    //config.optimization.runtimeChunk = false; //not needed, we can load all assets from assets-manifest.json
/*
    config.optimization.splitChunks = {
        cacheGroups: {
            default: false,
        },
    };
*/
    return config;
}
