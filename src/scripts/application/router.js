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
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
