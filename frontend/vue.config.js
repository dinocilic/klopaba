const path = require('path')


module.exports = {
    // outputDir: path.resolve(__dirname, '../backend/public'),
    outputDir: path.resolve(__dirname, '../frontend/dist'),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3000/'
            }
        }
    }
}