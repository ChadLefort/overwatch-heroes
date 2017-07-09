const path = require('path');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);

    config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [/stories/, /components/],
        loader: 'babel-loader!awesome-typescript-loader?target=es5'
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
