import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '*',
        name: '404',
        meta: {

        }
    },
    {
        path: '/',
        name: 'home',
        meta: {
            componentId: 'page-home'
        }
    },
    {
        path: '/tuto/:id',
        name: 'tuto',
        meta: {
            componentId: 'page-tuto'
        }
    },
    {
        path: '/quiz/:id',
        name: 'quiz',
        meta: {
            componentId: 'page-quiz'
        }
    },
    {
        path: '/finish',
        name: 'finish',
        meta: {
            componentId: 'page-finish'
        }
    },
    {
        path: '/results',
        name: 'results',
        meta: {
            componentId: 'page-results'
        }
    },
    {
        path: '/leaderboard',
        name: 'leaderboard',
        meta: {
            componentId: 'page-leaderboard'
        }
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
