const USER_AGENT = navigator.userAgent.toLowerCase()

export default class Support
{
    constructor()
    {
        this.touch = ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)
        this.android = USER_AGENT.indexOf('android') > -1
        this.ios = /iPad|iPhone|iPod|ipad|iphone|ipod/.test(USER_AGENT) && !window.MSStream
        this.ie = document.documentMode || /Edge/.test(USER_AGENT)
    }
}
