export default class Time
{
    constructor()
    {
        this.isRunning = false
        this.elapsed = 0
        this.delta = 0
        this.globalTime = 0
    }

    start()
    {
        this.isRunning = true
        this.start = Date.now()
        this.current = this.start
        this.tick()
    }

    tick()
    {
        if(this.isRunning)
        {
            console.log('tick time')
            const current = Date.now()

            this.delta = current - this.current
            this.elapsed = current - this.start
            this.current = current

            if(this.delta > 60)
            {
                this.delta = 60
            }
        }
    }

    stop()
    {
        this.isRunning = false
        window.cancelAnimationFrame(this.tick)
    }
}
