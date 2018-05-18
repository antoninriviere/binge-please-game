import Time from 'Utils/Time.js'

export default class GameTime extends Time
{
    startTime()
    {
        super.start()
        this.maxTime = 15000
        this.currentTime = this.maxTime
    }

    tick()
    {
        super.tick()
        this.currentTime = this.maxTime - this.elapsed
    }

    stopTime()
    {
        super.stop()
    }
}
