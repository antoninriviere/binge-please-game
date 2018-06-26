import appPage from 'Mixins/app-page'
import gallerySlider from './slider'
export default
{
    name: 'page-gallery',

    components:
    {
        gallerySlider
    },

    data()
    {
        return {
            items: [
                {
                    id: 0
                },
                {
                    id: 1
                },
                {
                    id: 2
                },
                {
                    id: 3
                },
                {
                    id: 4
                }
            ]
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
        // this.playAnim()
    },

    destroyed()
    {
    },

    methods:
    {
        playAnim()
        {
        }
    }
}
