import Home from 'pages/home'
import Setting from 'pages/setting'
import Chart from 'pages/chart'
import Explain from 'pages/explain'
import Edit from 'pages/edit'



const routes = [
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
        path: '/edit',
        component: Edit
    }
]

export default routes