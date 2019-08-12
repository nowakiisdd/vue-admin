import * as type from './type'

import http from 'utils/http'

const shop = {
    state: {
        shopList: null
    },
    actions: {
        async getShopList ( { commit } ) {
            const res = await http({
                url: 'http://localhost:3000/shop',
                method: 'GET'
            })

            const action = {
                type: type.GET_SHOP_LIST,
                payload: res.data.data
            }

            commit( action )
        }
    },
    mutations: {
        [ type.GET_SHOP_LIST ] ( state, action ) {
            state.shopList = action.payload
        }
    },
    getters: {
        new_shop_list (state) {
            return state.shopList
        }
    }
}

export default shop