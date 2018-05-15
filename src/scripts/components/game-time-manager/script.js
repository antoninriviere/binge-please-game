import eventHub from 'Application/event-hub'

import Moment from 'moment'
import MomentDurationFormatSetup from 'moment-duration-format'
MomentDurationFormatSetup(Moment)

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
            this.globalTime =  Moment.duration(this.$root.time.elapsed).format('mm:ss', { trim: false })
        }
    }
}
