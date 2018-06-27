import appPage from 'Mixins/app-page'
import gallerySlider from './slider'
import galleryPanel from './panel'
import uiCircleTransition from 'Components/ui-circle-transition'
import GameTutoManager from 'Components/game-tuto-manager'
import Quiz from 'Config/quiz'
import { TweenMax } from 'gsap'
import { WEBGL_ADD_GROUP, WEBGL_CLEAR_GROUP } from 'MutationTypes'

export default
{
    name: 'page-gallery',

    components:
    {
        gallerySlider,
        galleryPanel,
        uiCircleTransition,
        GameTutoManager
    },

    data()
    {
        return {
            items: Quiz,
            tuto: '',
            tutoInfos: ''
        }
    },

    mixins: [appPage],

    created()
    {
        this.$root.$body.style.backgroundColor = '#000000'
        this.$root.typeManager.isTypeable = false
    },

    mounted()
    {
        this.$circle = this.$refs.circleTransition.$refs.circle
        TweenMax.from(this.$refs.title, 0.8, { yPercent: 20, ease: Expo.easeOut })
    },

    destroyed()
    {
        this.$store.commit(WEBGL_CLEAR_GROUP)
    },

    methods:
    {
        onItemClick(item)
        {
            if(item.id === 'narcos')
            {
                this.$refs.circleTransition.setColor(item.backgroundColor)
                this.$refs.wrapper.classList.remove('is-active')
                TweenMax.to(this.$circle, 0.45,
                    {
                        delay: 0.3,
                        scale: 1,
                        ease: Sine.easeOut,
                        onComplete: () =>
                        {
                            this.$store.commit(WEBGL_ADD_GROUP, {
                                id: item.id,
                                config: {
                                    interactive: true
                                }
                            })
                            this.tuto = 'hover'
                            this.tutoInfos = 'Hover the image'
                            this.$refs.panel.activate()
                            this.$refs.panel.open()
                        }
                    }
                )
            }
        }
    }
}
