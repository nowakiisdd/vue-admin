var qs = require('querystring')

const filters = {
    install(Vue) {
        Vue.filter('urlFilter', val => {
            return {
                name: val.name,
                params: val.params,
                query: {
                    r: qs.parse(val.query.r.slice(11)).r,
                    cid: val.query.cid
                }
            }
        })

        Vue.filter('currencyFilter', (val, type) => {
            return type + val
        })

        Vue.filter('decimalDigitsFilter', (val, n) => {
            return val.toFixed(n)
        })
    }
}

export default filters