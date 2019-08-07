import Home from 'pages/home'
import Setting from 'pages/setting'
import Chart from 'pages/chart'
import Explain from 'pages/explain'
import Edit from 'pages/edit'
import Error from 'pages/error'
import AddData from 'pages/add_data'
import AddShop from 'pages/add_data/add_shop'
import AddFood from 'pages/add_data/add_food'
import CategoryRoute from './caregory'
import List from 'pages/list'


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