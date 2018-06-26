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

    pauseTime()
    {
        super.pause()
    }

    playTime()
    {
        super.play()
    }

    stopTime()
    {
        super.stop()
    }
}
