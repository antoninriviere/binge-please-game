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

        }
    },

    created()
    {

    },

    mounted()
    {
        this.corgi = {}
        this.corgi.elem = this.$el.querySelector('.corgi svg'),
        this.corgi.width = parseInt(window.getComputedStyle(this.corgi.elem, null).getPropertyValue('width'))
        this.corgi.height = parseInt(window.getComputedStyle(this.corgi.elem, null).getPropertyValue('height'))

        console.log('mounted the crown svg', this.corgi)
    },

    destroyed()
    {

    },

    methods:
    {
        onClick()
        {
            this.corgi.elem.style.transform = `translate3d(${this.$root.mouse.x - this.corgi.width / 2}px, ${this.$root.mouse.y - this.corgi.height / 2}px,0)`
        }
    }
}
