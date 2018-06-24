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

        eventHub.$on('application:start-time', this.startTime)
        eventHub.$on('application:stop-time', this.stopTime)

        this.$root.$store.watch(this.$root.$store.getters.getCurrentProgress, this.onUpdateProgress)
    },

    destroyed()
    {
        eventHub.$off('application:enterframe', this.onTick)
    },

    methods:
    {
        startTime()
        {
            console.log('start time')
            this.time.current = 0
            this.time.enabled = true
            this.$root.time.startTime()
        },

        stopTime()
        {
            console.log('stop time')
            this.time.enabled = false
            this.$root.time.stopTime()
        },

        onUpdateProgress()
        {
            this.startTime()
        },

        onTick()
        {
            if(this.time.enabled)
            {
                this.$root.time.tick()

                const progress = Math.round(this.$root.time.elapsed / this.$root.time.maxTime * 1000) / 1000
                this.$refs.progress.style.transform = `scaleX(${progress})`

                if(this.$root.time.currentTime < 0)
                {
                    this.$root.time.currentTime = 0
                    this.stopTime()
                    eventHub.$emit('application:skip')
                }

                this.time.current = Moment.duration(this.$root.time.currentTime).format('mm:ss', { trim: false })
            }
        }
    }
}
