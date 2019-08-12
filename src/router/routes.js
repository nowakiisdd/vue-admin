const Home = () => import(/* webpackChunkName: "group-foo" */ 'pages/home')
const Setting = () => import(/* webpackChunkName: "group-foo" */ 'pages/setting')
const Chart = () => import(/* webpackChunkName: "group-foo" */ 'pages/chart')
const Explain = () => import(/* webpackChunkName: "group-foo" */ 'pages/explain')
const Edit = () => import(/* webpackChunkName: "group-foo" */ 'pages/edit')
const Error = () => import(/* webpackChunkName: "group-foo" */ 'pages/error')
const AddData = () => import(/* webpackChunkName: "group-foo" */ 'pages/add_data')
const AddShop = () => import(/* webpackChunkName: "group-foo" */ 'pages/add_data/add_shop')
const AddFood = () => import(/* webpackChunkName: "group-foo" */ 'pages/add_data/add_food')
import CategoryRoute from './caregory'
const List = () => import(/* webpackChunkName: "group-foo" */ 'pages/list')
const ShopList = () => import(/* webpackChunkName: "group-foo" */ 'pages/shop_list')

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/setting',
        component: Setting
    },
    {
        path: '/chart',
        component: Chart
    },
    {
        path: '/explain',
        component: Explain
    },
    {
        path: '/shop_list',
        component: ShopList
    },
    {
        path: '/list/:id',
        component: List,
        name: 'list'
    },
    CategoryRoute,
    {
        path: '/add_data',
        component: AddData,
        children: [
            {
                path: 'add_shop',
                component: AddShop,
                name: 'add_shop'
            },
            {
                path: 'add_food',
                component: AddFood,
                name: 'add_food'
            }
        ]
    },
    {
        path: '/edit',
        component: Edit
    },
    {
        path: '*',
        component: Error
    }
]

export default routes