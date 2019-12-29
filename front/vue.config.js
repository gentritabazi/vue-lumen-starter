var path = require('path')
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                srcFolder: path.resolve(__dirname, 'src')
            }
        },
    },

    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: false
        }
    }
}