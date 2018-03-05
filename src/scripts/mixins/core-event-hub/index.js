
import Vue from 'vue'


const eventHub = new Vue()

Vue.mixin({
    data()
    {
        return {
            eventHub
        }
    }
})
