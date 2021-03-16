module.exports = function override(config, env) {
    //return config;
    config.optimization.runtimeChunk = false;
    config.optimization.splitChunks = {
        cacheGroups: {
            default: false,
        },
    };
    return config;
}
