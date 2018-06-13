import lottie from 'lottie-web'
import clicTutoAnimData from './anims/tutorial-clic.json'
import hoverTutoAnimData from './anims/tutorial-hover.json'
import scrollTutoAnimData from './anims/tutorial-scroll.json'

import eventHub from 'Application/event-hub'

export default
{
    name: 'game-tuto-manager',

    components:
    {

    },

    props:
    {
        tuto: {
            type: String,
            required: false
        }
    },

    data()
    {
        return {

        }
    },

    watch:
    {
        tuto: 'onTutoChange'
    },

    created()
    {
        eventHub.$on('application:enterframe', this.onTick)
    },

    mounted()
    {
        this.onTutoChange()
    },

    destroyed()
    {
        eventHub.$off('application:enterframe', this.onTick)
    },

    methods:
    {
        onTick()
        {

        },

        onTutoChange()
        {
            switch(this.$props.tuto)
            {
                case 'hover':
                    if(this.tutoAnim)
                        this.tutoAnim.destroy()
                    this.tutoAnim = lottie.loadAnimation({
                        container: this.$refs.tutoContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: this.autoplay,
                        animationData: hoverTutoAnimData
                    })
                    this.tutoAnim.play()
                    break
                case 'click':
                    if(this.tutoAnim)
                        this.tutoAnim.destroy()
                    this.tutoAnim = lottie.loadAnimation({
                        container: this.$refs.tutoContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: this.autoplay,
                        animationData: clicTutoAnimData
                    })
                    this.tutoAnim.play()
                    break
                case 'scroll':
                    if(this.tutoAnim)
                        this.tutoAnim.destroy()
                    this.tutoAnim = lottie.loadAnimation({
                        container: this.$refs.tutoContainer,
                        renderer: 'svg',
                        loop: true,
                        autoplay: this.autoplay,
                        animationData: scrollTutoAnimData
                    })
                    this.tutoAnim.play()
                    break
                case 'none':
                    if(this.tutoAnim)
                        this.tutoAnim.destroy()
                    break
                default:
                    break

            }
        }
    }
}
