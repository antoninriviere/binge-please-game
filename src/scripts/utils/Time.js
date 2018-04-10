export default class Time
{
    constructor()
    {
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 0

        this.tick()
    }

    tick()
    {
        const current = Date.now()

        this.delta = current - this.current
        this.elapsed = current - this.start
        this.current = current

        if(this.delta > 60)
        {
            this.delta = 60
        }
    }

    stop()
    {
        window.cancelAnimationFrame(this.tick)
    }
}
