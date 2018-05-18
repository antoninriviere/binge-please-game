import eventHub from 'Application/event-hub'
// import AudioManager from 'Utils/AudioManager'

// import { TweenMax } from 'gsap'

export default
{
    name: 'breaking-bad-svg',

    computed: {
    },

    data()
    {
        return {
        }
    },

    created()
    {
        // this.audioManager = new AudioManager()
        // this.corgiSound = this.audioManager.create({
        //     url: '/static/sounds/corgi_noise.mp3',
        //     autoplay: false,
        //     loop: false
        // })
    },

    mounted()
    {
        this.$els = document.querySelectorAll('.xp-item')
        this.$els.forEach((el, index) =>
        {
            el.setAttribute('data-id', index)
        })
        this.setCache()
        setTimeout(() =>
        {
            this.$els[0].classList.add('has-appeared')
        }, 500)
        this.$refs.container.addEventListener('mousemove', this.onMouseMove)
        eventHub.$on('window:resize', this.onResize)
    },

    destroyed()
    {
        eventHub.$off('window:resize', this.onResize)
    },

    methods:
    {
        onResize()
        {
            this.setCache()
        },
        setCache()
        {
            this.elsCache = []
            this.$els.forEach((el) =>
            {
                this.elsCache.push({
                    width: el.offsetWidth,
                    height: el.offsetHeight,
                    center: {
                        x: el.offsetLeft + el.offsetHeight / 2,
                        y: el.offsetTop + el.offsetHeight / 2
                    }
                })
            })
        },
        onMouseMove(e)
        {
            const elId = e.target.getAttribute('data-id')
            if(!elId && !this.clippedItemId) return
            if(elId === this.clippedItemId)
            {
                this.animateItem()
            }
            else if(elId)
            {
                this.clippedItemId = elId
                this.$clippedItem = this.$els[elId]
                this.itemCache = this.elsCache[elId]
                if(this.$clippedItem.classList.contains('has-appeared')) return
                this.$clippedItem.classList.add('has-appeared')
            }
            else if(!elId && this.$clippedItem)
            {
                this.$clippedItem.style.transform = 'translate3d(0, 0, 0)'
                this.$clippedItem = undefined
                this.clippedItemId = undefined
            }
        },
        animateItem()
        {
            const x = this.$root.mouse.x
            const y = this.$root.mouse.y
            const deltaX = (x - this.itemCache.center.x) / (this.itemCache.width / 2)
            const deltaY = (y - this.itemCache.center.y) / (this.itemCache.height / 2)
            const diffX = 30 * deltaX
            const diffY = 30 * deltaY
            this.$clippedItem.style.transform = `translate3d( ${diffX}px, ${diffY}px,0)`
        }
    }
}
