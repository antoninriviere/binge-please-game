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
        path: '/quiz/:id',
        name: 'quiz',
        meta: {
            componentId: 'page-quiz'
        }
    },
    {
        path: '/score',
        name: 'score',
        meta: {
            componentId: 'page-score'
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
