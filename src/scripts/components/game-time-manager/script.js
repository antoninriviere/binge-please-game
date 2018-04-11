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
            globalTime: 0
        }
    },

    created()
    {
        eventHub.$on('application:enterframe', this.onTick)
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
            this.globalTime = 0
            this.globalTime =  Math.round(this.$root.time.elapsed / 100) / 10
        }
    }
}
