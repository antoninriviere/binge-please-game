export default class Mouse
{
    constructor(width, height)
    {
        this.x = 0
        this.y = 0

        this.fromCenter = {}
        this.fromCenter.x = 0
        this.fromCenter.y = 0

        this.ratio = {}
        this.ratio.x = 0
        this.ratio.y = 0

        this.ratio.fromCenter = {}
        this.ratio.fromCenter.x = 0
        this.ratio.fromCenter.y = 0

        this.winWidth = width
        this.winHeight = height
    }

    onResize(width, height)
    {
        this.winWidth = width
        this.winHeight = height
    }

    onMove(event)
    {
        this.x = event.clientX
        this.y = event.clientY

        this.nX = 2 * (this.x / this.winWidth) - 1
        this.nY = -2 * (this.y / this.winHeight) + 1

        this.ratio.x = this.x / this.winWidth
        this.ratio.y = this.y / this.winHeight

        this.fromCenter.x = this.x - this.winWidth / 2
        this.fromCenter.y = this.y - this.winHeight / 2

        this.ratio.fromCenter.x = this.fromCenter.x / this.winWidth
        this.ratio.fromCenter.y = this.fromCenter.y / this.winHeight
    }
}
