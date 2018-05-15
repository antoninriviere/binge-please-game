import eventHub from 'Application/event-hub'
import { randomInRange, randomSign } from 'Utils/Numbers'
import AudioManager from 'Utils/AudioManager'

import { TweenMax, Circ } from 'gsap'

export default
{
    name: 'the-crown-svg',

    components:
    {

    },

    props: {

    },

    computed: {

    },

    data()
    {
        return {
            corgis: [],
            clicks: 0,
            baseRadius: window.innerHeight * 0.3
        }
    },

    created()
    {
        this.audioManager = new AudioManager()
        this.corgiSound = this.audioManager.create({
            url: '/static/sounds/corgi_noise.mp3',
            autoplay: false,
            loop: false
        })
        eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        this.corgi = {
            elem: this.$refs.corgi,
            child: this.$refs.corgi.children[0],
            width: parseInt(window.getComputedStyle(this.$refs.corgi, null).getPropertyValue('width')),
            height: parseInt(window.getComputedStyle(this.$refs.corgi, null).getPropertyValue('height'))
        }
        this.corgis.push(this.corgi)
        this.$el.removeChild(this.$refs.corgi)

        TweenMax.set(this.$refs.hand, {rotation: -10, transformOrigin:"50% 100%"})
        TweenMax.to(this.$refs.hand, 0.3,
        {
            rotation: 10,
            yoyo: true,
            repeat: -1,
            transformOrigin:"50% 100%",
            ease: Circ.easeInOut
        })
    },

    destroyed()
    {
        eventHub.$off('window:resize', this.onResize)
    },

    methods:
    {
        onResize(windowObj)
        {
            this.baseRadius = windowObj.height * 0.25
        },
        onClick()
        {
            this.appendCorgi()
            this.clicks++
        },
        appendCorgi()
        {
            const clone = this.corgi.elem.cloneNode(true)
            this.$el.appendChild(clone)
            const corgi = {
                elem: clone,
                child: clone.children[0],
                width: parseInt(window.getComputedStyle(clone, null).getPropertyValue('width')),
                height: parseInt(window.getComputedStyle(clone, null).getPropertyValue('height'))
            }
            this.corgis.push(corgi)
            const index = this.corgis.length
            const radiusShift = this.baseRadius * 0.25
            const radius = this.baseRadius + ( radiusShift * ( index % 4 ) )
            const pos = {
                x: radius * randomInRange(0.4, 1) * Math.cos((index * 3) * 0.1 * Math.PI * 2),
                y: radius * randomInRange(0.4, 1) * Math.sin((index * 3) * 0.1 * Math.PI * 2)
            }
            corgi.elem.style.transform = `translate3d(${pos.x}px, ${pos.y}px,0)`
            corgi.child.classList.add('has-appeared')
            this.corgiSound.play()
        }
    }
}
