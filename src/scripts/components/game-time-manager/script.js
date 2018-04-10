import Time from 'Utils/Time.js'

import eventHub from 'Application/event-hub'

export default
{
    name: 'game-time-manager',

    components:
    {

    },

    data()
    {
        return {
            globalTime: 0,
            stepTime: 0
        }
    },

    created()
    {
        eventHub.$on('application:enterframe', this.onTick)
        this.time = new Time()
    },

    mounted()
    {

    },

    destroyed()
    {
        eventHub.$off('application:enterframe', this.onTick)
    },

    methods:
    {
        onTick()
        {
            this.time.tick()
            this.globalTime = 0
            this.globalTime =  Math.round(this.time.elapsed / 100) / 10
        }
    }
}
