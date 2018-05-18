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
            time: {
                enabled: false,
                current: 0
            }
        }
    },

    created()
    {
        eventHub.$on('application:enterframe', this.onTick)
        this.$root.$store.watch(this.$root.$store.getters.getCurrentProgress, this.onUpdateProgress)
    },

    mounted()
    {
        this.startTime()
    },

    destroyed()
    {
        eventHub.$off('application:enterframe', this.onTick)
    },

    methods:
    {
        startTime()
        {
            this.time.current = 0
            this.time.enabled = true
            this.$root.time.startTime()
        },

        stopTime()
        {
            this.time.enabled = false
            this.$root.time.stopTime()
        },

        onUpdateProgress(progress)
        {
            this.stopTime()
            this.startTime()
        },

        onTick()
        {
            if(this.time.enabled)
            {
                this.$root.time.tick()

                if(this.$root.time.currentTime < 0)
                {
                    this.stopTime()
                    this.$parent.onClickSkip()
                }

                this.time.current = Moment.duration(this.$root.time.currentTime).format('mm:ss', { trim: false })
            }
        }
    }
}
