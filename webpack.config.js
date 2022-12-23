const path = require('path')
const { name } = require('./package.json')

module.exports = (env) => {
    const { prod } = env
    return {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `${name}.js`,
            library: {
                name: 'PubSub',
                type: 'umd'
            },
            globalObject: 'this',
            clean: true
        },
        mode: prod ? 'production' : 'development',
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader'
                        }
                    ]
                }
            ]
        }
    }
}