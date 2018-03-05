export default {
    name: 'app-page',

    components: {

    },

    watch: {
        ready: 'onReadyChange'
    },

    data()
    {
        return {
            ready: false
        }
    },

    created()
    {
        this.meta = this.$route.meta

        this.eventHub.$on('window:resize', this.onResize)
    },

    mounted()
    {
        console.log(`page ${this.$route.name} mounted`)
        this.ready = true
        this.$root.scrollTo(0, true)
        this.eventHub.$emit('page:enable-scroll')
        this.onResize()
    },

    destroyed()
    {
        this.eventHub.$off('window:resize', this.onResize)
    },

    methods: {
        onReadyChange()
        {
            if(this.ready)
            {
                this.eventHub.$emit('page:ready', this.ready)
            }
        },

        onResize()
        {
            if(this.$el.offsetHeight > 0)
            {
                this.eventHub.$emit('page:set-height', this.$el.offsetHeight)
            }
        }
    }
}
