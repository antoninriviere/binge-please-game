export default class Time
{
    constructor()
    {
        this.elapsed = 0
        this.hasElapsed = 0
        this.delta = 0
        this.pause = false
    }

    start()
    {
        this.start = Date.now()
        this.current = this.start
        this.tick()
    }

    pause()
    {
        this.pause = true
        this.hasElapsed = this.elapsed
    }

    play()
    {
        this.pause = false
        this.start = Date.now()
        this.current = this.start
    }

    tick()
    {
        if(!this.pause)
        {
            const current = Date.now()

            this.delta = current - this.current
            this.elapsed = this.hasElapsed + current - this.start
            this.current = current

            if(this.delta > 60)
            {
                this.delta = 60
            }
        }
    }

    stop()
    {
        window.cancelAnimationFrame(this.tick)
    }
}
